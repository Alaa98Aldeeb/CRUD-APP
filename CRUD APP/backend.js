//all id's of project
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let disc = document.getElementById('discount');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let counter = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let creatBtn = document.getElementById('submit');
let searchTitleBtn = document.getElementById('searchTitle');
let searchCategBtn = document.getElementById('searchCategory');
let deleteAllSection = document.getElementById('deleteAll');

let createOption = "create";
let tmp;
let searchKey = 'title';


function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +disc.value;
        total.innerHTML = result;
        total.style.background = 'teal';
    } else {
        total.style.background = 'red';
        total.innerHTML = '';
    }
}

let dataProduct = [];
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
}
creatBtn.onclick = function () {

    if (createOption == "update") {
        dataProduct[tmp].title = title.value.toLowerCase();
        dataProduct[tmp].price = price.value;
        dataProduct[tmp].taxes = price.value;
        dataProduct[tmp].ads = ads.value;
        dataProduct[tmp].total = total.innerHTML;
        dataProduct[tmp].disc = disc.value;
        dataProduct[tmp].category = category.value.toLowerCase();
        createOption = "create";
        creatBtn.innerHTML = "Create";
        counter.style.display = 'block';
    } else {
        let newProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            disc: disc.value,
            total: total.innerHTML,
            category: category.value.toLowerCase(),

        };
        if (counter.value > 1) {
            for (let i = 0; i < counter.value; i++) {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct.push(newProduct);
        }
    }



    localStorage.setItem('product', JSON.stringify(dataProduct));
    clearInputs();
    showData();
}



function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    category.value = '';
    ads.value = '';
    counter.value = '';
    total.innerHTML = '';
    disc.value = '';
    getTotal();
}


function showData() {
    if (dataProduct.length > 0) {
        deleteAllSection.innerHTML = `
        <button onclick="deleteAllProducts()">Delete All(${dataProduct.length})</button>
        `
    } else {
        deleteAllSection.innerHTML = '';
    }
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].disc}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button id="update" onclick="updateRowItem(${i})"">update</button></td>
                        <td><button id="delete" onclick="deleteRowItem(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;


}
showData();

function deleteRowItem(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

function deleteAllProducts() {
    dataProduct.splice(0);
    localStorage.product = dataProduct;
    showData();
}


function updateRowItem(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    disc.value = dataProduct[i].disc;
    total.innerHTML = dataProduct[i].total;
    category.value = dataProduct[i].category;
    getTotal();
    creatBtn.innerHTML = "Update";
    createOption = "update";
    counter.style.display = 'none';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


function searchType(id) {
    if (id == 'searchTitle') {
        searchKey = 'title';
    } else {
        searchKey = 'category';
    }

    search.focus();
    search.placeholder = 'Search By ' + searchKey;
    showData();
}


function searchResults(value) {
    let table = '';
    if(searchKey == 'title'){
        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].title.includes(value)){
                table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].disc}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button id="update" onclick="updateRowItem(${i})"">update</button></td>
                        <td><button id="delete" onclick="deleteRowItem(${i})">delete</button></td>
        </tr>
        `
            }
        }
    }else{
        for(let i=0;i<dataProduct.length;i++){
            if(dataProduct[i].category.includes(value)){
                table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].disc}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button id="update" onclick="updateRowItem(${i})"">update</button></td>
                        <td><button id="delete" onclick="deleteRowItem(${i})">delete</button></td>
        </tr>
        `
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}