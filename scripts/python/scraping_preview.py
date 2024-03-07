
import sys
import json
from os import system
from song_dto import Song
from lacuerdanetscrapper import parse_song_from
from genericscrapper import scrape_song

url = sys.argv[1]


try:
    #song=parse_song_from(url)
    song=scrape_song(url)
    body = {
        'title': song.title,
        'artist': song.artist,
        'lyric': {
            'text': song.lyric_text
        },
        'lyricchord': song.chord_html
    }
    print(json.dumps(body))
except Exception as e:
    body = {
        'title': "Oops! song not found or it's impossible to scrap",
        'artist': "Oops! song not found",
        'lyric': {
            'text': "Oops! song not found"
        },
        'lyricchord': "Oops! song not found"
    }
    print(json.dumps(body))












