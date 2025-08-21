let calculation = () => {
    let cartIcon = document.getElementById("cart amount");
    cartIcon.innerHTML = cart.map((x) => x.quantity).reduce((x,y) => x+y, 0);
    
};

calculation();

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let generateCartItems = () => {
    if(cart.length !==0){
        return shoppingCart.innerHTML = cart.map((x) => {
            return `
            <div>Hello</div>
            `
        }).join("");
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2 class="font-bold text-white text-5xl mt-20 mb-7 flex justify-center">Cart is Empty</h2>
        <a href="index.html" class="flex justify-center">
            <button class="bg-white rounded-lg h-10 w-auto px-4 text-xl font-semibold cursor-pointer">
            Back to Home
            </button>
        </a>
        `
    };
};


generateCartItems();