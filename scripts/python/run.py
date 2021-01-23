import sys
import json
import requests
import song_service
from song_dto import Song
import lacuerdanetscrapper



def parse_and_create_song(url):
    print('Start', url)
    song = lacuerdanetscrapper.parse_song_from(url)
    results = song_service.search(song.title)

    if (len(results) < 1):
        print('song not found in api, creating one...')
        found = song_service.create(song.title, song.artist, song.lyric_text)
    else:
        found = results[0]

    song_service.create_chord(found['_id'], song.chord_html)
    print('Success end')

def foreach(fn, iterable):
    for i in iterable:
        try:
            fn(i)
        except Exception as e:
            print(e)


# RUN
"""
url_list = [
    'https://acordes.lacuerda.net/abel_pintos/arder_en_libertad-2.shtml',
    'https://acordes.lacuerda.net/abel_pintos/arder_en_libertad-2.shtml',
    'https://acordes.lacuerda.net/abel_pintos/aventura-2.shtml',
    'https://acordes.lacuerda.net/airbag/amor_de_verano-3.shtml',
    'https://acordes.lacuerda.net/airbag/cae_el_sol.shtml',
    'https://acordes.lacuerda.net/guasones/100_anios.shtml'
]
"""

url_list = [sys.argv[1]]


foreach(parse_and_create_song, url_list)
