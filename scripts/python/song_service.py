import requests
import os
from dotenv import load_dotenv
load_dotenv()

API_URI = os.getenv("API_URI")


def search(song_title):
    url =  API_URI + '/api/songs/search/search?q={0}'.format(song_title)

    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception('Error on search {0}'.format(response))

def create(title, artist, lyric):
    body = {
        'title': title,
        'artist': artist,
        'lyric': {
            'text':lyric
        }
    }
    headers = {
        "content_type":"application/json"
    }
    url = API_URI + '/api/songs'

    response = requests.post(url, json=body, headers=headers)

    if response.status_code in [200, 201]:
        song = response.json()
        print('[song_service] Song created', song['_id'])
        return song
    else:
        raise Exception('Error on creation {}'.format(response))


def create_chord(song_id, chords_html):
    body = {
        'song': song_id,
        'text': chords_html
    }
    headers = {
        "content_type":"application/json"
    }
    url = API_URI + '/api/lyricschord'

    response = requests.post(url, json=body, headers=headers)

    if response.status_code in [200, 201]:
        print('[song_service] Chord created chord_id:', response.json()['id_'])
    else:
        raise Exception('Error on chord creation {}'.format(response))
