
// npm i mssql

const mssql = require('mssql')

const sqlConfig = {
    user: "sa29",
    password: "SQLExpress2024!",
    database: "labos",
    server: 'guyb.database.windows.net', 
    port: 1433, 
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
}
const pool = new mssql.ConnectionPool(sqlConfig);
const poolPromise = pool.connect();

//===============================================================

async function InsertInventoryItem(data) {
    const pool = await new mssql.ConnectionPool(sqlConfig).connect();
    const result = await pool.request()
        .input("ItemID", mssql.Int, data.ItemID)
        .input("ItemName", mssql.VarChar, data.ItemName)
        .input("ItemDescription", mssql.VarChar, data.ItemDescription)
        .input("QuantityAvailable", mssql.Int, data.QuantityAvailable)
        .input("ReorderLevel", mssql.Int, data.ReorderLevel)
        .input("ExpiryDate", mssql.Date, data.ExpiryDate)
        .input("UnitPrice", mssql.Decimal(18, 2), data.UnitPrice)
        .input("SupplierInfo", mssql.VarChar, data.SupplierInfo)
        .input("CategoryID", mssql.Int, data.CategoryID)
        .input("SupplierID", mssql.Int, data.SupplierID)
        .input("UserID", mssql.Int, data.UserID)
        .execute('InsertInventoryItem');
    return result;
}
module.exports = { InsertInventoryItem };

//===============================================================

async function fetchInventoryReport() {
    const pool = await mssql.ConnectionPool(sqlConfig);
    const result = await pool.request().execute('sp_GetInventoryReport');
    return result.recordset;
}
    

module.exports = {fetchInventoryReport};

//===============================================================


const addUser = async (userData) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('UserID', mssql.Int, userData.UserID)
            .input('FirstName', mssql.VarChar, userData.FirstName)
            .input('LastName', mssql.VarChar, userData.LastName)
            .input('Role', mssql.VarChar, userData.Role)
            .input('Email', mssql.VarChar, userData.Rmail)
            .input('Username', mssql.VarChar, userData.Username)
            .input('Password', mssql.VarChar, userData.Password) 
            .execute('AddUser');
        return result;
    } catch (err) {
        console.error('Database operation failed:', err);
        throw err;
    }
}
//===============================================================

async function insertFeedback(FirstName, LastName, Role, Subject, Message) {
    try {
        await mssql.connect(sqlConfig);
        await mssql.query`INSERT INTO Feedbacks (FirstName, LastName, Role, Subject, Message) VALUES (${FirstName}, ${LastName}, ${Role}, ${Subject}, ${Message})`;
        console.log("Feedback inserted successfully.");
    } catch (err) {
        console.error("Error inserting feedback:", err);
    }
}

module.exports = { insertFeedback };

//===============================================================


async function fetchSuppliers() {
    try {
        await poolPromise;
        const request = new mssql.Request(pool);
        const result = await request.query('SELECT SupplierID, SupplierName FROM Supplier');
        return result.recordset;
    } catch (err) {
        console.error('fetchSuppliers error:', err);
        throw err;
    }
}

async function fetchInventoryItems() {
    try {
        await poolPromise;
        const request = new mssql.Request(pool);
        const result = await request.query('SELECT ItemID, ItemName FROM InventoryItem');
        return result.recordset;
    } catch (err) {
        console.error('fetchInventoryItems error:', err);
        throw err;
    }
}

async function insertOrder(orderDetails) {
    try {
        await poolPromise;
        const request = new mssql.Request(pool);
        request.input('OrderDate', mssql.Date, orderDetails.orderDate)
               .input('ExpectedDeliveryDate', mssql.Date, orderDetails.expectedDeliveryDate)
               .input('Status', mssql.VarChar, orderDetails.status)
               .input('TotalCost', mssql.Decimal(10, 2), orderDetails.totalCost)
               .input('UserID', mssql.Int, orderDetails.userID);

        const result = await request.query(`INSERT INTO Orders (OrderDate, ExpectedDeliveryDate, Status, TotalCost, UserID) 
                                            VALUES (@OrderDate, @ExpectedDeliveryDate, @Status, @TotalCost, @UserID);
                                            SELECT SCOPE_IDENTITY() AS OrderID;`);
        return result.recordset[0].OrderID;
    } catch (err) {
        console.error('insertOrder error:', err);
        throw err;
    }
}

module.exports = { fetchSuppliers, fetchInventoryItems, insertOrder };