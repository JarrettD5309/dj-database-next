'use client';

import { createTrack } from "@/actions";
import { useFormState } from "react-dom";

const LABEL_CLASS = 'w-28';
const INPUT_CLASS = 'border rounded p-2 w-0 flex-auto';

export default function AddTrackForm() {
  const [formState, action] = useFormState(createTrack, { errors: {} });

  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="artist" className={LABEL_CLASS}>Artist</label>
          <input type="text" id="artist" name="artist" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="song-title" className={LABEL_CLASS}>Song Title</label>
          <input type="text" id="song-title" name="song-title" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="genre-one" className={LABEL_CLASS}>Genre 1</label>
          <input type="text" id="genre-one" name="genre-one" className={INPUT_CLASS} />
          <label htmlFor="genre-two" className={LABEL_CLASS}>Genre 2</label>
          <input type="text" id="genre-two" name="genre-two" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="bpm" className={LABEL_CLASS}>BPM</label>
          <input type="text" id="bpm" name="bpm" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="position" className={LABEL_CLASS}>Position</label>
          <input type="text" id="position" name="position" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="rpm" className={LABEL_CLASS}>RPM</label>
          <input type="text" id="rpm" name="rpm" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="release" className={LABEL_CLASS}>Release Name</label>
          <input type="text" id="release" name="release" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="discogs-link" className={LABEL_CLASS}>Discogs Link</label>
          <input type="text" id="discogs-link" name="discogs-link" className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor="year" className={LABEL_CLASS}>Year</label>
          <input type="text" id="year" name="year" className={INPUT_CLASS} />
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