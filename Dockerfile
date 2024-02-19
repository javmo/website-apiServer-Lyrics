# Usar Alpine como imagen base
FROM alpine

# Instalar dependencias del sistema necesarias para Python y Node.js
RUN apk update && \
    apk upgrade && \
    apk add --no-cache python3 py3-pip python3-dev nodejs npm

# Crear un entorno virtual para las dependencias de Python
RUN python3 -m venv /app/venv

# Establecer el entorno virtual como el entorno predeterminado
ENV PATH="/app/venv/bin:$PATH"

# Copiar el archivo de dependencias de Python al directorio de trabajo
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

# Instalar las dependencias de Python dentro del entorno virtual
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de la aplicación al contenedor
COPY . .
# Antes de correr npm install y npm run build
ENV NODE_OPTIONS=--openssl-legacy-provider

# Instalar dependencias de Node.js y construir la aplicación
RUN npm install && npm run build

# Definir el comando para ejecutar la aplicación
CMD [ "npm", "run", "start" ]
