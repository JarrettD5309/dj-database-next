'use server';

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
  if (formData.get('genre-one')) {
    genres.push(formData.get('genre-one'));
  };

  if (formData.get('genre-two')) {
    genres.push(formData.get('genre-two'));
  };

  const validationResult = createTrackSchema.safeParse({
    artist: formData.get('artist'),
    songTitle: formData.get('song-title'),
    genres: genres,
    bpm: formData.get('bpm'),
    position: formData.get('position'),
    rpm: formData.get('rpm'),
    release: formData.get('release'),
    discogsLink: formData.get('discogs-link'),
    year: formData.get('year'),
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