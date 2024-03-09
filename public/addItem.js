document.getElementById('addItemForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    let obj = {
        ItemID: document.querySelector('#ItemID').value,
        ItemName: document.querySelector('#itemName').value,
        ItemDescription: document.querySelector('#itemDescription').value,
        QuantityAvailable: document.querySelector('#QuantityAvailable').value,
        UnitPrice: document.querySelector('#UnitPrice').value,
        ReorderLevel: document.querySelector('#ReorderLevel').value,
        ExpiryDate: document.querySelector('#ExpiryDate').value,
        SupplierInfo: document.querySelector('#SupplierInfo').value,
        SupplierID: document.querySelector('#SupplierID').value,
        CategoryID: document.querySelector('#CategoryID').value,
        UserID: document.querySelector('#UserID').value
        
    }
    console.log("objBeforSendingToDB", obj)
    resetmyform()
    fetch('/api/additem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Item added successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adding item.');
        });
});

function resetmyform(){
    document.querySelector('#ItemID').value = "";
    document.querySelector('#itemName').value = "";
    document.querySelector('#itemDescription').value = "";
    document.querySelector('#QuantityAvailable').value = "";
    document.querySelector('#UnitPrice').value = "";
    document.querySelector('#ReorderLevel').value = "";
    document.querySelector('#ExpiryDate').value = "";
    document.querySelector('#SupplierInfo').value = "";
    document.querySelector('#SupplierID').value = "";
    document.querySelector('#CategoryID').value = "";
    document.querySelector('#UserID').value = "";
}

