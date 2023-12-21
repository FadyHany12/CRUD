//! GLOBAL VARIABLES 
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");

var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");

var indexUpdate = 0;

//! ARRAY FOR PRODUCT 
var productList=[];


//! LOCAL STORAGE
if(localStorage.getItem("products") !=null)
{
    productList = JSON.parse(localStorage.getItem("products"));
    displayData();
}

//! FUNCTION FOR AddProduct
function addProduct()
{
    if(allValidation())
    {
    var product=
    {
        name : productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        desc : productDescriptionInput.value
    };

    productList.push(product);
    localStorage.setItem("products" , JSON.stringify(productList));
    displayData();
    clearForm();
    }

}

//! FUNCTION FOR clearForm
function clearForm()
{
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescriptionInput.value="";
}

//! FUNCTION FOR displayData 
function displayData()
{
    var data ="";
    for( var i=0 ; i< productList.length ; i++ )
    {
        data +=`                        
        <tr>
            <td>${[i]}</td>
            <td>${productList[i].newName ? productList[i].newName : productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].desc}</td>
            <td><button onclick="setData(${i})" class="btn btn-success">Edit</button></td>
            <td><button onclick="deleteData(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=data;
}


//! FUNCTION FOR deleteData
function deleteData(index)
{
    productList.splice(index ,1 )
    localStorage.setItem("products" , JSON.stringify(productList));
    displayData();
}

//! FUNCTION FOR search
function search() {

    var term = searchInput.value;
    var data = "";

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) 
        {
            productList[i].newName = productList[i].name.toLowerCase().replace(term ,`<span class="text-danger fw-bolder">${term}</span>`);


            data += `                        
                    <tr>
                        <td>${[i]}</td>
                        <td>${productList[i].newName ? productList[i].newName : productList[i].name}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].category}</td>
                        <td>${productList[i].desc}</td>
                        <td><button onclick="setData(${i})" class="btn btn-success">Edit</button></td>
                        <td><button onclick="deleteData(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>
                    `
        }
        document.getElementById("tableBody").innerHTML = data;
    }

    if (productList.length === 0) {
        document.getElementById("searchError").classList.remove("d-none");
    } else {
        document.getElementById("searchError").classList.add("d-none");
    }
}


//! FUNCTION FOR setData
function setData(index)
{
    indexUpdate = index;
    var currentProduct = productList[index];

    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescriptionInput.value = currentProduct.desc;

    editBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}


//! FUNCTION FOR editProduct
function editProduct() 
{
    if(allValidation())
    {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescriptionInput.value
    };


    productList.splice(indexUpdate , 1 , product);
    localStorage.setItem("products" , JSON.stringify(productList));
    displayData();

    editBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");

    clearForm();
    }
    else
    {
        editProduct();
    }
    
    editBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}


//! VALIDATION (REGEX)
function validProductNameInput() 
{
    var regex = /^[A-Z][a-zA-Z]{2,6}$/;
    var isValid = regex.test(productNameInput.value);
    if (isValid) {
        document.getElementById("nameError").classList.add("d-none");

    }
    else {
        document.getElementById("nameError").classList.remove("d-none");
    }
    return isValid;
}

function validProductPriceInput() {
    var regex = /((^[1-9][0-9]{3}$)|10000)/;
    var isValid = regex.test(productPriceInput.value);
    if (isValid) {
        document.getElementById("priceError").classList.add("d-none");

    }
    else {
        document.getElementById("priceError").classList.remove("d-none");
    }
    return isValid;
}

function validProductCategoryInput() {
    var regex = /^(mobile|Mobile|WATCH|Watch|watch|SCREEN|Screen|screen)$/gm;
    var isValid = regex.test(productCategoryInput.value);
    if (isValid) {
        document.getElementById("catError").classList.add("d-none");

    }
    else {
        document.getElementById("catError").classList.remove("d-none");
    }
    return isValid;
}

function validProductDescriptionInput() {
    var regex = /^[a-zA-Z\s\.\,]{1,255}$/gm;
    var isValid = regex.test(productDescriptionInput.value);
    if (isValid) {
        document.getElementById("descError").classList.add("d-none");

    }
    else {
        document.getElementById("descError").classList.remove("d-none");
    }
    return isValid;
}


function allValidation() {

    if (validProductNameInput() && validProductPriceInput() && validProductCategoryInput() && validProductDescriptionInput()) {
        return true;
    }
}