import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

# Definición del DTO de la canción
from song_dto import Song

# Carga de variables de entorno
load_dotenv()
API_URI = os.getenv("API_URI")

def get_scraping_config(url):
    # Extracción del dominio de la URL
    domain = url.split("//")[-1].split("/")[0]
    config_url = f"{API_URI}/api/webConfigScrapper/configs/url/{domain}"
    response = requests.get(config_url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("No se pudo obtener la configuración para el dominio.")

def scrape_song(url):
    config = get_scraping_config(url)
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    return extract_song_info(soup, config)
    
def extract_song_info(soup, config):
    try:
        # Extract title and artist
        song_title = soup.select_one(config['title_selector']).text.strip()
        song_artist = soup.select_one(config['artist_selector']).text.strip()

        # Find the lyrics container
        lyrics_container = soup.select_one(config['lyrics_selector'])

        # For chords: Directly use the text from lyrics_container
        chord_text = lyrics_container.get_text(separator="\n", strip=True)

        # For clean lyrics: Remove or ignore spans with chords
        # This is pseudo-code. Implement based on actual HTML structure.
        for chord_span in lyrics_container.find_all("span", {"class": "chord"}):
            chord_span.decompose()  # Or another method to exclude chords
        clean_lyrics = lyrics_container.get_text(separator="\n", strip=True)

        return Song(song_title, song_artist, lyrics_container.prettify(), chord_text, clean_lyrics)
    except AttributeError as e:
        raise ValueError(f"Error extracting song info: {e}")



# Ejemplo de uso
if __name__ == "__main__":
    url = "https://www.pastoraldemusica.org.ar/cancionero/cancion.php?id=195"
    try:
        song = scrape_song(url)
        print(f"Título: {song.title}, Artista: {song.artist}")
        print(f"Acordes: {song.chord_html}")
        print(f"chord_text: {song.chord_text}")
        print(f"Letra: {song.lyric_text}")
    except Exception as e:
        print(f"Error al scrapear la canción: {e}")
