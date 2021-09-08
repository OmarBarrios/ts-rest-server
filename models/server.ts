import express, {Application} from 'express';

import userRoutes from '../routes/usuario'
import cors from 'cors';
import db from '../db/connection';

class Server {


    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';

        //inicializacion de metodos
        this.dbConnection();
        this.middlewares();
        this.routes();
        

    }

    // conectar DB
    async dbConnection() {
        try {
            
            await db.authenticate();
            console.log('Database conect');
            

        } catch (error) {
            console.log(error);
        }
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //lectura del body
        this.app.use( express.json() );

        //carpeta publica
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor en http://localhost:${this.port}`);
            
        })
    }

}


export default Server;