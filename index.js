// index.js
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// "Hello World" route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});

// Start the server if this file is being run directly
if (require.main === module) { 
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

module.exports = app; // Export the app instance
