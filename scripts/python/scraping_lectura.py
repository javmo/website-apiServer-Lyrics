import requests
import json
import re
from datetime import datetime

def remove_verse_annotations(text):
    # Usar regex para eliminar los patrones que corresponden a las notas de versículos
    return re.sub(r'\[\[.*?\]\]', '', text)

def parse_lectura_from(date):
    url = f'https://publication.evangelizo.ws/SP/days/{date}?from=gospelComponent'
    response = requests.get(url)
    data = response.json()

    lectura_data = {}
    
    # Lista para acumular lecturas de tipo 'reading'
    readings = []

    # Ordenar lecturas por su tipo
    for reading in data['data']['readings']:
        if reading['type'] == 'reading':
            readings.append(reading)
        elif reading['type'] == 'psalm':
            psalm = reading
        elif reading['type'] == 'gospel':
            gospel = reading

    # Extraer y limpiar la primera lectura
    if len(readings) > 0:
        lectura_data['Primera lectura'] = remove_verse_annotations(readings[0]['text'].replace("\r\n", "\n")) if readings[0] else "No disponible"
    
    # Extraer y limpiar la segunda lectura si está disponible
    if len(readings) > 1:
        lectura_data['Segunda lectura'] = remove_verse_annotations(readings[1]['text'].replace("\r\n", "\n")) if readings[1] else "No disponible"
    else:
        lectura_data['Segunda lectura'] = "No disponible"

    # Extraer y limpiar el salmo
    lectura_data['Salmo'] = remove_verse_annotations(psalm['text'].replace("\r\n", "\n")) if 'psalm' in locals() else "No disponible"
    
    # Extraer y limpiar el evangelio
    lectura_data['Evangelio'] = remove_verse_annotations(gospel['text'].replace("\r\n", "\n")) if 'gospel' in locals() else "No disponible"

    return lectura_data

if __name__ == "__main__":
    today_date = datetime.now().strftime('%Y-%m-%d')
    lectura_data = parse_lectura_from(today_date)
    print(json.dumps(lectura_data, ensure_ascii=False))
