// Importamos el framework Express, que nos permite crear un servidor web de forma sencilla
const express = require("express");

// Creamos una instancia de la aplicación Express (nuestro servidor)
const app = express();

// Importamos el módulo 'path' de Node.js para manejar rutas de archivos de forma segura
const path = require("path");

// Definimos el puerto donde escuchará el servidor (3000 en este caso)
const PORT = 3000;


// ------------------------------------------------------------------
// CONFIGURACIÓN DEL SERVIDOR
// ------------------------------------------------------------------

// Indicamos que queremos servir archivos estáticos desde la carpeta "public"
// Esto permite acceder directamente a archivos como index.html, CSS o imágenes
app.use(express.static(path.join(__dirname, "public")));


// Indicamos que vamos a usar el motor de plantillas EJS para renderizar vistas dinámicas
app.set("view engine", "ejs");


// ------------------------------------------------------------------
// RUTAS (endpoints) DEL SERVIDOR
// ------------------------------------------------------------------

// 1) Ruta que renderiza una plantilla EJS (vista dinámica)
// Cuando alguien entre en http://localhost:3000/saludo
// Express buscará el archivo "views/saludo.ejs" y le pasará la variable { nombre: "Ana" }
app.get("/saludo", (req, res) => {
    res.render("saludo", { nombre: "Ana"});
});


// 2) Ruta que usa parámetros en la URL (path params) para realizar una suma
// Ejemplo: http://localhost:3000/suma/5/3
app.get("/suma/:a/:b", (req, res) => {

    // req.params contiene los valores dinámicos de la URL como strings
    const a = Number(req.params.a);
    const b = Number(req.params.b);

    // Devolvemos el resultado en texto plano 
    res.send(`La suma de ${a} y ${b} es ${a + b}`);
});


// 3) Ruta que devuelve un array en formato JSON, generado con un bucle
// Ejemplo: http://localhost:3000/pares
app.get("/pares", (req, res) => {

   const pares = []; // Creamos un array vacío

   // Recorremos del 1 al 10 y añadimos los pares
   for (let i = 1; i <= 10; i++){
      if (i % 2 === 0) pares.push(i);
   }

   // Enviamos el array como JSON (el navegador lo mostrará formateado)
   res.json(pares);
});


// ------------------------------------------------------------------
// INICIO DEL SERVIDOR
// ------------------------------------------------------------------

// Ponemos el servidor a escuchar en el puerto indicado
app.listen(PORT, () =>{
    console.log(`Servidor en http://localhost:${PORT}`);
});
