import { TrackInfo } from "./enums";

interface CreateOrUpdateTrackFormState {
  errors: {
    [TrackInfo.ARTIST]?: string[];
    [TrackInfo.SONG_TITLE]?: string[];
    [TrackInfo.GENRES]?: string[];
    [TrackInfo.BPM]?: string[];
    [TrackInfo.POSITION]?: string[];
    [TrackInfo.RPM]?: string[];
    [TrackInfo.RELEASE]?: string[];
    [TrackInfo.DISCOGS_LINK]?: string[];
    [TrackInfo.YEAR]?: string[];
    _form?: string[];
  }
}

export type { CreateOrUpdateTrackFormState };