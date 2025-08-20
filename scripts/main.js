let list = document.getElementById('list');

console.log(list);

let clearList = () =>{
    list.innerHTML = '';
};

let generateList = () =>{
    // clearList();
    return (list.innerHTML = listItemsData.map((x)=>{
        return `
            <div id="list item" class="flex flex-col items-center rounded-lg p-4 w-60 h-110 border-2 border-white">
                <img src="${x.img}" alt="${x.name}" class="w-55 h-55 rounded-md object-cover">
                <h3 class="text-white text-lg font-bold text-center mb-2">${x.name}</h3>
                <p class="text-white text-sm text-center overflow-hidden text-ellipsis h-24">${x.desc}</p>
                <div class="mt-4 flex justify-between w-full" id="price quantity">
                    <h2 class="text-white text-2xl font-bold">${"TK "+x.price}</h2>
                    <button id="add to cart" class="flex items-center space-x-2 bg-white rounded-md px-2 cursor-pointer hover:bg-gray-400">
                        <img src="images/logos/plus.png" alt="add" class="h-4 w-4">
                        <p id="add" class="font-bold font-12px">Add</p>
                    </button>
                </div>
            </div>
    
    `
    }).join(""));
};

generateList();


