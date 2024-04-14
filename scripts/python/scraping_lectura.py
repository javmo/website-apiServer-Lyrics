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
    
    # Ordenar lecturas por su tipo para asegurar que correspondan con la estructura antigua
    readings = {reading['type']: reading for reading in data['data']['readings']}

    # Extraer y limpiar la primera lectura
    first_reading = readings.get('reading')
    lectura_data['Primera lectura'] = remove_verse_annotations(first_reading['text'].replace("\r\n", "\n")) if first_reading else "No disponible"
    
    # Extraer y limpiar el salmo
    psalm = readings.get('psalm')
    lectura_data['Salmo'] = remove_verse_annotations(psalm['text'].replace("\r\n", "\n")) if psalm else "No disponible"
    
    # Extraer y limpiar la segunda lectura si está disponible
    second_reading = readings.get('second_reading')  # Asegúrate de conocer la clave correcta si es diferente
    lectura_data['Segunda lectura'] = remove_verse_annotations(second_reading['text'].replace("\r\n", "\n")) if second_reading else "No disponible"
    
    # Extraer y limpiar el evangelio
    gospel = readings.get('gospel')
    lectura_data['Evangelio'] = remove_verse_annotations(gospel['text'].replace("\r\n", "\n")) if gospel else "No disponible"

    return lectura_data

if __name__ == "__main__":
    today_date = datetime.now().strftime('%Y-%m-%d')
    lectura_data = parse_lectura_from(today_date)
    print(json.dumps(lectura_data, ensure_ascii=False))
