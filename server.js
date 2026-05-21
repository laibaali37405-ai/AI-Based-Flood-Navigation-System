const express = require('express');
const sql = require('mssql/msnodesqlv8'); // Windows Authentication special driver
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Isse frontend-backend bina error ke baatein karenge

// 1. Aapke SQL Server ki connection string (Windows Authentication)
const config = {
    connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=FloodGuard_DB;Trusted_Connection=yes;'
};

// 2. Test Route: Check karne ke liye ke server SQL se connect hua ya nahi
app.get('/api/status', async (req, res) => {
    try {
        await sql.connect(config);
        res.json({ status: "Success", message: "Connected successfully to FloodGuard_DB!" });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
});

// 3. Main Data Route: Database se Filtered Data frontend ko bhejna
app.get('/api/high-risk', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        // Wahi filter query jo aapne SSMS mein test ki thi!
        let result = await pool.request().query("SELECT * FROM FloodData WHERE PRECTOTCORR LIKE '2.%' ORDER BY DOY ASC;");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send("Database Error: " + err.message);
    }
});

// Server ko port 5000 par run karna
app.listen(5000, () => {
    console.log("🚀 Backend Server running on http://localhost:5000");
});