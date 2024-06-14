import { Router } from "express";
import { crearNuevaPublicacion, editarPublicacion, obtenerPublicaciones, obtenerPublicacionesPorUsuario } from "../controllers/publicaciones.controller";



const router = Router();

router.post("/api/CrearPublicacion", crearNuevaPublicacion);
router.get("/api/ObtenerPublicaciones", obtenerPublicaciones);
router.get("/api/ObtenerMisPublicaciones/:ID_Usuario", obtenerPublicacionesPorUsuario);
//!falta usar estos
router.put("/api/EditarPublicacion", editarPublicacion);

export default router;