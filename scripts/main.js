let list = document.getElementById('list');

console.log(list);

let clearList = () =>{
    list.innerHTML = '';
};

let generateList = (isListLayout = false) => {
    list.innerHTML = listItemsData.map((x) => {
        if (isListLayout) {
            // Returns the HTML for the list layout
            return `
                <div class="flex items-start p-4 rounded-lg w-full mb-4 border-2 border-white">
                    <img src="${x.img}" alt="${x.name}" class="h-40 w-40 object-cover rounded-lg mr-4">
                    
                    <div class="flex flex-col justify-between w-full h-40">
                        <div class="flex justify-between items-start w-full">
                            <h2 class="text-2xl font-semibold text-white">${x.name}</h2>
                        </div>
                        
                        <p class="text-gray-800 text-sm overflow-hidden text-ellipsis h-12 text-white">
                            ${x.desc}
                        </p>

                        <div class="flex justify-between items-center w-full">
                            <h2 class="text-2xl font-bold text-white">TK ${x.price}</h2>
                            <button onclick="increment('${x.id}')" class="flex items-center space-x-2 bg-gray-200 rounded-md px-2 py-1 cursor-pointer hover:bg-gray-400">
                                <img src="images/logos/plus.png" alt="add" class="h-4 w-4">
                                <p class="font-bold text-sm">Add</p>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Returns the HTML for the grid layout
            return `
                <div id=product-id-${x.id} class="flex flex-col items-center rounded-lg p-4 w-60 border-2 border-white my-2">
                    <img src="${x.img}" alt="${x.name}" class="w-55 h-55 rounded-md object-cover">
                    <h3 class="text-white text-lg font-bold text-center mb-2">${x.name}</h3>
                    <p class="text-white text-sm text-center overflow-hidden text-ellipsis h-24">${x.desc}</p>
                    <div class="mt-4 flex justify-between w-full" id="price quantity">
                        <h2 class="text-white text-2xl font-bold">TK ${x.price}</h2>
                        <button onclick="increment('${x.id}')" class="flex items-center space-x-2 bg-white rounded-md px-2 cursor-pointer hover:bg-gray-400">
                            <img src="images/logos/plus.png" alt="add" class="h-4 w-4">
                            <p class="font-bold font-12px">Add</p>
                        </button>
                    </div>
                </div>
            `;
        }
    }).join("");
};

generateList();

let increment = (id) => {
    id = Number(id);   // ensure it's always a number
    let search = cart.find((x) => x.id === id);

    if (search === undefined) {
        cart.push({
            id: id,
            quantity: 1
        });
    } else {
        search.quantity += 1;
    }

    // update(id);
    calculation();
    // TotalAmount();
    localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
    id = Number(id);
    let search = cart.find((x) => x.id === id);

    if (search === undefined) return;
    if (search.quantity === 0) return;

    search.quantity -= 1;

    cart = cart.filter((x) => x.quantity !== 0);
    // update(id);
    calculation();
    // TotalAmount();
    localStorage.setItem("data", JSON.stringify(cart));
};


// let update = (id) => {
//     // console.log(id);
//     let search = cart.find((x) => x.id === id);
//     document.getElementById(id).innerHTML = search.quantity;
//     calculation();
// };

let calculation = () => {
    let cartIcon = document.getElementById("cart amount");
    cartIcon.innerHTML = cart.map((x) => x.quantity).reduce((x,y) => x+y, 0);
    
};

const listBtn = document.getElementById('listBtn');
const gridBtn = document.getElementById('gridBtn');

const setGridLayout = () => {
    list.classList.remove('flex', 'flex-col', 'items-center', 'space-y-4', 'mx-auto', 'px-60');
    list.classList.add('grid', 'grid-cols-4', 'gap-4', 'mx-60');
    generateList(false); 
};

const setListLayout = () => {
    list.classList.remove('grid', 'grid-cols-4', 'gap-4', 'mx-60');
    list.classList.add('flex', 'flex-col', 'items-center', 'space-y-4', 'px-60');
    generateList(true); 
};


setGridLayout();

listBtn.addEventListener('click', setListLayout);
gridBtn.addEventListener('click', setGridLayout);

generateList(false);
setGridLayout();
calculation();