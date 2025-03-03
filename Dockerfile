# Usa una imagen ligera de Python como base
FROM python:3.9-slim

# Instala dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    gnupg \
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

# Agrega repositorio de Google para Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable

# Establece variables de entorno para Chrome y ChromeDriver
ENV GOOGLE_CHROME_BIN="/usr/bin/google-chrome"
ENV CHROMEDRIVER_VERSION="latest"

# Instala ChromeDriver compatible con la versión instalada de Chrome
RUN wget -q -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE")/chromedriver_linux64.zip \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip

# Establecer el PATH para que Chrome y ChromeDriver sean accesibles
ENV PATH="/usr/local/bin:${PATH}"

WORKDIR /app

# Copia y instala dependencias de Python
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Ejecutar la API
CMD ["python", "scripts/python/scraping_lectura_va.py"]
