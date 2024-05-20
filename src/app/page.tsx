import { getTracks } from "@/actions";
import TableParent from "@/components/table/table-parent";
import { TrackInfo } from "@/consts/enums";
import db from "@/db";
import { Track } from "@prisma/client";
import Link from "next/link";

export default async function Home(props: { params: any; searchParams: { genre: string, column: string, direction: string } }) {

  const currentGenre = Object.keys(props.searchParams).length === 0 ? 'all' : props.searchParams.genre;

  const tracks: Track[] = await getTracks(props.searchParams.column, props.searchParams.direction, props.searchParams.genre);

  const genres = await db.track.findMany({
    distinct: [TrackInfo.GENRES],
    select: {
      genres: true
    }
  });

  return (
    <div>
      <h1 className="text-2xl py-2">Home Page</h1>
      <TableParent tracks={tracks} genres={genres} currentGenre={currentGenre} />
      <div className="py-3 mt-2">
        <Link href={'/addtrack'} className="border rounded p-2 bg-blue-200">Add Track</Link>
      </div>
    </div>
  );
}
