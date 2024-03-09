async function populateDropdown(url, elementId, nameProperty, valueProperty) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const select = document.getElementById(elementId);
        data.forEach(item => {
            const option = new Option(item[nameProperty], item[valueProperty]);
            select.add(option);
        });
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateDropdown('/api/inventory-items', 'ItemName', 'ItemName', 'ItemID'); // Assuming API returns ItemName and ItemID
    populateDropdown('/api/suppliers', 'SupplierName', 'SupplierName', 'SupplierID'); // Assuming API returns SupplierName and SupplierID
});

document.getElementById('purchaseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    // Convert formData to an object that includes the correct property names expected by the backend.
    let orderDetails = {};
    formData.forEach((value, key) => {
        if(key === 'ItemName') {
            orderDetails['ItemID'] = value; // Assuming backend expects ItemID
        } else if (key === 'SupplierName') {
            orderDetails['SupplierID'] = value; // Assuming backend expects SupplierID
        } else {
            orderDetails[key] = value;
        }
    });

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderDetails }),
        });
        if (response.ok) {
            alert('Order submitted successfully!');
            this.reset();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Failed to submit order');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});
