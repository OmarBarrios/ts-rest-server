import dotenv from 'dotenv';
import Server from './models/server';
export const nombre = 'Omar';

dotenv.config();

const server = new Server();


server.listen();