'use server';

import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTrack(
    formState: { errors: string},
    formData: FormData
): Promise<{ errors: string}> {

    const artist = formData.get('artist') as string;
    const song = formData.get('song') as string;
    const genre = [formData.get('genre') as string];
    const bpm = parseInt(formData.get('bpm') as string);
    const position = formData.get('position') as string;
    const rpm = parseInt(formData.get('rpm') as string);
    const release = formData.get('release') as string;
    const discogs = formData.get('discogs') as string;
    const year = parseInt(formData.get('year') as string);

    if (!artist || !song || !genre || !bpm || !position || !rpm || !release || !discogs || !year) {
        formState.errors = 'Missing required fields';
        return formState;
    }

    await db.track.create({
        data: {
            artist,
            songTitle: song,
            genres: genre,
            bpm,
            position,
            rpm,
            release,
            discogsLink: discogs,
            year,
        },
    });

    revalidatePath('/');

    redirect('/');

}