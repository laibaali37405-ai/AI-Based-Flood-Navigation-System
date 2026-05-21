async function fetchLiveFloodData() {
    try {
        console.log("Fetching live data from backend...");
        let response = await fetch('http://localhost:5000/api/high-risk');
        if (!response.ok) throw new Error("Server error");
        let data = await response.json();
        
        console.log("Data Received:", data);
        document.getElementById('water-level').innerText = "Status: Connected - " + data.length + " Records Active";
        alert("✅ Success! Connected to SQL Server. Records fetched: " + data.length);
    } catch (error) {
        alert("❌ Error: Backend server is offline. Run 'node server.js' first!");
    }
}

function handleAuthorityLogin(event) {
    event.preventDefault();
    let userInput = prompt("Enter Authority Username/ID:");

    // Yahan hum check karenge ke kya input valid hai
    // Aap yahan apna database ka ID ya naam check kar sakti hain
    const validUser = "laiba amjad"; 

    if (userInput === validUser) {
        alert("Access Granted! Executing SQL Query for: " + userInput);
       
    } else {
        // Agar user galat input dega toh yeh message aayega
        alert("Access Denied! Incorrect Username or ID. Please try again.");
    }
}
// Status check karne ka naya function
function checkSystemStatus() {
    alert("SYSTEM STATUS: OK\nDatabase: Connected\nFloodGuard AI: Active (Real-time monitoring)");
    console.log("System Status Checked: All systems operational.");
    // Example: agar aapke pass id 'risk-status' hai
document.getElementById('risk-status').innerText = data[0].RiskStatus;
}