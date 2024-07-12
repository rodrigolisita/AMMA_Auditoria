const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// "Hello World" route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Assuming you create an index.html in the 'public' folder
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});