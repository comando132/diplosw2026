# Imagen con node + nginx para permitir ejecutar npm run build dentro del contenedor
FROM node:lts-alpine

# Instalar nginx
RUN apk add --no-cache nginx

# Variables de entorno para el build
ENV VITE_API_URL=/api \
    APP_DIR=/app \
    NGINX_HTML=/usr/share/nginx/html

WORKDIR ${APP_DIR}

# Copiar manifiestos e instalar dependencias (cacheable)
COPY package*.json ./
RUN npm install

# Copiar el resto del código (también se montará por volumen en desarrollo)
COPY . .

# Configuración de nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Entrypoint que permite: build on-start, modo dev, o comando arbitrario
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["serve"]