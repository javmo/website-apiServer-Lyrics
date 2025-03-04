# Usar una imagen base oficial de Python
FROM python:3.9-slim

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    gnupg \
    nodejs \
    npm \
    libglib2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libfontconfig1 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxtst6 \
    xdg-utils \
    libpango-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Google Chrome estable
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

# Establecer variable de entorno para Chrome
ENV GOOGLE_CHROME_BIN="/usr/bin/google-chrome"

# Agregar ChromeDriver al PATH (se descargará automáticamente en tiempo de ejecución)
RUN pip install --no-cache-dir chromedriver-autoinstaller

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias de Python
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Instalar dependencias de Node.js y construir la aplicación
RUN npm install && npm run build

# Definir el comando para ejecutar la API Node.js
CMD ["npm", "run", "start"]
