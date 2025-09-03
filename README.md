# DockerAPPejemplo

DockerAPPejemplo es una aplicación web de ejemplo que combina **frontend, backend y base de datos**, gestionados mediante **Docker y Docker Compose**. La aplicación viene con varios usuarios predefinidos y sirve como demostración de cómo levantar un stack completo con contenedores.

> ⚠️ Nota: Esta aplicación es para fines educativos y de ejemplo. Para producción habría que añadir medidas de seguridad adicionales, como un proxy inverso, limitar qué HTMLs pueden hacer peticiones al backend, etc.

---

## Estructura del proyecto

```text
.
├── backend              # Código del backend (Node.js + Express)
│   ├── Dockerfile       # Dockerfile para construir la imagen del backend
│   ├── package.json     # Dependencias de Node.js
│   └── src
│       ├── db.js        # Configuración de conexión a la base de datos (MySQL)
│       └── index.js     # API principal (endpoints REST)
├── db                   # Scripts de inicialización de la base de datos
│   └── init.sql
├── frontend             # Código del frontend (HTML, CSS, JS)
│   ├── index.html       # Página principal
│   ├── about.html       # Página de información
│   ├── css
│   │   └── styles.css   # Estilos
│   └── js
│       └── main.js      # Lógica frontend
├── docker-compose.yml   # Define y conecta todos los servicios (backend, frontend y DB)
├── contruirAPP.sh       # Script para construir los contenedores por primera vez
├── levantarCOntainers.sh # Script para levantar los contenedores
├── borrarconatiners.sh  # Script para borrar contenedores activos
├── borrarTodaApp.sh     # Script para borrar todos los contenedores y redes de la app
├── LICENSE              # Licencia del proyecto
└── README.md            # Este archivo
```

---

## Explicación de los archivos clave

### `docker-compose.yml`
Define todos los contenedores:
- **backend**: Construye desde `./backend`, depende de la base de datos y escucha en puerto 3000.
- **frontend**: Usa Nginx para servir HTML/CSS/JS y escucha en puerto 8080.
- **db**: MySQL 8, inicializa con `init.sql` y persiste datos en `db-data`.
- Todos conectados a `app-network`.

### `backend/Dockerfile`
Prepara la imagen del backend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
CMD ["npm", "start"]
```

### `backend/package.json`
- Dependencias: `express`, `mysql2`, `cors`, `dotenv`
- Script `start`: `node src/index.js`

### `backend/src/index.js`
Servidor Express con endpoints:
- `GET /api/users`: devuelve todos los usuarios
- `POST /api/users`: añade un nuevo usuario
Usa `cors()` y `express.json()` para manejar peticiones cross-origin y JSON.

### `backend/src/db.js`
Crea un pool de conexiones MySQL usando variables de entorno.

### `db/init.sql`
Inicializa la base de datos con tabla `users` y dos usuarios de ejemplo.

---

## Instalación de Docker y Docker Compose
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

docker --version
docker compose version
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a entrar o ejecuta `newgrp docker`
```

---

## Cómo levantar la aplicación
| Script | Función |
|--------|--------|
| `contruirAPP.sh` | Construye imágenes y levanta contenedores (primera vez) |
| `levantarCOntainers.sh` | Levanta contenedores ya construidos |
| `borrarconatiners.sh` | Para contenedores activos |
| `borrarTodaApp.sh` | Borra contenedores y redes de la app |

> También puedes usar Docker Compose directamente:
> ```bash
> docker compose up --build
> docker compose down
> ```

---

## Probar la aplicación
1. Levanta los contenedores.
2. Abre el navegador en `http://localhost:8080`.
3. El frontend consulta la API del backend (`http://localhost:3000/api/users`).
4. Prueba el POST con fetch o Postman para agregar usuarios.

---

## Contacto
Proyecto desarrollado por **Jesús Losada Arauzo**, ETSIIT – Universidad de Granada.

