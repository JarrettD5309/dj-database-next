'use server';

import { FormInputs } from "@/consts/enums";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTrackSchema = z.object({
  artist: z.string().min(1).max(200),
  songTitle: z.string().min(1).max(200),
  genres: z.string().min(1).max(200).array().nonempty(),
  bpm: z.coerce.number().gt(0).lt(1000),
  position: z.string().min(1).max(200),
  rpm: z.coerce.number().gt(0).lt(100),
  release: z.string().min(1).max(500),
  discogsLink: z.string().url(),
  year: z.coerce.number().min(1800).max(2200),
});

interface CreateTrackFormState {
  errors: {
    artist?: string[];
    songTitle?: string[];
    genres?: string[];
    bpm?: string[];
    position?: string[];
    rpm?: string[];
    release?: string[];
    discogsLink?: string[];
    year?: string[];
    _form?: string[];
  }
}

export async function createTrack(
  formState: CreateTrackFormState,
  formData: FormData
): Promise<CreateTrackFormState> {

  const genres = [];
  if (formData.get(FormInputs.GENRE_ONE)) {
    genres.push(formData.get(FormInputs.GENRE_ONE));
  };

  if (formData.get(FormInputs.GENRE_TWO)) {
    genres.push(formData.get(FormInputs.GENRE_TWO));
  };

  const validationResult = createTrackSchema.safeParse({
    artist: formData.get(FormInputs.ARTIST),
    songTitle: formData.get(FormInputs.SONG_TITLE),
    genres: genres,
    bpm: formData.get(FormInputs.BPM),
    position: formData.get(FormInputs.POSITION),
    rpm: formData.get(FormInputs.RPM),
    release: formData.get(FormInputs.RELEASE),
    discogsLink: formData.get(FormInputs.DISCOGS_LINK),
    year: formData.get(FormInputs.YEAR),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    };
  }

  try {

    await db.track.create({
      data: {
        artist: validationResult.data.artist,
        songTitle: validationResult.data.songTitle,
        genres: validationResult.data.genres,
        bpm: validationResult.data.bpm,
        position: validationResult.data.position,
        rpm: validationResult.data.rpm,
        release: validationResult.data.release,
        discogsLink: validationResult.data.discogsLink,
        year: validationResult.data.year,
      },
    });

  } catch (error: unknown) {

    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        }
      }
    } else {
      return {
        errors: {
          _form: ['An unknown error occurred'],
        }
      }
    }

  }

  revalidatePath('/');

  redirect('/');

}