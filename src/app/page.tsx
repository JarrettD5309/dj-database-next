import TableParent from "@/components/table/table-parent";
import db from "@/db";
import { Track } from "@prisma/client";
import Link from "next/link";

export default async function Home(props: { params: any; searchParams: { genre: string } }) {

  const tracks: Track[] = Object.keys(props.searchParams).length === 0
    ||
    props.searchParams?.genre === 'all'
    ? await db.track.findMany()
    : await db.track.findMany({
      where: {
        genres: {
          hasSome: [props.searchParams.genre]
        }
      }
    });

  const genres = await db.track.findMany({
    distinct: ['genres'],
    select: {
      genres: true
    }
  });

  return (
    <div>
      <h1 className="text-2xl py-2">Home Page</h1>
      <TableParent tracks={tracks} genres={genres} />
      <div className="py-3 mt-2">
        <Link href={'/addtrack'} className="border rounded p-2 bg-blue-200">Add Track</Link>
      </div>
    </div>
  );
}
