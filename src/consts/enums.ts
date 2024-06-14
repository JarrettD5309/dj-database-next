enum Directions {
  ASCEND = 'asc',
  DESCEND = 'desc',
}

enum FormInputs {
  ID = 'id',
  ARTIST = 'artist',
  SONG_TITLE = 'song-title',
  GENRE_ONE = 'genre-one',
  GENRE_TWO = 'genre-two',
  BPM = 'bpm',
  POSITION = 'position',
  RPM = 'rpm',
  RELEASE = 'release',
  DISCOGS_LINK = 'discogs-link',
  YEAR = 'year',
}

enum TrackInfo {
  ARTIST = 'artist',
  SONG_TITLE = 'songTitle',
  GENRES = 'genres',
  BPM = 'bpm',
  POSITION = 'position',
  RPM = 'rpm',
  RELEASE = 'release',
  DISCOGS_LINK = 'discogsLink',
  YEAR = 'year',
}

export { FormInputs, TrackInfo, Directions };