const express = require('express');
const myRepository = require("./myRepository")

const app = express();
app.use(express.json()); 
app.use(express.static('public')); // Serve static files

//=========================
app.post("/api/additem", async (req, res) => {
    try {
        const result = await myRepository.insertInventoryItem(req.body);
        res.json(result);
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ error: err.message });
    }
});
//=========================

const {fetchInventoryReport } = require('./myRepository');
app.get('/api/reports', async (req, res) => {
    try {
        const reportData = await fetchInventoryReport();
        res.json(reportData);
    } catch (error) {
        console.error('Error fetching inventory report:', error);
        res.status(500).send('Error fetching inventory report');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//=========================
const {insertFeedback} = require('./myRepository');

app.post('/submit-feedback', async (req, res) => {
    const { FirstName, LastName, Role, Subject, Message } = req.body;
    try {
        await insertFeedback(FirstName, LastName, Role, Subject, Message);
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Feedback submission failed:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//=========================
const {AddUser} = require('./myRepository');

app.post("/system-settings/add-user", async (req, res) => {
    try {
        const result = await AddUser(req.body);
        res.json({ message: "User added successfully", result });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Error adding user' });
    }
});






// const {fetchSuppliers} = require('./myRepository');
// const {fetchInventoryItems} = require('./myRepository');
// const {insertOrder} = require('./myRepository');


// app.get('/api/suppliers', async (req, res) => {
//     try {
//         const suppliers = await fetchSuppliers();
//         res.json(suppliers);
//     } catch (error) {
//         console.error('Error fetching suppliers:', error);
//         res.status(500).json({ error: 'Failed to fetch suppliers' });
//     }
// });

// app.get('/api/inventory-items', async (req, res) => {
//     try {
//         const items = await fetchInventoryItems();
//         res.json(items);
//     } catch (error) {
//         console.error('Error fetching inventory items:', error);
//         res.status(500).json({ error: 'Failed to fetch inventory items' });
//     }
// });

// // Corrected POST route for /api/orders
// app.post('/api/orders', async (req, res) => {
//     const orderDetails = req.body; // Correctly define orderDetails from req.body
//     try {
//         const orderID = await insertOrder(orderDetails); // Use orderDetails correctly
//         res.status(201).json({ message: "Order created successfully", orderID });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ error: 'Failed to create order' });
//     }
// });

