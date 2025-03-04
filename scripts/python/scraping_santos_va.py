import requests
from bs4 import BeautifulSoup
import json
import sys

# Función para obtener los santos del día según la fecha
def obtener_santos_del_dia(fecha):
    # Extraemos el año, mes y día de la fecha en formato YYYY-MM-DD
    try:
        anio, mes, dia = fecha.split("-")
    except ValueError:
        return {"error": "Formato de fecha incorrecto, asegúrese de usar YYYY-MM-DD."}

    url = f"https://www.vaticannews.va/es/santos/{mes}/{dia}.html"
    response = requests.get(url)
    response.encoding = 'utf-8'

    if response.status_code != 200:
        return {"error": "No se pudo acceder a la página para obtener los santos."}

    soup = BeautifulSoup(response.text, 'html.parser', from_encoding='utf-8')


    # Obtener la fecha desde la página
    fecha_element = soup.find("span", id="dataFilter-text")
    if not fecha_element:
        return {"error": "No se encontró la fecha en la página."}

    fecha = fecha_element.get_text(strip=True)

    # Obtener los santos del día
    santos = []

    # Iterar sobre cada sección de santo
    secciones = soup.find_all("section", class_="section--isStatic")
    if not secciones:
        return {
            "fecha": fecha,
            "santos": [],
            "mensaje": "No hay santos del día para esta fecha."
        }

    for seccion in secciones:
        # Extraer el nombre del santo
        nombre_santo = seccion.find("h2").get_text(strip=True)
        
        # Extraer la descripción del santo
        descripcion_santo = seccion.find("p").get_text(strip=True)

        # Obtener la imagen del santo si existe
        imagen = seccion.find("img")
        imagen_url = f"https://www.vaticannews.va{imagen['src']}" if imagen else None
        
        # Crear el objeto del santo con la información que necesitamos
        santo = {
            "nombre": nombre_santo,
            "descripcion": descripcion_santo,
            "imagen": imagen_url
        }
        
        santos.append(santo)

    # Crear el JSON con los santos del día
    santos_json = {
        "fecha": fecha,
        "santos": santos if santos else [],

    }

    return santos_json  # Devolvemos el diccionario, no la cadena JSON

if __name__ == "__main__":
    # Usamos los argumentos de la línea de comandos para obtener la fecha
    fecha = sys.argv[1] if len(sys.argv) > 1 else None
    if fecha:
        resultado = obtener_santos_del_dia(fecha)

        # Imprimir el JSON en formato bonito
        print(json.dumps(resultado, ensure_ascii=False, indent=2))
    else:
        print("Por favor, proporciona la fecha en formato YYYY-MM-DD.")
