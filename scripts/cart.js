let calculation = () => {
    let cartIcon = document.getElementById("cart amount");
    cartIcon.innerHTML = cart.map((x) => x.quantity).reduce((x,y) => x+y, 0);
    
};

calculation();

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let generateCartItems = () => {
    if (cart.length !== 0) {
    // Start with a new, empty string to build the content
    let cartContent = ``;

    // Add the "Cart Items" heading to the content string first
    cartContent += `<div class="text-white text-6xl flex justify-center font-bold underline my-10">Cart Items</div>`;

    // Now, map the cart items and append them to the content string
    cartContent += cart.map((x) => {
        let search = listItemsData.find((y) => y.id === x.id) || [];

        // Note: The variable 'search' might be an empty array
        // if find() fails, causing a TypeError. Using || {} is safer.
        let itemData = listItemsData.find((y) => y.id === x.id) || {};

        return `
            <div class="flex ml-40 mt-10 bg-white h-45 w-200 p-4 rounded-lg">
                <img src="${itemData.img}" alt="item-image" class="h-40 w-40 object-cover rounded-lg my-auto mr-4">
                
                <div class="flex flex-col w-full space-y-1">
                    <div id="item-name-cross" class="flex justify-between w-full">
                        <h2 id="name" class="text-2xl font-semibold">${itemData.name}</h2>
                        <div id="cross">
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
                            <p id="cart quantity" class="text-xl">${x.quantity}</p>
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
            <h2 class="font-bold text-white text-5xl mt-20 mb-7 flex justify-center">Cart is Empty</h2>
            <a href="index.html" class="flex justify-center">
                <button class="bg-white rounded-lg h-10 w-auto px-4 text-xl font-semibold cursor-pointer">
                    Back to Home
                </button>
            </a>
        `;
    }
};

let increment = (id) => {
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
    localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
    let search = cart.find((x) => x.id === id);

    if (search === undefined) {
        return;
    } else if (search.quantity === 0) {
        return;
    } else {
        search.quantity -= 1;
    }

    cart = cart.filter((x) => x.quantity !== 0);
    generateCartItems(); 

    update(id);
    calculation();

    localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
    let search = cart.find((x) => x.id === id);

    let quantityElement = document.getElementById(`quantity-${id}`);
    

    if (quantityElement) {
        quantityElement.innerHTML = search ? search.quantity : 0;
    }
    
    calculation();
    generateCartItems();
};

generateCartItems();