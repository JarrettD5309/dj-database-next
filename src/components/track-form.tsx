'use client';

import { FormInputs } from "@/consts/enums";
import { CreateOrUpdateTrackFormState } from "@/consts/interfaces";
import { useFormState } from "react-dom";

const LABEL_CLASS = 'w-28';
const INPUT_CLASS = 'border rounded p-2 w-0 flex-auto';

interface TrackFormProps {
  formStateFunction: (formState: CreateOrUpdateTrackFormState, formData: FormData) => Promise<CreateOrUpdateTrackFormState>;
  id?: string;
  artist?: string;
  songTitle?: string;
  genreOne?: string;
  genreTwo?: string;
  bpm?: string;
  position?: string;
  rpm?: string;
  release?: string;
  discogsLink?: string;
  year?: string;
}

export default function TrackForm({
  formStateFunction,
  id,
  artist = '',
  songTitle = '',
  genreOne = '',
  genreTwo = '',
  bpm = '',
  position = '',
  rpm = '',
  release = '',
  discogsLink = '',
  year = ''
}: TrackFormProps) {
  const [formState, action] = useFormState(formStateFunction, { errors: {} });

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
        {id &&
          <div className="flex gap-4">
            <p className={LABEL_CLASS}>ID</p>
            <p className={`${INPUT_CLASS} bg-slate-300`}>{id}</p>
            <input name={FormInputs.ID} className="hidden" value={id} readOnly />
          </div>
        }
        <div className="flex gap-4">
          <label htmlFor={FormInputs.ARTIST} className={LABEL_CLASS}>Artist</label>
          <input
            type="text"
            id={FormInputs.ARTIST}
            name={FormInputs.ARTIST}
            className={INPUT_CLASS}
            defaultValue={artist}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.SONG_TITLE} className={LABEL_CLASS}>Song Title</label>
          <input
            type="text"
            id={FormInputs.SONG_TITLE}
            name={FormInputs.SONG_TITLE}
            className={INPUT_CLASS}
            defaultValue={songTitle}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.GENRE_ONE} className={LABEL_CLASS}>Genre 1</label>
          <input
            type="text"
            id={FormInputs.GENRE_ONE}
            name={FormInputs.GENRE_ONE}
            className={INPUT_CLASS}
            defaultValue={genreOne}
          />
          <label htmlFor={FormInputs.GENRE_TWO} className={LABEL_CLASS}>Genre 2</label>
          <input
            type="text"
            id={FormInputs.GENRE_TWO}
            name={FormInputs.GENRE_TWO}
            className={INPUT_CLASS}
            defaultValue={genreTwo}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.BPM} className={LABEL_CLASS}>BPM</label>
          <input
            type="text"
            id={FormInputs.BPM}
            name={FormInputs.BPM}
            className={INPUT_CLASS}
            defaultValue={bpm}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.POSITION} className={LABEL_CLASS}>Position</label>
          <input
            type="text"
            id={FormInputs.POSITION}
            name={FormInputs.POSITION}
            className={INPUT_CLASS}
            defaultValue={position}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.RPM} className={LABEL_CLASS}>RPM</label>
          <input
            type="text"
            id={FormInputs.RPM}
            name={FormInputs.RPM}
            className={INPUT_CLASS}
            defaultValue={rpm}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.RELEASE} className={LABEL_CLASS}>Release Name</label>
          <input
            type="text"
            id={FormInputs.RELEASE}
            name={FormInputs.RELEASE}
            className={INPUT_CLASS}
            defaultValue={release}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.DISCOGS_LINK} className={LABEL_CLASS}>Discogs Link</label>
          <input
            type="text"
            id={FormInputs.DISCOGS_LINK}
            name={FormInputs.DISCOGS_LINK}
            className={INPUT_CLASS}
            defaultValue={discogsLink}
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor={FormInputs.YEAR} className={LABEL_CLASS}>Year</label>
          <input
            type="text"
            id={FormInputs.YEAR}
            name={FormInputs.YEAR}
            className={INPUT_CLASS}
            defaultValue={year}
          />
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