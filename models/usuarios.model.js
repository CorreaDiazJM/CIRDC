const db = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UsuariosModel {
    async registrar(nombre, apellido, usuario, contrasena, rol) {
        return new Promise((resolve, reject) => {
            if (contrasena[0] === contrasena[1]) {
                const password = bcrypt.hashSync(contrasena[0], 10);
    
                db.query(
                    'INSERT INTO Usuarios (nombre_usu, apellido_usu, usuario_usu, password_usu, id_rol_usu) VALUES (?, ?, ?, ?, ?);',
                    [nombre, apellido, usuario, password, rol],
                    (err) => {
                        if (err && err.errno === 1062) reject('El usuario ya existe');
                        if (err) reject(err);
                        
                        resolve(jwt.sign({
                            usuario,
                            rol,
                            nombre,
                            apellido
                        }, process.env.SECRET_KEY));
                    });
            } else {
                reject('Las contraseñas son diferentes');
            }
        });
    }

    async login(usuario, contrasena) {
        return new Promise((resolve, reject) => {
            this.buscarUsuarioPorUsername(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    if (bcrypt.compareSync(contrasena, user.password_usu)) {
                        const token = jwt.sign({
                            usuario,
                            rol: user.id_rol_usu,
                            nombre: user.nombre_usu,
                            apellido: user.apellido_usu
                        }, process.env.SECRET_KEY);

                        resolve(token);
                    } else {
                        reject('Contraseña incorrecta');
                    }
                });
        });
    }

    async buscarUsuarioPorUsername(usuario) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Usuarios WHERE usuario_usu = ?;', [usuario], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject('El usuario no está registrado');
                resolve(results[0]);
            });
        });
    }

    async subirDeNivel(usuario) {
        return new Promise((resolve, reject) => {
            this.buscarUsuarioPorUsername(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    db.query(
                        'SELECT COUNT(id_com) AS cantidad FROM Comentarios INNER JOIN Usuarios ON id_usu = id_usu_com WHERE id_usu = ?;',
                        [user.id_usu],
                        (err, results) => {
                            if (err) reject(err);

                            const cant_com = results[0].cantidad;
                            let rol = 6;

                            if (cant_com > 10) rol--;
                            if (cant_com > 50) rol--;
                            if (cant_com > 100) rol--;
                            if (cant_com > 300) rol--;

                            db.query(
                                'UPDATE Usuarios SET id_rol_usu = ? WHERE id_usu = ?;',
                                [rol, user.id_usu],
                                (err) => {
                                    if (err) reject(err);

                                    const token = jwt.sign({
                                        usuario,
                                        rol: user.id_rol_usu,
                                        nombre: user.nombre_usu,
                                        apellido: user.apellido_usu
                                    }, process.env.SECRET_KEY);
            
                                    resolve(token);
                                });
                        });
                });
        });
    }
}


module.exports = new UsuariosModel();
