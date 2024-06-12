'use client';

import { createTrack } from "@/actions";
import { FormInputs } from "@/consts/enums";
import { useFormState } from "react-dom";

const LABEL_CLASS = 'w-28';
const INPUT_CLASS = 'border rounded p-2 w-0 flex-auto';

export default function AddTrackForm() {
  const [formState, action] = useFormState(createTrack, { errors: {} });

  function isObjEmpty(obj: Object) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor={FormInputs.ARTIST} className={LABEL_CLASS}>Artist</label>
          <input type="text" id={FormInputs.ARTIST} name={FormInputs.ARTIST} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.SONG_TITLE} className={LABEL_CLASS}>Song Title</label>
          <input type="text" id={FormInputs.SONG_TITLE} name={FormInputs.SONG_TITLE} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.GENRE_ONE} className={LABEL_CLASS}>Genre 1</label>
          <input type="text" id={FormInputs.GENRE_ONE} name={FormInputs.GENRE_ONE} className={INPUT_CLASS} />
          <label htmlFor={FormInputs.GENRE_TWO} className={LABEL_CLASS}>Genre 2</label>
          <input type="text" id={FormInputs.GENRE_TWO} name={FormInputs.GENRE_TWO} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.BPM} className={LABEL_CLASS}>BPM</label>
          <input type="text" id={FormInputs.BPM} name={FormInputs.BPM} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.POSITION} className={LABEL_CLASS}>Position</label>
          <input type="text" id={FormInputs.POSITION} name={FormInputs.POSITION} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.RPM} className={LABEL_CLASS}>RPM</label>
          <input type="text" id={FormInputs.RPM} name={FormInputs.RPM} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.RELEASE} className={LABEL_CLASS}>Release Name</label>
          <input type="text" id={FormInputs.RELEASE} name={FormInputs.RELEASE} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.DISCOGS_LINK} className={LABEL_CLASS}>Discogs Link</label>
          <input type="text" id={FormInputs.DISCOGS_LINK} name={FormInputs.DISCOGS_LINK} className={INPUT_CLASS} />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.YEAR} className={LABEL_CLASS}>Year</label>
          <input type="text" id={FormInputs.YEAR} name={FormInputs.YEAR} className={INPUT_CLASS} />
        </div>

        {/* {
          formState?.errors?._form ?
            <div className="rounded p-2 bg-red-200 border border-red-400">{formState.errors._form.join(', ')}</div>
            :
            null
        } */}
      
        {
          isObjEmpty(formState?.errors) ?
            null :
            <div data-testid="error-div" className="rounded p-2 bg-red-200 border border-red-400">{JSON.stringify(formState.errors)}</div>
        }

        <button type="submit" className="rounded p-2 bg-blue-200">Submit</button>
      </div>
    </form>
  );
}