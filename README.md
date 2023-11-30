Proyecto Final Epica Tramo III
# Proyecto Final - Épica Tramo III

## Requisitos Previos
- Asegúrate de tener Node.js instalado en tu máquina.
- Necesitarás tener MongoDB instalado y ejecutar los servicios `mongod` y `mongocompass`.

## Configuración Inicial

1. Cambia el nombre del archivo `.example.env` por `.env`.

2. En la terminal, navega a la carpeta backend:
    ```bash
    cd backend
    ```

3. Instala las dependencias con el siguiente comando:
    ```bash
    npm install
    ```

4. Ejecuta la aplicación en la carpeta /backend con el siguiente comando:
    ```bash
    npm run dev
    ```

5. Abre MongoDB Compass y asegúrate de que el servicio `mongod` esté en ejecución.

## Realizar Peticiones con Thunder Client:

1. Agregar un Comentario a un Post Específico

POST localhost:6060/api/comments/:postId

Descripción: Agrega un comentario a un post específico.
Parámetros: :postId es el ID del post al que se quiere agregar el comentario.
Uso: Envia una solicitud POST a esta ruta con el cuerpo de la solicitud que contiene la información del comentario.

2. Crear un Nuevo Comentario Independiente

POST localhost:6060/api/comments

Descripción: Crea un nuevo comentario independiente.
Uso: Envia una solicitud POST a esta ruta con el cuerpo de la solicitud que contiene la información del comentario.

3. Crear un Nuevo Post

POST localhost:6060/api/post

Descripción: Crea un nuevo post.
Uso: Envia una solicitud POST a esta ruta con el cuerpo de la solicitud que contiene la información del nuevo post.

4. Iniciar Sesión de un Usuario Existente

POST localhost:6060/api/login

Descripción: Inicia sesión de un usuario existente.
Uso: Envia una solicitud POST a esta ruta con las credenciales del usuario (por ejemplo, nombre de usuario y contraseña) en el cuerpo de la solicitud.

5. Obtener el Perfil del Usuario Autenticado

GET localhost:6060/api/profile

Descripción: Obtiene el perfil del usuario autenticado.
Uso: Realiza una solicitud GET a esta ruta para obtener información sobre el perfil del usuario autenticado.

6. Registrar un Nuevo Usuario

POST localhost:6060/api/register

Descripción: Registra un nuevo usuario.
Uso: Envia una solicitud POST a esta ruta con la información necesaria para registrar un nuevo usuario.

7. Cerrar Sesión del Usuario Autenticado

POST localhost:6060/api/logout

Descripción: Cierra sesión del usuario autenticado.
Uso: Envia una solicitud POST a esta ruta para cerrar sesión del usuario autenticado.