# 📡 Proyecto NOC

El nombre **NOC** proviene de **Network Operations Center** (Centro de Operaciones de Red), que es una instalación dedicada a monitorear y gestionar el funcionamiento de redes y servicios para asegurar su correcta operación.

Este proyecto es una implementación de monitoreo de servicios utilizando **Arquitectura Limpia** en **TypeScript**. Permite registrar eventos del sistema, comprobar el estado de servicios externos y enviar correos con logs adjuntos en función del nivel de severidad, emulando algunas funciones clave de un NOC para mantener la salud de los servicios bajo control.


## 🚀 Características

- Arquitectura basada en **principios de Clean Architecture**.
- Verificación periódica de disponibilidad de servicios externos (health check).
- Registro de logs en el sistema de archivos según nivel de severidad (`low`, `medium`, `high`).
- Envío automático de logs por correo electrónico (adjuntos incluidos).
- Configuración flexible a través de variables de entorno.
- Sistema de tareas programadas usando cron.

---

## ⚙️ Configuración y ejecución

1. Clona el proyecto y entra en la carpeta
```
git clone https://github.com/JavierPerezPacheco/curso-node-05-NOC.git
cd curso-node-05-NOC
```
2. Copia el archivo .env.template como .env
```
cp .env.template .env
```
3. Configura tus variables de entorno en .env
```
PORT=3000
MAILER_SERVICE=gmail
MAILER_EMAIL=tu-correo@gmail.com
MAILER_SECRET_KEY=clave-secreta-app

PROD=false
```

Si utilizas Gmail, asegúrate de generar una contraseña de aplicación y habilitar el acceso a aplicaciones de terceros si es necesario.

4. Instala las dependencias
```
npm install
```
5. Ejecuta el proyecto en modo desarrollo
```
npm run dev
```

## 🧪 Pruebas

Puedes activar tareas comentadas en presentation/server.ts para:

- Enviar logs por correo (con o sin adjunto).
- Iniciar tareas cron para monitorear el estado de un servicio web.

## 📁 Logs generados

Los logs se almacenan en la carpeta `/logs/` y se dividen según el nivel de severidad:

- `logs-all.log`: contiene todos los eventos registrados.
- `logs-medium.log`: solo eventos de severidad media.
- `logs-high.log`: eventos críticos.

Estos archivos pueden ser usados para auditorías o diagnósticos posteriores.


## 📩​ Envío de logs por email

Los correos enviados contienen los archivos de log como adjuntos y un resumen básico. El contenido HTML del correo puede personalizarse editando el archivo email.service.ts.

## ⏰ Cron Jobs

Puedes programar tareas periódicas usando el servicio CronService. Por defecto, se incluye una tarea comentada que revisa https://google.com cada 5 segundos.

## 🧠 Conceptos aplicados

- Principio de inversión de dependencias
- Responsabilidad única
- Interfaces y contratos fuertes
- Inyección de dependencias
- Separación de capas (dominio, infraestructura, presentación)



