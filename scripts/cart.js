let calculation = () => {
    let cartIcon = document.getElementById("cart amount");
    cartIcon.innerHTML = cart.map((x) => x.quantity).reduce((x,y) => x+y, 0);
    
};

calculation();

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let generateCartItems = () => {
    if (cart.length !== 0) {
    let cartContent = ``;

    cartContent += `<div class="text-white text-6xl flex justify-center font-bold underline my-10">Cart Items</div>`;

    cartContent += cart.map((x) => {
        let search = listItemsData.find((y) => y.id === Number(x.id)) || [];

        let itemData = listItemsData.find((y) => y.id === Number(x.id)) || {};

        return `
            <div class="flex mx-auto mt-10 bg-white h-45 w-200 p-4 rounded-lg">
                <img src="${itemData.img}" alt="item-image" class="h-40 w-40 object-cover rounded-lg my-auto mr-4">
                
                <div class="flex flex-col w-full space-y-1">
                    <div id="item-name-cross" class="flex justify-between w-full">
                        <h2 id="name" class="text-2xl font-semibold">${itemData.name}</h2>
                        <div id="cross" onclick="removeItem(${x.id})">
                            <img src="images/logos/cross.png" alt="cross" class="h-10 w-10 cursor-pointer">
                        </div>
                    </div>
                    
                    <div id="unit-price">
                        <h3 class="flex justify-center bg-gray-800 text-lg h-auto w-44 rounded-lg font-semibold text-white">Unit Price: TK ${itemData.price}</h3>
                    </div>
                    
                    <div id="total-price" class="flex justify-between pl-1 mt-2">
                        <div id="quantity modifier" class="flex space-x-4 items-center border-2 border-gray-800 rounded-lg px-2 h-9">
                            <button id="decrease" onclick="decrement(${x.id})" class="h-4 w-4 cursor-pointer">
                                <img src="images/logos/minus.png" alt="minus">
                            </button>
                            <p id="quantity-${x.id}" class="text-xl">${x.quantity}</p>
                            <button id="increase" onclick="increment(${x.id})" class="h-4 w-4 cursor-pointer">
                                <img src="images/logos/plus.png" alt="plus">
                            </button>
                        </div>
                        <h3 id="total cost" class="text-4xl font-semibold pr-4 mt-4">Total: TK ${itemData.price * x.quantity}</h3>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    shoppingCart.innerHTML = cartContent;

    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="font-bold text-white text-5xl mb-7 mt-8">Cart is Empty</h2>
            <a href="index.html">
            <button class="bg-white rounded-lg h-10 w-auto px-4 text-xl font-semibold cursor-pointer">
                Back to Home
            </button>
            </a>
        </div>
            `;
    }
};


let increment = (id) => {
    id = Number(id);
    let search = cart.find((x) => x.id === id);

    if (search === undefined) {
        cart.push({
            id: id,
            quantity: 1
        });
    } else {
        search.quantity += 1;
    }

    update(id);
    calculation();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
    id = Number(id);
    let search = cart.find((x) => x.id === id);

    if (search === undefined) return;
    if (search.quantity === 0) return;

    search.quantity -= 1;

    cart = cart.filter((x) => x.quantity !== 0);
    update(id);
    calculation();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(cart));
};


let update = (id) => {
    let search = cart.find((x) => x.id === id);

    let quantityElement = document.getElementById(`quantity-${id}`);
    

    if (quantityElement) {
        quantityElement.innerHTML = search ? search.quantity : 0;
    }
    
    calculation();
    TotalAmount();
    generateCartItems();
};

let removeItem = (id) => {
    cart = cart.filter((x) => Number(x.id) !== id);
    generateCartItems();

    localStorage.setItem("data", JSON.stringify(cart));

    calculation();
    TotalAmount();
    
};

generateCartItems();

let discount = 0;
let promoMessage = { text: '', class: '' };




const applyPromo = () => {
    const promoInput = document.getElementById('PromoInput');
    const enteredCode = promoInput.value.trim().toLowerCase();

    discount = 0;
    promoMessage.text = '';
    promoMessage.class = '';

    if (promoCodes[enteredCode]) {
        discount = promoCodes[enteredCode];
        promoMessage.text = `Promo code "${enteredCode}" applied!`;
        promoMessage.class = 'text-green-500';
    } else {
        promoMessage.text = 'Invalid promo code.';
        promoMessage.class = 'text-red-500';
    }

    TotalAmount();
};

let TotalAmount = () => {
    if (cart.length !== 0) {
        const subtotal = cart.map((x) => {
            const search = listItemsData.find((y) => y.id === x.id) || {};
            return x.quantity * (search.price || 0);
        }).reduce((x, y) => x + y, 0);

        const total = subtotal * (1 - discount);
        
        label.innerHTML = `
            <div class="text-white text-center mt-10">
                <h2 class="font-semibold text-3xl mb-2">Subtotal: TK ${subtotal.toFixed(2)}</h2>
                <h2 class="font-semibold text-3xl mb-4">Discount: TK ${(subtotal * discount).toFixed(2)}</h2>
            </div>

            <div class="flex flex-col space-y-2 mb-4">
                <label for="PromoInput" class="text-white text-lg font-semibold text-center">Have a Promo code?</label>
                <div class="flex justify-center space-x-2 text-white">
                    <input type="text" id="PromoInput" placeholder="Enter code" class="p-2 rounded-md border border-gray-300 text-white">
                    <button onclick="applyPromo()" class="bg-fuchsia-600 text-white rounded-md px-4 py-2 font-bold">Apply</button>
                </div>
                <p id="couponMessage" class="text-center text-sm font-medium ${promoMessage.class}">${promoMessage.text}</p>
            </div>

            <h2 class="text-white text-center font-bold text-4xl mt-10">Total Bill: TK ${total.toFixed(2)}</h2>
            
            <div class="flex justify-center space-x-10 mt-8">
                <button id="checkoutBtn" onclick="checkout()" class="bg-green-400 rounded-md py-2 px-6 text-xl font-semibold cursor-pointer">Checkout</button>
                <button onclick="clearCart()" class="bg-red-400 rounded-md py-2 px-6 text-xl font-semibold cursor-pointer">Clear Cart</button>
            </div>
        `;
    }else return;
};

let checkout = () => {
    alert("Your order has been placed successfully. Thank you for shopping with us!!!");
    clearCart();
    returnToHome();

};

let clearCart = () => {
    cart = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(cart));
    calculation();
};

let returnToHome = () => {
    window.location.href = "index.html";
}

TotalAmount();