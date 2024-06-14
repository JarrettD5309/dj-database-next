import { createOrUpdateTrack } from "@/actions";
import TrackForm from "@/components/track-form";

export default function AddTrackPage() {
  return (
    <div>
      <h1 className="text-2xl py-2">Add Track</h1>
      <TrackForm formStateFunction={createOrUpdateTrack} />
    </div>
  );
}