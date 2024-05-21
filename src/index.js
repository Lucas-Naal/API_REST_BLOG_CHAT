import app from "./app";
import "./database/connection";

app.listen(app.get("port"));

console.log("Server escuando en el puerto", app.get("port"));