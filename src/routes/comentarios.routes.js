import { Router } from "express";
import { crearComentario, editarComentario, obtenerComentarios } from "../controllers/comentarios.controller";

const router = Router();

//!faltan todos estos xDDDD
router.post("/api/CrearComentario", crearComentario);
router.get("/api/ObtenerComentariosPorPublicacion/:idPublicacion", obtenerComentarios);
router.put("/api/EditarComentario", editarComentario);

export default router;