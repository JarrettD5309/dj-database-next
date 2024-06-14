'use server';

import { FormInputs, TrackInfo } from "@/consts/enums";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createOrUpdateTrackSchema = z.object({
  [TrackInfo.ARTIST]: z.string().min(1).max(200),
  [TrackInfo.SONG_TITLE]: z.string().min(1).max(200),
  [TrackInfo.GENRES]: z.string().min(1).max(200).array().nonempty(),
  [TrackInfo.BPM]: z.coerce.number().gt(0).lt(1000),
  [TrackInfo.POSITION]: z.string().min(1).max(200),
  [TrackInfo.RPM]: z.coerce.number().gt(0).lt(100),
  [TrackInfo.RELEASE]: z.string().min(1).max(500),
  [TrackInfo.DISCOGS_LINK]: z.string().url(),
  [TrackInfo.YEAR]: z.coerce.number().min(1800).max(2200),
});

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

export async function createOrUpdateTrack(
  formState: CreateOrUpdateTrackFormState,
  formData: FormData
): Promise<CreateOrUpdateTrackFormState> {

  const genres = [];
  if (formData.get(FormInputs.GENRE_ONE)) {
    genres.push(formData.get(FormInputs.GENRE_ONE));
  };

  if (formData.get(FormInputs.GENRE_TWO)) {
    genres.push(formData.get(FormInputs.GENRE_TWO));
  };

  const validationResult = createOrUpdateTrackSchema.safeParse({
    [TrackInfo.ARTIST]: formData.get(FormInputs.ARTIST),
    [TrackInfo.SONG_TITLE]: formData.get(FormInputs.SONG_TITLE),
    [TrackInfo.GENRES]: genres,
    [TrackInfo.BPM]: formData.get(FormInputs.BPM),
    [TrackInfo.POSITION]: formData.get(FormInputs.POSITION),
    [TrackInfo.RPM]: formData.get(FormInputs.RPM),
    [TrackInfo.RELEASE]: formData.get(FormInputs.RELEASE),
    [TrackInfo.DISCOGS_LINK]: formData.get(FormInputs.DISCOGS_LINK),
    [TrackInfo.YEAR]: formData.get(FormInputs.YEAR),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors
    };
  }

  try {

    if (formData.get(FormInputs.ID)) {
      await db.track.update({
        where: {
          id: formData.get(FormInputs.ID) as string
        },
        data: {
          [TrackInfo.ARTIST]: validationResult.data[TrackInfo.ARTIST],
          [TrackInfo.SONG_TITLE]: validationResult.data[TrackInfo.SONG_TITLE],
          [TrackInfo.GENRES]: validationResult.data[TrackInfo.GENRES],
          [TrackInfo.BPM]: validationResult.data[TrackInfo.BPM],
          [TrackInfo.POSITION]: validationResult.data[TrackInfo.POSITION],
          [TrackInfo.RPM]: validationResult.data[TrackInfo.RPM],
          [TrackInfo.RELEASE]: validationResult.data[TrackInfo.RELEASE],
          [TrackInfo.DISCOGS_LINK]: validationResult.data[TrackInfo.DISCOGS_LINK],
          [TrackInfo.YEAR]: validationResult.data[TrackInfo.YEAR],
        },
      });
    } else {
      await db.track.create({
        data: {
          [TrackInfo.ARTIST]: validationResult.data[TrackInfo.ARTIST],
          [TrackInfo.SONG_TITLE]: validationResult.data[TrackInfo.SONG_TITLE],
          [TrackInfo.GENRES]: validationResult.data[TrackInfo.GENRES],
          [TrackInfo.BPM]: validationResult.data[TrackInfo.BPM],
          [TrackInfo.POSITION]: validationResult.data[TrackInfo.POSITION],
          [TrackInfo.RPM]: validationResult.data[TrackInfo.RPM],
          [TrackInfo.RELEASE]: validationResult.data[TrackInfo.RELEASE],
          [TrackInfo.DISCOGS_LINK]: validationResult.data[TrackInfo.DISCOGS_LINK],
          [TrackInfo.YEAR]: validationResult.data[TrackInfo.YEAR],
        },
      });
    }  

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