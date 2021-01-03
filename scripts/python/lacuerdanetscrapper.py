import requests
from song_dto import Song
from bs4 import BeautifulSoup

def check_none(name, someObj):
    if someObj is None:
        print(name, "not found")
    else:
        print(name, "founded")

def remove_tags(soup_html, tags):
    for t in tags:
        found_tags = soup_html.find_all(t)
        for ft in found_tags:
            ft.extract()
# Support parsing lyrics without tabs
def parse_song_from(URL):
    try:
        page = requests.get(URL)

        soup = BeautifulSoup(page.content, 'html.parser')
        song_page = soup.find(id='mCols')
        song_header = song_page.find(id='tHead').find(id='tH1')
        song_body = song_page.find(id='t_body')
        check_none("[lacuerdanetscrapper] song_title", song_header)
        check_none("[lacuerdanetscrapper] song_body", song_body)
        song_title = song_header.find('h1').find('a').text
        song_artist = song_header.find('h2').find('a').text
        pre_tag = song_body.find('pre')
        chord_text = pre_tag.text
        chord_html = pre_tag.__str__()

        remove_tags(pre_tag, ['div','a','em'])

        lyric = pre_tag.__str__()

        print(lyric)

        return Song(song_title, song_artist, chord_html, chord_text, lyric)
    except Exception as e:
        raise ValueError('Problem parsing URL {0}'.format(URL), e)
