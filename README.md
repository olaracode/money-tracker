Proyecto desarrollado para practicar manejo de estados, autorizacion de usuario, login y registro con Mongo Atlas.

El proyecto se desarrolla en dos carpetas. Backend que contiene todos los archivos de los modelos, la conexion a mongo usando express y cors, las rutas y un esquema de como se idearon los modelos al momento de comenzar. Se puede observar el nivel de cambios que hubo en el transcurso.

El SRC contiene todo lo relevante a React. para el front end se utilizó principalmente  Material Ui para el desarrollo de los componentes, tambien se utilizó chartsjs-2 para realizar el graficado de los valores. Todo esta distribuido en sus carpetas para tener facil acceso a los componentes relevantes. Dentro de la mayoria de carpetas se encontrara un archivo homologo donde se unen casi todos los componentes de esa carpeta. App.js es el archivo principal de todo el proyecto.

Para poder correr la app se tiene que crear un cluster en mongo Atlas, copiar la conexion en un archivo .env junto con su token secreto de JWT.
Descargar nodemon. Correr nodemon en la carpeta backend
Y correr npm start en la carpeta general.

// ENGLISH

Proyect developed to practice the state management, user authorization, login and registry using the mern stack.

The proyect is divided in two main folders. Backend which container all the models, mongo conection using express and cors, routes and a schema of how i thought the models would look like when i started the proyect.

The SRC folder contain all React related files. For the front end Material UI was extensively used along side with chartjs to render the graphs. Everything is divided in folders for easy access. Inside each folder there is a file with the same name, in there all, or most componentes come together. App.js is the main file for the whole proyect.

To run the app you need to create a mongo atlas cluster, copy the conection string and put it inside a env alonside a JWT randomly generated secret token.
Npm nodemon, and run nodemon index in the backend folder.
Run npm start in the general folder.
