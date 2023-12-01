# CIRDC
Para utilizar esta aplicación hecha en express debe instalar la base de datos con el archivo sql presente en la raíz del proyecto, para ello puede hacer uso de diferente herramientas, se recomienda usar PHPMyAdmin.

Luego, clone el repositorio en una carpeta local e instale las dependencias con el comando "npm i". Debe crear un archivo .env en la raíz del proyecto configurando las siguientes variables:

- DB_HOST
- DB_DATABASE
- DB_USER
- DB_PASSWORD
- SECRET_KEY

Ya puede ejecutar el servidor express utilizando el comando "npm start" y accede al mismo desde el navegador ingresando "localhost:3000/usuarios/login" en la URL.
