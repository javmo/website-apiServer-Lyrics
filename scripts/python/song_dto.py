class Song:
    def __init__(self, title, artist, chord_html, chord_text, lyric_text):
        self.title = title
        self.artist = artist
        self.chord_html = chord_html
        self.chord_text = chord_text
        self.lyric_text = lyric_text

    def __str__(self):
        return '{0} by {1}'.format(self.title, self.artist)
