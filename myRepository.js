
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

async function insertInventoryItem(data) {
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
module.exports.insertInventoryItem =  insertInventoryItem ;

//===============================================================

// async function fetchInventoryReport() {
//     const pool = await new mssql.ConnectionPool(sqlConfig);
//     const result = await pool.request().execute('sp_GetInventoryReport');
//     return result.recordset;
// }
async function fetchInventoryReport() {
    await poolPromise;
    try {
        const request = pool.request();
        const result = await request.execute('sp_GetInventoryReport');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching inventory report:', err);
        throw err; 
    }
}


module.exports.fetchInventoryReport = fetchInventoryReport;

//===============================================================


async function AddUser(userData) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('UserID', mssql.Int, userData.UserID)
        .input('FirstName', mssql.VarChar, userData.FirstName)
        .input('LastName', mssql.VarChar, userData.LastName)
        .input('Role', mssql.VarChar, userData.Role)
        .input('Email', mssql.VarChar, userData.Email)
        .input('Username', mssql.VarChar, userData.Username)
        .input('Password', mssql.VarChar, userData.Password) 
        .execute('AddUser');
    return result;
}

module.exports.AddUser = AddUser
//===============================================================

async function insertFeedback(FirstName, LastName, Role, Subject, Message) {
    try {
        await mssql.connect(sqlConfig);
        await mssql.query`INSERT INTO Feedbacks (FirstName, LastName, Role, Subject) VALUES (${FirstName}, ${LastName}, ${Role}, ${Subject})`;
        console.log("Feedback inserted successfully.");
    } catch (err) {
        console.error("Error inserting feedback:", err);
    }
}

module.exports.insertFeedback = insertFeedback;

//===============================================================


// async function fetchSuppliers() {
//     try {
//         await mssql.connect(sqlConfig);
//         return await mssql.query('EXEC FetchSuppliers');
//     } catch (err) {
//         console.error('Error fetching suppliers:', err);
//     }
// }

// async function fetchInventoryItems() {
//     try {
//         await mssql.connect(sqlConfig);
//         return await mssql.query('EXEC FetchInventoryItems');
//     } catch (err) {
//         console.error('Error fetching inventory items:', err);
//     }
// }

// async function insertOrder(orderDetails) {
//     try {
//         await mssql.connect(sqlConfig);
//         const result = await sql.query`EXEC InsertOrder ${orderDetails.OrderDate}, ${orderDetails.ExpectedDeliveryDate}, ${orderDetails.Status}, ${orderDetails.TotalCost}, ${orderDetails.UserID}`;
//         return result.recordset[0].OrderID;
//     } catch (err) {
//         console.error('Error inserting order:', err);
//     }
// }
// module.exports.fetchSuppliers = fetchSuppliers
//     module.exports.fetchInventoryItems = fetchInventoryItems
//         module.exports.insertOrder = insertOrder 