# 📡 Proyecto NOC

Este proyecto es una implementación de monitoreo de servicios utilizando **Arquitectura Limpia** en **TypeScript**. Permite registrar eventos del sistema, comprobar el estado de servicios externos y enviar correos con logs adjuntos en función del nivel de severidad, emulando algunas funciones clave de un NOC para mantener la salud de los servicios bajo control.

---

## 🚀 Características

- Arquitectura basada en **principios de Clean Architecture**.
- Verificación periódica de disponibilidad de servicios externos (health check).
- Registro de logs en el sistema de archivos, **MongoDB** o **PostgreSQL** según configuración.
- Envío automático de logs por correo electrónico (adjuntos incluidos).
- Configuración flexible a través de variables de entorno.
- Sistema de tareas programadas usando cron.
- Soporte para bases de datos con Docker (MongoDB y PostgreSQL).

---

## ⚙️ Configuración y ejecución

1. Clona el proyecto y entra en la carpeta:
   ```sh
   git clone https://github.com/JavierPerezPacheco/curso-node-05-NOC.git
   cd curso-node-05-NOC
   ```

2. Copia el archivo `.env.template` como `.env`:
   ```sh
   cp .env.template .env
   ```

3. Configura tus variables de entorno en `.env` según el datasource que quieras usar:
   ```env
   # Configuración general
   PORT=3000
   MAILER_SERVICE=gmail
   MAILER_EMAIL=tu-correo@gmail.com
   MAILER_SECRET_KEY=clave-secreta-app
   PROD=false

   # MongoDB
   MONGO_URL=mongodb://admin:123456@localhost:27017/
   MONGO_DB_NAME=NOC
   MONGO_USER=admin
   MONGO_PASS=123456

   # PostgreSQL
   POSTGRES_URL=postgresql://postgres:123456@localhost:5432/NOC
   POSTGRES_DB_NAME=NOC
   POSTGRES_USER=postgres
   POSTGRES_PASS=123456

   ```

Para que el envío de correos funcione con Gmail, necesitas generar una **clave de aplicación** (App Password) en tu cuenta de Google, ya que Google no permite el uso de la contraseña habitual para aplicaciones externas por motivos de seguridad.

- Activa primero la **verificación en dos pasos** en tu cuenta de Google:  
   [https://myaccount.google.com/security](https://myaccount.google.com/security)

- Luego, accede a la sección **Contraseñas de aplicaciones** y genera una clave específica para este proyecto:  
   [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

Copia la clave generada y colócala en la variable `MAILER_SECRET_KEY` de tu archivo `.env`.


4. Si quieres usar MongoDB o PostgreSQL, puedes levantar los servicios con Docker:
   ```sh
   docker-compose up -d
   ```
   Esto descargará y ejecutará los contenedores necesarios para MongoDB y/o PostgreSQL.

5. Instala las dependencias:
   ```sh
   npm install
   ```

6. Ejecuta el proyecto en modo desarrollo:
   ```sh
   npm run dev
   ```

---

## 🗄️ Selección de origen de logs

El destino donde se almacenan los logs (filesystem, MongoDB o PostgreSQL) se define en el código, al instanciar y pasar los repositorios correspondientes a los casos de uso (por ejemplo, en `CheckServiceMultiple` dentro de `presentation/server.ts`).

Si quieres cambiar el origen de logs, edita el array de repositorios que se pasa al crear la instancia:

```typescript
new CheckServiceMultiple(
  [fsLogRepository, mongoLogRepository, postgresLogRepository],
  ...
)
```
---

## 🐳 Uso con Docker

El proyecto incluye un archivo `docker-compose.yml` para facilitar el despliegue de MongoDB y PostgreSQL.  
Solo necesitas tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

```sh
docker-compose up -d
```

Esto levantará los servicios de base de datos en los puertos configurados.

---

## 🧪 Pruebas

Al iniciar el proyecto, las tareas de ejemplo ya están activas por defecto:

- Se envían logs por correo electrónico (con o sin adjunto) automáticamente.
- Se ejecutan tareas cron para monitorear el estado de un servicio web.

Puedes modificar o desactivar estas tareas editando el archivo `presentation/server.ts`.

---

## 📁 Logs generados

- Si usas **filesystem**, los logs se almacenan en la carpeta `/logs/` y se dividen según el nivel de severidad:
  - `logs-all.log`: contiene todos los eventos registrados.
  - `logs-medium.log`: solo eventos de severidad media.
  - `logs-high.log`: eventos críticos.
- Si usas **MongoDB** o **PostgreSQL**, los logs se almacenan en la base de datos correspondiente.

---

## 📩​ Envío de logs por email

Los correos enviados contienen los archivos de log como adjuntos y un resumen básico. El contenido HTML del correo puede personalizarse editando el archivo `email.service.ts`.

---

## ⏰ Cron Jobs

Puedes programar tareas periódicas usando el servicio `CronService`. Por defecto, se incluye una tarea comentada que revisa https://google.com cada 5 segundos.

---

## 🧠 Conceptos aplicados

- Principio de inversión de dependencias
- Responsabilidad única
- Interfaces y contratos fuertes
- Inyección de dependencias
- Separación de capas (dominio, infraestructura, presentación)
- Uso de contenedores Docker para bases de datos (MongoDB y PostgreSQL)
- Integración de ORM (Prisma para PostgreSQL, Mongoose para MongoDB)
