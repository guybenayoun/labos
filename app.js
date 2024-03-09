const express = require('express');
const myRepository = require("./myRepository")

const app = express();
app.use(express.json()); 
app.use(express.static('public')); // Serve static files

//=========================
const { InsertInventoryItem} = require('./myRepository');
app.post("/api/additem", async (req, res) => {
    try {
        const result = await InsertInventoryItem(req.body);
        res.json(result);
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ error: err.message });
    }
});
//=========================
const { fetchInventoryReport } = require('./myRepository');
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
const { insertFeedback } = require('./myRepository');

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


const { fetchSuppliers, fetchInventoryItems, insertOrder } = require('./myRepository');

app.get('/api/suppliers', async (req, res) => {
    const suppliers = await fetchSuppliers();
    res.json(suppliers);
});

app.get('/api/inventory-items', async (req, res) => {
    const items = await fetchInventoryItems();
    res.json(items);
});

app.post('/api/orders', async (req, res) => {
    const orderID = await insertOrder(orderDetails);
    const orderDetails = req.body;
    try {
        const orderID = await insertOrder(orderDetails);
        res.status(201).json({ message: "Order created successfully", orderID });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});