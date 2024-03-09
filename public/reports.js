document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/reports')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('reportContainer');
        const table = document.createElement('table');
        table.innerHTML = `<tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity Available</th>
            <th>Reorder Level</th>
            <th>Expiry Date</th>
            <th>Unit Price</th>
            <th>Supplier Name</th>
            <th>Contact Info</th>
            <th>Category</th>
        </tr>`;
        data.forEach(item => {
            const row = table.insertRow(-1);
            Object.values(item).forEach(text => {
                const cell = row.insertCell(-1);
                cell.textContent = text;
            });
        });
        container.appendChild(table);
    })
    .catch(error => console.error('Failed to fetch inventory report:', error));
});

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/api/reports')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Ensure 'reportContainer' exists in your HTML
//         const container = document.getElementById('reportContainer');
//         if (!container) {
//             console.error('Container element #reportContainer not found');
//             return;
//         }
        
//         const table = document.createElement('table');
//         table.innerHTML = `<tr>
//             <th>Item Name</th>
//             <th>Description</th>
//             <th>Quantity Available</th>
//             <th>Reorder Level</th>
//             <th>Expiry Date</th>
//             <th>Unit Price</th>
//             <th>Supplier Name</th>
//             <th>Contact Info</th>
//             <th>Category</th>
//         </tr>`;
        
//         data.forEach(item => {
//             const row = table.insertRow(-1);
//             // Consider validating item structure if necessary
//             Object.values(item).forEach(text => {
//                 const cell = row.insertCell(-1);
//                 cell.textContent = text;
//             });
//         });
        
//         container.appendChild(table);
//     })
//     .catch(error => {
//         // Consider adding user-friendly error reporting on the webpage
//         console.error('Failed to fetch inventory report:', error);
//     });
// });

