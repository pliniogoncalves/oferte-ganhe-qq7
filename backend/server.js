const app = require('./app'); // Import the application from app.js
const PORT = process.env.PORT || 3000; // Set the port

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});