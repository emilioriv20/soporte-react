# Reflexión Final - Práctica React y Spring Boot

### 1. ¿Qué diferencia existe entre componente, prop y estado?
- **Componente:** Bloque de código reutilizable que define la estructura y comportamiento de una parte de la interfaz (ej. `SolicitudCard`).
- **Prop:** Datos de solo lectura que se transmiten de un componente padre a un hijo para personalizar su contenido (ej. `prioridad="Media"`).
- **Estado (`useState`):** Datos dinámicos e internos gestionados por el propio componente cuyo cambio provoca un re-renderizado automático en la pantalla.

### 2. ¿Por qué useEffect es adecuado para iniciar una consulta externa?
Porque ejecuta efectos secundarios (como peticiones HTTP asíncronas con Axios) inmediatamente después de que el componente se monta en el DOM, evitando bloquear el renderizado inicial y la fluidez de la interfaz.

### 3. ¿Qué responsabilidades corresponden a React y cuáles a Spring Boot?
- **React (Frontend):** Interfaz de usuario, gestión del estado de la vista, captura de eventos e interacción dinámica con el usuario.
- **Spring Boot (Backend):** Lógica de negocio, persistencia de datos, validaciones de peticiones y exposición de endpoints REST (`/api/solicitudes`).

### 4. ¿Cómo distinguirías un error de CORS, un 404 y una caída del servidor?
- **Error de CORS:** El navegador bloquea la petición por políticas de seguridad de origen cruzado al intentar conectar el origen del frontend (`5173`) con el puerto del backend (`8081`) sin el permiso explícito de `@CrossOrigin`.
- **Error 404:** El servidor backend está activo y responde, pero la URL o ruta solicitada no existe en ningún controlador.
- **Caída del servidor (`ERR_CONNECTION_REFUSED`):** La petición es rechazada porque la aplicación de Spring Boot está detenida o no está escuchando en el puerto configurado.

### 5. ¿Qué mejorarías antes de publicar el sistema para usuarios reales?
Conexión con una base de datos relacional (PostgreSQL/MySQL) mediante JPA/Hibernate, implementación de autenticación segura con JWT, gestión global de errores en el cliente y un diseño de estilos profesional con Tailwind CSS o Bootstrap.