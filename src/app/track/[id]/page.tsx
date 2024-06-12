import db from "@/db"
import { notFound } from "next/navigation";

interface TrackPageProps {
  params: {
    id: string
  }
}

export default async function TrackPage({ params }: TrackPageProps) {
  const track = await db.track.findFirst({
    where: { id: params.id}
  });

  if (!track) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-2xl py-2">Track Page</h1>
      <p>{track.artist}</p>
      <p>{track.songTitle}</p>
    </>
  )
}