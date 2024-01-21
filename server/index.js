const express = require('express');
const cors = require('cors');
const path = require('path');

// routes
const propertyRoutes = require('./routes/properties.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use("/api/properties", propertyRoutes);

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
