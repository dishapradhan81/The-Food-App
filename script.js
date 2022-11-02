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
const productsDOM = document.querySelector(".card2");

// cart
let cart = [];

// getting the products
class Products{

}
// display products
class UI{

}
// local storage
class Storage{

}

document.addEventListener("DOMContentLoaded",()=>{
    // instances
    const ui = new UI();
    const products = new Products();
    

});
