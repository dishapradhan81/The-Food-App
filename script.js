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

//cart
let cart = [];

let buttonDOM = [];

//getting the products
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
//display products
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
     //console.log(buttons);

     buttonDOM = buttons;

    buttons.forEach(button => {
        let id = button.dataset.id;     //if u console.log(buttons) then u will find id under dataset
        //console.log(id);
        let inCart = cart.find(item => item.id === id);
        if (inCart) {
            button.innerText = "In Cart";
            button.disabled = "true";
        }
        button.addEventListener('click', event => {
            //console.log(event);
          event.target.innerText = "In Cart";  //if u console.log(event) , u find target
          event.target.disabled = true;           //after 1 click on "add to cart" the button gets disabled

           //get product from italian products
           let cartItem = {...Storage.getProduct(id), amount:1};
           //console.log(cartItem);

           //Add product to the cart
           cart = [...cart,cartItem];
           console.log(cart);

           //Save cart in local storage
           Storage.saveCart(cart);

           //set cart values
           this.setCartValues(cart);

           //Display cart item
           this.addCartItem(cartItem);

           //show the cart
           this.showCart();




        });


    });
    
   

}

setCartValues(cart){
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
        tempTotal += item.price * item.amount;
        itemsTotal += item.amount;

    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    //console.log(cartTotal, cartItems);
}

addCartItem(item){
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML =       
    `<img src=${item.image}>
    <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>`

    cartContent.appendChild(div);
    //console.log(cartContent);

}

showCart(){
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');

}

setupAPP(){
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.hideCart);

}

populateCart(cart){
    cart.forEach(item => this.addCartItem(item));
}

hideCart(){
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');

}

cartLogic() {
    clearCartBtn.addEventListener('click', () => {
        this.clearCart();
    });

    cartContent.addEventListener('click', event => {
        if(event.target.classList.contains('remove-item')){
            let removeItem = event.target;
            let id = removeItem.dataset.id;
            //console.log(removeItem.parentElement.parentElement);  // traverse the DOM
            cartContent.removeChild(removeItem.parentElement.parentElement);
            this.removeItem(id);

        }
        else if (event.target.classList.contains("fa-chevron-up")){
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;

        }
        else if (event.target.classList.contains("fa-chevron-down")){
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount - 1;

            if(tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.amount;

            }
            else{
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                this.removeItem(id);
            }
        }


    });

}

clearCart() {
    let cartItems = cart.map(item => item.id);
   // console.log(cartItems);
   cartItems.forEach(id => this.removeItem(id));

   while(cartContent.children.length > 0){
    cartContent.removeChild(cartContent.children[0])
   }

   this.hideCart();
}

removeItem(id){
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to cart`;

}
getSingleButton(id){
    return buttonDOM.find(button => button.dataset.id == id);
}




}
// local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }

    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    // instances
    const ui = new UI();
    const products = new Products();

    ui.setupAPP();

    //get all the products
   //products.getProducts().then(data => console.log(data));

   
   products.getProducts().then(data => {
    ui.displayProducts(data);
    Storage.saveProducts(data);

   }).then(()=> {
    ui.getBagButtons();
    ui.cartLogic();

   });
      

});