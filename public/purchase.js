// async function populateDropdown(url, elementId) {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const selectElement = document.getElementById(elementId);
//         selectElement.innerHTML = '';
      
//         data.forEach(item => {
//             let option = document.createElement('option');
//             option.value = item.name;
//             option.text = item.name; 
//             selectElement.appendChild(option);
//         });
//     } catch (error) {
//         console.error('Failed to populate dropdown:', error);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     populateDropdown('/api/items', 'ItemName'); 
//     populateDropdown('/api/suppliers', 'SupplierName'); 
// });

// document.getElementById('purchaseForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     const formDataObj = Object.fromEntries(formData.entries());
    
//     try {
//         const response = await fetch('/api/orders', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formDataObj),
//         });
//         if (response.ok) {
//             alert('Order submitted successfully!');
//             this.reset();
//         } else {
//             const errorResponse = await response.json();
//             alert(errorResponse.message || 'Failed to submit order');
//         }
//     } catch (error) {
//         console.error('Submission error:', error);
//         alert('Failed to submit order due to an error.');
//     }
// });
