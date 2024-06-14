import express from "express";
import config from "./config";
import cors from "cors";
import path from "path";
import userRoutes from "../src/routes/usuario.routes";
import postRoutes from "../src/routes/publicaciones.routes";
import commentsRoutes from "../src/routes/comentarios.routes";

const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ruta donde se guardarán los archivos de imagen
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

let port;

// Configuración del puerto
app.set('port', port || config.port);

// Middlewares
app.use(upload.single('Imagen'));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(userRoutes);
app.use(postRoutes);
app.use(commentsRoutes);

export default app;
