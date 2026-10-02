# Portafolio Personal — Desarrollo de Sitios Web

Proyecto de portafolio personal para servicios de **desarrollo de sitios web**.
Arquitectura separada en **backend** (Laravel + Sail) y **frontend** (React + Vite),
con **MariaDB** como base de datos y **Mailpit** para pruebas de correo.

## Estructura

```
mi-proyecto/
├── backend/      # API Laravel 11 + Sail (MariaDB + Mailpit)
│   ├── app/
│   │   ├── Http/Controllers/Api/   # Proyecto, Portafolio, Contacto
│   │   ├── Mail/                   # ContactoRecibido, CotizacionRecibida
│   │   └── Models/                 # Proyecto, Cliente, Tecnologia, Cotizacion, MensajeContacto
│   ├── database/
│   │   ├── migrations/             # Tablas del portafolio
│   │   └── seeders/                # Datos de ejemplo
│   ├── routes/api.php              # Endpoints de la API
│   ├── compose.yaml                # Sail: Laravel + MariaDB + Mailpit + Frontend
│   └── .env                        # Configuración (MariaDB, Mailpit, APP_PORT=8000)
└── frontend/     # SPA React + Vite (servida por nginx en el contenedor)
    ├── Dockerfile                 # Build Vite + nginx estático
    ├── nginx.conf                 # Sirve SPA + proxy /api -> backend
    └── src/
        ├── api/                   # Cliente axios + endpoints
        ├── components/            # Navbar, Hero
        ├── pages/                 # Proyectos, Detalle, Clientes+Tecnologías, Contacto, Cotización
        └── App.jsx                # Router
```

## Secciones del portafolio

1. **Proyectos** — Catálogo de proyectos con detalle por slug, tecnologías y cliente.
2. **Clientes y Tecnologías** — Clientes con testimonio + tecnologías agrupadas por categoría.
3. **Contacto y Cotizaciones** — Formulario de contacto y formulario de cotización
   (tipo de sitio, presupuesto, plazo, funcionalidades). Ambos envían correo vía Mailpit.

## Requisitos

- Docker y Docker Compose
- Node.js utlimo lts y npm

## Puesta en marcha

### 1) Backend (Laravel Sail)

```bash
cd backend

# (Opcional) si no tienes PHP/Composer locales, instala dependencias con Docker:
docker run --rm -v "$(pwd):/app" -w /app composer:2 install

# Copia el .env (ya viene preconfigurado para MariaDB, Mailpit y APP_PORT=8000)
cp .env.example .env

# Levanta TODOS los contenedores: API Laravel + MariaDB + Mailpit + Frontend (nginx)
./vendor/bin/sail up -d --build

# Genera la APP_KEY si .env la tiene vacía
./vendor/bin/sail artisan key:generate

# Migraciones + datos de ejemplo
./vendor/bin/sail artisan migrate --seed
```

Servicios levantados por Sail:
- **Frontend (React + nginx)**: <http://localhost>
- **Laravel API**: <http://localhost:8000>
- MariaDB: `localhost:13306` (db: `laravel`, user: `sail`, pass: `password`)
- **Mailpit SMTP**: `localhost:1025`
- **Mailpit panel (correos capturados)**: <http://localhost:8025>

> El puerto de MariaDB en el host es `13306` (configurable con `FORWARD_DB_PORT` en `.env`)
> para evitar conflictos con un MariaDB local del host.

### 2) Frontend (React + Vite)

El frontend se construye y sirve **dentro de un contenedor nginx** definido en
`frontend/Dockerfile` y orquestado por `compose.yaml` (servicio `frontend`).
El nginx hace de proxy: sirve los estáticos de la SPA y redirige `/api/*`
al servicio `laravel.test` dentro de la red de Sail (ver `frontend/nginx.conf`).

No necesitas ejecutar Vite a mano para producción. Si quieres desarrollo con
hot-reload, puedes levantar Vite aparte:

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173 (proxy /api -> http://localhost:8000)
```

## Endpoints de la API

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/proyectos` | Lista paginada (`?destacados=1&categoria=`) |
| GET | `/api/proyectos/{slug}` | Detalle de un proyecto |
| GET | `/api/clientes` | Listado de clientes (`?destacados=1`) |
| GET | `/api/tecnologias` | Listado de tecnologías (`?categoria=`) |
| POST | `/api/contacto` | Envía un mensaje (envía correo vía Mailpit) |
| POST | `/api/cotizaciones` | Envía una cotización (envía correo vía Mailpit) |

## Prueba del correo con Mailpit

1. Levanta el backend con Sail.
2. Abre <http://localhost:8025> (panel de Mailpit).
3. Envía un mensaje desde el formulario de **Contacto** o una **Cotización**
   en el frontend.
4. Verás el correo generado (markdown) en el panel de Mailpit.

## Notas

- El `.env` del backend trae `APP_PORT=8000` (API en `:8000`), `DB_CONNECTION=mariadb`,
  `MAIL_HOST=mailpit`, `MAIL_PORT=1025` y `FORWARD_DB_PORT=13306`.
- El frontend corre en el contenedor `frontend` (nginx, puerto `:80`) y hace proxy de
  `/api/*` al backend dentro de la red de Sail, por lo que desde el navegador todo se
  sirve desde el mismo origen `http://localhost` (sin problemas de CORS).
- CORS está configurado en `backend/config/cors.php` para permitir
  `http://localhost`, `:8000`, `:5173` y `:3000` (útil para desarrollo con Vite).
- Los seeders crean tecnologías, clientes, proyectos de ejemplo y una cotización
  y un mensaje de contacto de muestra.
- Para reconstruir el frontend tras cambios en el código React:
  `./vendor/bin/sail up -d --build frontend`