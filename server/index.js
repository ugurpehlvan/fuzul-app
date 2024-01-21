import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// routes
import propertyRoutes from './routes/properties.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
// NodeJS serve the files for our built React app
const __dirname = path.resolve();

const buildPath = path.resolve(__dirname, '../client/build');

fs.access(buildPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Directory does not exist: ${buildPath}`);
  } else {
    console.log(`Directory exists: ${buildPath}`);
  }
});

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use("/api/properties", propertyRoutes);

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
