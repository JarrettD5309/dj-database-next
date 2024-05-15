import AddTrackForm from "@/components/add-track-form";
import db from "@/db";
import Image from "next/image";

export default async function Home() {

  const tracks = await db.track.findMany();

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {tracks.map((track) => {
          return (
            <div key={track.id}>
              <p>Artist: {track.artist}, Song: {track.songTitle}, Genre: {track.genres[0]}</p>
            </div>
          );
        })}
      </div>
      <AddTrackForm />
    </div>
  );
}
