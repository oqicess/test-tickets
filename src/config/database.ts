import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Ticket } from '../models/tickets/ticket';

dotenv.config();
const database = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    models: [Ticket],
});

export default database;
