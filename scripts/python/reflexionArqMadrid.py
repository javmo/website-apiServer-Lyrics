import requests
from bs4 import BeautifulSoup
import sys
import json

def get_reflection(date):
    base_url = "https://oracionyliturgia.archimadrid.org/"
    date_url = f"{base_url}{date}/"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    }
    
    try:
        response = requests.get(date_url, headers=headers)
        if response.status_code != 200:
            return json.dumps({"error": "Error al acceder a la página"}, ensure_ascii=False)

        soup = BeautifulSoup(response.text, 'html.parser')

        # Buscar el artículo con la categoría "Comentario a las Lecturas"
        article = soup.find("article", class_="category-comentario-a-las-lecturas")
        if not article:
            return json.dumps({"error": "No se encontró la reflexión del día"}, ensure_ascii=False)

        # Extraer el enlace a la reflexión
        reflection_link = article.find("h2", class_="entry-title").find("a")["href"]

        # Acceder a la página de la reflexión
        reflection_response = requests.get(reflection_link, headers=headers)
        if reflection_response.status_code != 200:
            return json.dumps({"error": "Error al acceder a la reflexión"}, ensure_ascii=False)

        reflection_soup = BeautifulSoup(reflection_response.text, 'html.parser')

        # Extraer el contenido de la reflexión
        content_div = reflection_soup.find("div", class_="entry-content")
        if not content_div:
            return json.dumps({"error": "No se pudo extraer el contenido de la reflexión"}, ensure_ascii=False)

        reflection_text = content_div.get_text(separator="\n").strip()

        return json.dumps(
            {"fecha": date, "nombre": "Archidiócesis de Madrid", "comentario": reflection_text},
            ensure_ascii=False  # 📌 Mantiene los acentos y caracteres especiales correctamente
        )

    except Exception as e:
        sys.stderr.write(f"Error en el script de Python: {str(e)}\n")
        return json.dumps({"error": "Error interno en el script de Python"}, ensure_ascii=False)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Se requiere una fecha en formato YYYY/MM/DD"}, ensure_ascii=False))
        sys.exit(1)
    
    date = sys.argv[1]
    reflection_data = get_reflection(date)
    
    # 📌 Asegurarse de que la salida es en UTF-8 correctamente
    sys.stdout.reconfigure(encoding='utf-8') 
    print(reflection_data)
