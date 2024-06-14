import { getConnection, sql, queries } from "../database";
import config from "../config";


//!Registro
export const crearNuevoUsuario = async (req, res) => {

    const { FotoDePerfil, NombreDeUsuario, PasswordHash, Email } = req.body;

    if (NombreDeUsuario == "" || PasswordHash == "" || Email == "") {
        return res.status(400).json("Rellene los campos");
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("FotoDePerfil", sql.VarChar, FotoDePerfil)
            .input("NombreDeUsuario", sql.VarChar, NombreDeUsuario)
            .input("PasswordHash", sql.VarChar, PasswordHash)
            .input("Email", sql.VarChar, Email)
            .query(queries.crearNuevoUsuario);

        res.json({ FotoDePerfil, NombreDeUsuario, PasswordHash, Email })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

//!LOGIN
export const loginUser = async (req, res) => {
    const { Email, PasswordHash } = req.body;

    if (!Email || !PasswordHash) {
        return res.status(400).json({ msg: "Bad Request. Rellena Todos Los Campos" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Email", sql.VarChar, Email)
            .input("PasswordHash", sql.VarChar, PasswordHash)
            .query(queries.Login);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const { FotoDePerfil, NombreDeUsuario, Email, ID_Usuario } = user;

            return res.status(200).json({ 
                msg: `Login Exitoso... Bienvenido ${NombreDeUsuario || ''}`, 
                user: { 
                    ID_Usuario, 
                    FotoDePerfil, 
                    NombreDeUsuario, 
                    Email 
                } 
            });
        } else {
            return res.status(401).json({ msg: "Correo o Contraseña Incorrecto" });
        }
    } catch (error) {
        console.error("Error al intentar realizar la consulta:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


// function generateAccessToken(user) {
//         return jwt.sign(user,config.SecretWord, {expiresIn: '1d'})
// }


export const ObtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: "Bad Request. El ID del usuario es requerido" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Usuario", sql.Int, id)
            .query(queries.ObtenerUsuarioPorId);

        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Error al intentar obtener el usuario:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { FotoDePerfil, NombreDeUsuario, PasswordHash, Email } = req.body;

    if (!id || !NombreDeUsuario || !PasswordHash || !Email) {
        return res.status(400).json({ msg: "Bad Request. Rellena Todos Los Campos" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Usuario", sql.Int, id)
            .input("FotoDePerfil", sql.VarChar, FotoDePerfil)
            .input("NombreDeUsuario", sql.VarChar, NombreDeUsuario)
            .input("PasswordHash", sql.VarChar, PasswordHash)
            .input("Email", sql.VarChar, Email)
            .query(queries.EditarInformacionUsuario);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({ msg: "Datos del usuario actualizados exitosamente" });
    } catch (error) {
        console.error("Error al intentar actualizar el usuario:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const eliminarCuentaUsuario = async (req, res) => {
    const { ID_Usuario } = req.body;

    if (!ID_Usuario) {
        return res.status(400).json({ msg: "Bad Request. El ID de usuario es requerido" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .query(queries.EliminarCuenta);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({ msg: "Cuenta de usuario eliminada exitosamente" });
    } catch (error) {
        console.error("Error al intentar eliminar la cuenta de usuario:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};