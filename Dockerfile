# Usar una imagen base oficial de Python
FROM python:3.8-slim

# Instalar dependencias del sistema necesarias, incluyendo compiladores y bibliotecas BLAS/LAPACK
RUN apt-get update && apt-get install -y \
    build-essential \
    libblas-dev \
    liblapack-dev \
    gfortran \
    nodejs \
    npm \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar el archivo de dependencias de Python al directorio de trabajo
COPY ./requirements.txt /app/requirements.txt

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Antes de correr npm install y npm run build
ENV NODE_OPTIONS=--openssl-legacy-provider

# Instalar dependencias de Node.js y construir la aplicación
RUN npm install && npm run build

# Definir el comando para ejecutar la aplicación
CMD [ "npm", "run", "start" ]
