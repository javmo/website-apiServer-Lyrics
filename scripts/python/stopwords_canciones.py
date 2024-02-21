import os
import requests
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Obtener la URL base de la API desde las variables de entorno
API_URI = os.getenv("API_URI")

# Construir las URLs completas
url_scraping = f'{API_URI}/api/scraping/lectura'
url_canciones = f'{API_URI}/api/lyricNormalized'

# Umbral de similitud
UMBRAL_SIMILITUD = 0.1

# Descarga las stopwords si es necesario
nltk.download('stopwords')

# Función para limpiar el texto
def limpiar_texto(texto):
    texto = texto.lower()
    texto = ''.join([c for c in texto if c.isalnum() or c.isspace()])
    palabras = texto.split()
    palabras = [palabra for palabra in palabras if palabra not in stopwords.words('spanish')]
    return ' '.join(palabras)

# Función para calcular las similitudes y devolver IDs de canciones similares
def encontrar_canciones_similares(texto, letras, ids_canciones):
    texto_limpiado = limpiar_texto(texto)
    letras_limpias = [limpiar_texto(letra) for letra in letras]
    letras_limpias.append(texto_limpiado)  # Añadir el texto del usuario al final para la comparación

    vectorizador = TfidfVectorizer()
    tfidf = vectorizador.fit_transform(letras_limpias)
    similitudes = cosine_similarity(tfidf[-1], tfidf[:-1]).flatten()

    # Encontrar índices y valores de similitud de las canciones que superen el umbral
    indices_similares = [i for i, valor in enumerate(similitudes) if valor > UMBRAL_SIMILITUD]
    ids_similares = [(ids_canciones[i], similitudes[i]) for i in indices_similares]

    return ids_similares

# Solicitar el texto del usuario
respuesta_texto = requests.get(url_scraping)
datos_texto = respuesta_texto.json() if respuesta_texto.status_code == 200 else {}

# Solicitar las letras de canciones
respuesta_canciones = requests.get(url_canciones)
if respuesta_canciones.status_code == 200:
    datos_canciones = respuesta_canciones.json()
    letras = ['\n'.join(cancion['text']) for cancion in datos_canciones]
    ids_canciones = [cancion['_id'] for cancion in datos_canciones]

    resultados = {}

    # Procesar cada texto por separado
    for nombre_texto, texto in datos_texto.items():
        ids_similares = encontrar_canciones_similares(texto, letras, ids_canciones)
        resultados[nombre_texto] = [{"id_cancion": id_cancion, "similitud": round(similitud, 4)} for id_cancion, similitud in ids_similares]

    # Imprimir resultados como JSON
    print(json.dumps(resultados))
else:
    print("Error al recuperar las letras de canciones")
