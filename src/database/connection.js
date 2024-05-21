import sql from "mssql";
import config from "../config";

const dbsettings = { 
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbDataBase,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export async function getConnection() {
    try {
        const pool = await sql.connect(dbsettings);
        return pool;
    } catch (error) {
        console.error("Error de conexión a la base de datos: ", error);
    }
};

export {sql};