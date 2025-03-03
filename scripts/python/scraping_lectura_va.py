import os
import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
from bs4 import BeautifulSoup
import json

# Asegurarnos de que Python maneje la codificación en UTF-8
sys.stdout.reconfigure(encoding='utf-8')  # Esto asegura que la salida sea en UTF-8

def get_lecturas_vaticano(fecha=None):
    """
    Extrae las lecturas del día desde Vatican News usando Selenium y BeautifulSoup.
    """
    if fecha is None:
        fecha = datetime.now().strftime("%Y-%m-%d")

    url = f"https://www.vaticannews.va/es/evangelio-de-hoy/{fecha.replace('-', '/')}.html"

    # Configuración de Chrome para eliminar logs
    chrome_options = Options()
    chrome_options.add_argument("--headless")  
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-logging")  
    chrome_options.add_argument("--disable-dev-shm-usage")  
    chrome_options.add_argument("--remote-debugging-port=0")  
    chrome_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-automation"])
    chrome_options.add_argument("--log-level=3")  

    service = Service(ChromeDriverManager().install(), log_output=os.devnull)
    driver = webdriver.Chrome(service=service, options=chrome_options)

    driver.get(url)

    # Estructura JSON
    lecturas = {
        "Primera lectura": "No disponible",
        "Segunda lectura": "No disponible",
        "Evangelio": "No disponible",
        "Ángelus": "No disponible",
        "Fecha": fecha
    }

    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "content")))

        page_source = driver.page_source

        # Convertir a UTF-8 para evitar caracteres malformados
        soup = BeautifulSoup(page_source, "html.parser")
        soup_text = soup.prettify()  # Convertir a string
        #print(soup_text)  # Imprime el contenido para depurar y verificar si los caracteres son correctos

        # No es necesario hacer encode y decode, porque BeautifulSoup ya maneja la codificación correctamente
        soup = BeautifulSoup(soup_text, "html.parser")  # Volver a parsear con UTF-8

        # Extraer lecturas
        secciones = soup.find_all("section", class_="section--isStatic")

        for seccion in secciones:
            titulo = seccion.find("h2")
            contenido = seccion.find("div", class_="section__content")

            if titulo and contenido:
                titulo_text = titulo.get_text(strip=True)
                contenido_text = contenido.get_text("\n", strip=True)

                if "Lectura del Día" in titulo_text:
                    partes = contenido_text.split("Segunda lectura", 1)
                    lecturas["Primera lectura"] = partes[0].strip()
                    if len(partes) > 1:
                        lecturas["Segunda lectura"] = partes[1].strip()
                elif "Evangelio del Día" in titulo_text:
                    lecturas["Evangelio"] = contenido_text
                elif "Palabras del Santo Padre" in titulo_text:
                    lecturas["Ángelus"] = contenido_text

    except Exception as e:
        print(f"Error al obtener lecturas: {e}")

    finally:
        driver.quit()

    return lecturas

if __name__ == "__main__":
    fecha = sys.argv[1] if len(sys.argv) > 1 else None
    resultado = get_lecturas_vaticano(fecha)

    # Imprimir JSON en UTF-8 correctamente
    print(json.dumps(resultado, ensure_ascii=False, indent=2))
