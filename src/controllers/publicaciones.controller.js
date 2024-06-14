import { getConnection, sql } from "../database/connection"; 
import { queries } from "../database/querys"; 
const multer = require('multer');
const path = require('path');

export const obtenerPublicaciones = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(queries.ObtenerTodasLasPublicaciones);

        const publicaciones = result.recordset.map(publicacion => {
            return {
                ID_Publicacion: publicacion.ID_Publicacion,
                Titulo: publicacion.Titulo,
                Descripcion: publicacion.Descripcion,
                Imagen: publicacion.Imagen, 
                NombreDeUsuario: publicacion.NombreDeUsuario,
                FechaDePublicacion: publicacion.FechaDePublicacion
            };
        });

        res.status(200).json(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


export const obtenerPublicacionesPorUsuario = async (req, res) => {
    const { ID_Usuario } = req.params;

    if (!ID_Usuario) {
        return res.status(400).json({ msg: "Bad Request. Proporcione el ID del usuario" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .query(queries.ObtenerPublicacionesPorUsuario);

        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "No se encontraron publicaciones para este usuario" });
        }

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error al intentar obtener las publicaciones:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const crearNuevaPublicacion = async (req, res) => {
    const { ID_Usuario, Titulo, Descripcion } = req.body;
    const Imagen = req.file ? req.file.path : null; // Obtener la ruta del archivo de imagen

    if (!ID_Usuario || !Titulo || !Descripcion) {
        return res.status(400).json({ msg: "Bad Request. Rellena Todos Los Campos" });
    }

    try {
        const pool = await getConnection();
        await pool.request()
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .input("Titulo", sql.VarChar, Titulo)
            .input("Descripcion", sql.VarChar, Descripcion)
            .input("Imagen", sql.VarChar, Imagen) // Insertar la ruta de la imagen en la base de datos
            .query(queries.CrearPublicacion);

        res.status(201).json({ msg: "Publicación creada exitosamente" });
    } catch (error) {
        console.error("Error al intentar crear la publicación:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export const editarPublicacion = async (req, res) => {
    const { ID_Publicacion, Titulo, Descripcion, ID_Usuario } = req.body;

    if (!ID_Publicacion || !Titulo || !Descripcion || !ID_Usuario) {
        return res.status(400).json({ msg: "Bad Request. Rellena Todos Los Campos" });
    }

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("ID_Publicacion", sql.Int, ID_Publicacion)
            .input("Titulo", sql.VarChar, Titulo)
            .input("Descripcion", sql.VarChar, Descripcion)
            .input("ID_Usuario", sql.Int, ID_Usuario)
            .query(queries.EditarPublicacion);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ msg: "Publicación no encontrada o no autorizado para editar" });
        }

        res.status(200).json({ msg: "Publicación editada exitosamente" });
    } catch (error) {
        console.error("Error al intentar editar la publicación:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};