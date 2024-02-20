import requests
from bs4 import BeautifulSoup
import json

def parse_lectura_from(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extraer las distintas lecturas basadas en la estructura del HTML
    secciones = soup.find_all('section')
    lectura_data = {}

    # Asumiendo que la primera sección es la primera lectura, la segunda el salmo, etc.
    lectura_data['Primera lectura'] = secciones[0].find('div', class_='texto_palabra').get_text(separator='\n', strip=True) if secciones else "No disponible"
    lectura_data['Salmo'] = secciones[1].find('div', class_='texto_palabra').get_text(separator='\n', strip=True) if len(secciones) > 1 else "No disponible"
    lectura_data['Segunda lectura'] = secciones[2].find('div', class_='texto_palabra').get_text(separator='\n', strip=True) if len(secciones) > 2 else "No disponible"
    lectura_data['Evangelio'] = secciones[3].find('div', class_='texto_palabra').get_text(separator='\n', strip=True) if len(secciones) > 3 else "No disponible"

    return lectura_data

if __name__ == "__main__":
    url = 'https://www.ciudadredonda.org/calendario-lecturas/evangelio-del-dia/hoy'
    lectura_data = parse_lectura_from(url)
    # Al final de tu script de Python
    print(json.dumps(lectura_data))



