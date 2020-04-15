var url = '/product';
var getProducts = document.getElementById('getProducts');
getProducts.addEventListener('click', updateProducts);
function updateProducts(){
    fetch(url)
    .then(res => res.json())
    .then(products => {
        var tbody = document.getElementById('tbody');
        tbody.innerHTML = ' ';
        for(var i = 0; i < products.length; i++){
            tbody.innerHTML += `
            <tr>
                <td>${products[i].id}</td>
                    <td>
                        <input id="${products[i].id}" type="text" value="${products[i].name}">
                    </td>
                <td>
                    <button name="update-button">Update</button>
                    <button name="delete-button">Delete</button>
                </td>
            </tr>
            `
        }
    });
}
var productForm = document.getElementById('productForm');
productForm.addEventListener('submit', function(e){
    e.preventDefault();
    var newProduct = document.getElementById('newProduct').value;

     fetch(url, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({name: newProduct})
     })
     .then(res => res.json())
     .then(res => console.log(res),  updateProducts());
});
document.getElementById('table').addEventListener('click', function(e){
    if(e.target.name === 'update-button'){
        var id = e.target.parentElement.parentElement.firstElementChild.innerHTML
        var name = document.getElementById(id).value;
        fetch(url + '/' + id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        })
        .then(res => res.json())
        .then(res => console.log(res),  updateProducts());
    }

    if(e.target.name === 'delete-button'){
        var id = e.target.parentElement.parentElement.firstElementChild.innerHTML
        fetch(url + '/' + id,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => console.log(res), updateProducts());
    }
});