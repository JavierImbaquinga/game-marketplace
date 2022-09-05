import express, {Application} from "express";
import morgan from 'morgan';
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import productsRoutes from "./routes/productsRoutes";
import subcategoriesRoutes from "./routes/subcategoriesRoutes";
import salesRoutes from "./routes/salesRoutes";
import loginRoutes from "./routes/loginRoutes";
import addressRoutes from "./routes/addressRoutes";

class Server {
    public app:Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    //configurar los puertos
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'))
        this.app.use(cors());
        //configurar los cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        })
        //configurar para que el servidor entienda los archivos json
        this.app.use(express.json());
        //
        this.app.use(express.urlencoded({extended: false}))

    }

    //rutas
    routes(): void {
        this.app.use(indexRoutes)
        this.app.use('/api/categories',categoriesRoutes)
        this.app.use('/api/products',productsRoutes)
        this.app.use('/api/subcategories', subcategoriesRoutes)
        this.app.use('/api/sales', salesRoutes)
        this.app.use('/api/login', loginRoutes)
        this.app.use('/api/address', addressRoutes)   
    }

    //iniciar el servidor
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server initialize')
        })
    }
}

const server = new Server();
server.start();
