//FOR SLIDING IMAGES

const sliderimg = document.querySelectorAll('.slider-img');
const dots = document.querySelectorAll('.dots');

let counter = 1;
slide(counter);

let timer = setInterval(autoslide, 6000);
function autoslide(){
    counter += 1;
    slide(counter);
}
function plusSlides(n){
    counter += n;
    slide(counter);
    resetTimer();

}
function currentSlide(n){
    counter = n;
    slide(counter);
    resetTimer();
    
}
function resetTimer(){
    clearInterval(timer);
    timer = setInterval(autoslide, 6000);

}
function slide(n){
    let i;
    for(i=0;i<sliderimg.length;i++){
        sliderimg[i].style.display="none";
    }
    for(i=0;i<dots.length;i++){
        dots[i].classList.remove('active');
    }
    if(n > sliderimg.length){
        counter = 1;
    }
    if(n < 1){
        counter = sliderimg.length;
    }
    sliderimg[counter - 1].style.display = "block";
    dots[counter - 1].classList.add('active');

}

// FOR SLIDING IMAGE GALLERY

const buttonRight = document.querySelector('.display-right');
const buttonLeft = document.querySelector('.display-left');

buttonRight.onclick = function () {
    document.getElementById('container-wrapper').scrollLeft += 500;
};
buttonLeft.onclick = function () {
    document.getElementById('container-wrapper').scrollLeft -= 500;
};


// FOR CHANGING TEXTS

const text = document.querySelector(".first-text");

const textLoad = () => {
    setTimeout(() => {
        text.textContent = "Cooking gone wrong ?";
    }, 0);
    setTimeout(() => {
        text.textContent = "Hungry ?";
    }, 4000);
    setTimeout(() => {
        text.textContent = "Unexpected guests ?";
    }, 8000);
}

textLoad();
setInterval(textLoad, 10000);




// FOR LOGIN BOX

const login = document.querySelector('.login-box');
const close = document.querySelector('.close');
const page = document.querySelector('.login-page');

login.addEventListener("click", () => {
    page.style.display = "flex"
})
close.addEventListener("click", () => {
    page.style.display = "none"
})

let textFields = document.querySelectorAll('.login-input');

let errorFileds = document.querySelectorAll('.error');
fields.addEventListener('submit', (event) => {

    event.preventDefault();
    textFields.forEach((textField) => {
        const value = textField.value;
        const name = textField.name;
        let errorDiv = document.querySelector(`.${name}.error`);
        var mailformat= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        console.log(name);
        if (name!='email' &&value.trim() === "") {
            errorDiv.style.visibility = "visible";
        }
        else if(name==='email' && !value.match(mailformat)){
            errorDiv.style.visibility = "visible";

        }
        else {
            errorDiv.style.visibility = "hidden";
        }

    })
})

// Add to Cart

// variables
const cartBtn = document.querySelector(".cart-container");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".card");

// cart
let cart = [];

// getting the products
class Products{
    async getProducts(){
        try{
        let result = await fetch('products.json');
        let data = await result.json();

        let products = data.items;
        products = products.map(item => {
            const {title,price} =  item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {title,price,id,image};
        });
        return products;
        // return data;
       
        
        }
        catch(error){
            console.log(error);
        }
    }

}
// display products
class UI{
    displayProducts(products){
        //console.log(products); //we are getting array of products

        let result = '';
        products.forEach(product => {       //iterating through array of products & dynamically adding italian food items    
        result += ` 
        <div class="container-list-item">      
        <div class="img-container">
        <img class="list-item-img" src=${product.image}>
        <button class="bag-button" data-id=${product.id}>
            <i class="fa-solid fa-cart-shopping"></i>
            Add to Cart
        </button>
        </div>
        <div class="item-des">
            <span class="list-item-name">${product.title}</span>
            <span class="list-item-price">$${product.price}</span>
        </div>

    </div>`;
  });

  productsDOM.innerHTML = result;

}

  getBagButtons(){
    const buttons = [...document.querySelectorAll(".bag-button")];
    // console.log(buttons);

    buttons.forEach(button => {
        let id = button.dataset.id;     //if u console.log(buttons) then u will find id under dataset
        console.log(id);

    })
    
   

}



}
// local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    // instances
    const ui = new UI();
    const products = new Products();

    //get all the products
   //products.getProducts().then(data => console.log(data));
   
   products.getProducts().then(data => {
    ui.displayProducts(data);
    Storage.saveProducts(data);

   }).then(()=> {
    ui.getBagButtons();

   });
      

});
