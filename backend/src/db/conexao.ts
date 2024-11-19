import { Sequelize } from 'sequelize-typescript';
import mysql from 'mysql2/promise'; 
import { Usuario } from '../models/Usuario';
import { Pet } from '../models/Pet';
import Produto from '../models/Produto';
import Servico from '../models/Servico';

const createDatabase = async (): Promise<void> => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'fatec',
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS petlovers');
    console.log('Database "petlovers" created or exists already.');

    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
};

export const initializeSequelize = async (): Promise<Sequelize> => {
  try {
    await createDatabase();

    const sequelize = new Sequelize({
      database: 'petlovers',
      username: 'root',
      password: 'fatec',
      host: 'localhost',
      dialect: 'mysql',
      models: [Usuario, Pet, Produto, Servico],
    });

    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    return sequelize;
  } catch (error) {
    console.error('Error initializing Sequelize:', error);
    throw error
  }
};