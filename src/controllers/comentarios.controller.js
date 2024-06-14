import { getConnection, sql } from "../database/connection";
import { queries } from "../database/querys";


export const obtenerComentarios = async (req, res) => {
    const { idPublicacion } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Publicacion", sql.Int, idPublicacion)
            .query(`
                SELECT c.DescripcionDelComentario, c.FechaDeCreacion, u.NombreDeUsuario 
                FROM Comentarios c
                JOIN CuentasUsuarios u ON c.ID_Usuario = u.ID_Usuario
                WHERE c.ID_Publicacion = @ID_Publicacion AND c.EsActivo = 1
            `);

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const crearComentario = async (req, res) => {
    const { DescripcionDelComentario, ID_Usuario, ID_Publicacion } = req.body;

    if (!DescripcionDelComentario || !ID_Usuario || !ID_Publicacion) {
        return res.status(400).json({ msg: "Bad Request. Todos los campos son requeridos" });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("DescripcionDelComentario", sql.VarChar, DescripcionDelComentario)
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .input("ID_Publicacion", sql.Int, ID_Publicacion)
            .query(`
                INSERT INTO Comentarios (DescripcionDelComentario, ID_Usuario, ID_Publicacion)
                VALUES (@DescripcionDelComentario, @ID_Usuario, @ID_Publicacion)
            `);

        res.status(201).json({ msg: "Comentario creado exitosamente" });
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};



export const editarComentario = async (req, res) => {
    const { ID_Comentarios, DescripcionDelComentario, ID_Usuario, ID_Publicacion } = req.body;

    if (!ID_Comentarios || !DescripcionDelComentario || !ID_Usuario || !ID_Publicacion) {
        return res.status(400).json({ msg: "Bad Request. Rellena Todos Los Campos" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Comentarios", sql.Int, ID_Comentarios)
            .input("DescripcionDelComentario", sql.VarChar, DescripcionDelComentario)
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .input("ID_Publicacion", sql.Int, ID_Publicacion)
            .query(queries.EditarComentario);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Comentario no encontrado o no tienes permiso para editarlo" });
        }

        res.status(200).json({ msg: "Comentario editado exitosamente" });
    } catch (error) {
        console.error("Error al intentar editar el comentario:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};