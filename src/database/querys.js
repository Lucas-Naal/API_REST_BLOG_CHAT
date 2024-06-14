export const queries = {
    //!QUERIES DE USUARIO
    crearNuevoUsuario: 'INSERT INTO CuentasUsuarios (FotoDePerfil, NombreDeUsuario, PasswordHash, Email, FechaDeCreacion, EsActivo) VALUES (@FotoDePerfil, @NombreDeUsuario, @PasswordHash, @Email, GETDATE(), 1)',
    Login: "SELECT ID_Usuario, FotoDePerfil, NombreDeUsuario, Email FROM CuentasUsuarios WHERE Email = @Email AND PasswordHash = @PasswordHash AND EsActivo = 1",
    ObtenerUsuarioPorId: "SELECT ID_Usuario, FotoDePerfil, NombreDeUsuario, Email, FechaDeCreacion, EsActivo FROM CuentasUsuarios WHERE ID_Usuario = @ID_Usuario",
    EditarInformacionUsuario: "UPDATE CuentasUsuarios SET FotoDePerfil = @FotoDePerfil, NombreDeUsuario = @NombreDeUsuario, Email = @Email, PasswordHash = @PasswordHash WHERE ID_Usuario = @ID_Usuario;",
    EliminarCuenta: " UPDATE CuentasUsuarios SET EsActivo = 0 WHERE ID_Usuario = @ID_Usuario",
    //!QUERIES DE PUBLICACION
    ObtenerTodasLasPublicaciones: `
    SELECT 
        p.ID_Publicacion, 
        p.FechaDePublicacion, 
        p.Titulo, 
        p.Descripcion, 
        p.FechaDeModificacion, 
        p.ModificadoPor, 
        p.EsActivo, 
        p.Imagen, -- Asegúrate de seleccionar la columna Imagen
        u.ID_Usuario, 
        u.NombreDeUsuario, 
        u.FotoDePerfil, 
        u.Email 
    FROM 
        Publicaciones p 
    INNER JOIN 
        CuentasUsuarios u ON p.ID_Usuario = u.ID_Usuario 
    WHERE 
        p.EsActivo = 1 
    ORDER BY 
        p.ID_Publicacion DESC
`,

    ObtenerPublicacionesPorUsuario: "  SELECT * FROM Publicaciones WHERE ID_Usuario = @ID_Usuario AND EsActivo = 1",
    CrearPublicacion: "INSERT INTO Publicaciones (FechaDePublicacion, ID_Usuario, Titulo, Descripcion, Imagen, FechaDeModificacion, ModificadoPor, EsActivo)VALUES (GETDATE(), @ID_Usuario, @Titulo, @Descripcion, @Imagen, NULL, NULL, 1)",
    EditarPublicacion: " UPDATE Publicaciones SET Titulo = @Titulo, Descripcion = @Descripcion, FechaDeModificacion = GETDATE(), ModificadoPor = @ID_Usuario WHERE ID_Publicacion = @ID_Publicacion AND ID_Usuario = @ID_Usuario AND EsActivo = 1",
    //!QUERIES DE COMENTARIOS
    ObtenerComentarios: "SELECT * FROM Comentarios WHERE ID_Publicacion = @ID_Publicacion",
    CrearComentario: "INSERT INTO Comentarios (Texto, ID_Usuario, ID_Publicacion) VALUES (@Texto, @ID_Usuario, @ID_Publicacion)",
    EditarComentario: " UPDATE Comentarios SET DescripcionDelComentario = @DescripcionDelComentario, FechaDeModificacion = GETDATE(), ModificadoPor = @ID_Usuario WHERE ID_Comentarios = @ID_Comentarios AND ID_Usuario = @ID_Usuario AND ID_Publicacion = @ID_Publicacion"
};
