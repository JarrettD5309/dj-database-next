import db from "@/db";
import Link from "next/link";

export default async function Home() {

  const tracks = await db.track.findMany();

  return (
    <div>
      <h1 className="text-2xl py-2">Home Page</h1>
      <div>
        {tracks.map((track) => {
          return (
            <div key={track.id} className="border rounded p-2 my-1">
              <p>Artist: {track.artist}, Song: {track.songTitle}, Genre: {track.genres[0]}</p>
            </div>
          );
        })}
      </div>
      <div className="py-3">
        <Link href={'/addtrack'} className="border rounded p-2 bg-blue-200">Add Track</Link>
      </div>
    </div>
  );
}
