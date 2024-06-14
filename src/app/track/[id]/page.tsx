import { createOrUpdateTrack } from "@/actions";
import TrackForm from "@/components/track-form";
import db from "@/db"
import { notFound } from "next/navigation";

interface TrackPageProps {
  params: {
    id: string
  }
}

export default async function TrackPage({ params }: TrackPageProps) {
  const track = await db.track.findFirst({
    where: { id: params.id }
  });

  if (!track) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-2xl py-2">Track Page</h1>
      <TrackForm
        formStateFunction={createOrUpdateTrack}
        id={track.id}
        artist={track.artist}
        songTitle={track.songTitle}
        genreOne={track.genres[0]}
        genreTwo={track.genres[1] || ''}
        bpm={track.bpm.toString()}
        position={track.position}
        rpm={track.rpm.toString()}
        release={track.release}
        discogsLink={track.discogsLink}
        year={track.year.toString()}
      />
    </>
  )
}