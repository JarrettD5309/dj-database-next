'use client';

import { createTrack } from "@/actions";
import { useFormState } from "react-dom";

export default function AddTrackForm() {
  const [formState, action] = useFormState(createTrack, { errors: {} });

  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="artist" className="w-32">Artist</label>
          <input type="text" id="artist" name="artist" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="song-title" className="w-32">Song Title</label>
          <input type="text" id="song-title" name="song-title" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="genres" className="w-32">Genres</label>
          <input type="text" id="genres" name="genres" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="bpm" className="w-32">BPM</label>
          <input type="text" id="bpm" name="bpm" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="position" className="w-32">Position</label>
          <input type="text" id="position" name="position" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="rpm" className="w-32">RPM</label>
          <input type="text" id="rpm" name="rpm" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="release" className="w-32">Release Name</label>
          <input type="text" id="release" name="release" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="discogs-link" className="w-32">Discogs Link</label>
          <input type="text" id="discogs-link" name="discogs-link" className="border rounded p-2 w-full" />
        </div>

        <div className="flex gap-4">
          <label htmlFor="year" className="w-32">Year</label>
          <input type="text" id="year" name="year" className="border rounded p-2 w-full" />
        </div>

        {/* {
          formState?.errors?._form ?
            <div className="rounded p-2 bg-red-200 border border-red-400">{formState.errors._form.join(', ')}</div>
            :
            null
        } */}
        {
          formState?.errors ?
            <div className="rounded p-2 bg-red-200 border border-red-400">{JSON.stringify(formState.errors)}</div>
            :
            null
        }

        <button type="submit" className="rounded p-2 bg-blue-200">Submit</button>
      </div>
    </form>
  );
}