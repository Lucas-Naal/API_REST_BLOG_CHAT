import express from "express"
import config from "./config"
import cors from "cors"
import jwt from "jsonwebtoken"

const app = express();
let port;

//const publicRoutes = []

app.set('port', port || config.port);

app.use(express.json());
app.use(cors({ origin: "*" }));

// app.use((req, res, next) => {
//     if (publicRoutes.includes(req.path)) {
//         return next();
//     }


//     const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Hermano te olvidaste de mandarme el token" });
//     }

//     jwt.verify(token, config.SecretWord, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: "Failed to authenticate token" });
//         }
//         req.decoded = decoded;
//         next();
//     });
// });

app.use(express.urlencoded({extended: false}));

//*AQUI VAN LAS RUTAS 


export default app;
