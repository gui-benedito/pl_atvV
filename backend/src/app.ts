import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { initializeSequelize } from './db/conexao';
import router from './routes'
// import router from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = 5000;

async function initializeApp() {
  try {
    const sequelize = await initializeSequelize();
    await sequelize.sync({ force: false }); 
    console.log('Database synchronized successfully.');

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error initializing application:', error.message);
    process.exit(1);
  }
}

initializeApp();