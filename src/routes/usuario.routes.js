import { Router } from "express";
import { ObtenerUsuarioPorId, actualizarUsuario, crearNuevoUsuario, eliminarCuentaUsuario, loginUser } from "../controllers/usuarios.controller";



const router = Router();
router.post("/api/Registro", crearNuevoUsuario);
router.post("/api/login", loginUser);
router.get("/api/ObtenerUsuario/:id", ObtenerUsuarioPorId);
router.put("/api/EditarInformacionUsuario/:id", actualizarUsuario);
router.put("/api/EliminarCuenta", eliminarCuentaUsuario)

export default router;