import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';

// routes
import propertyRoutes from './routes/properties.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
// NodeJS serve the files for our built React app
const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use("/api/properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
