'use client';

import { Track } from "@prisma/client";
import GenreButtons from "../genre-buttons";
import TracksTable from "./tracks-table";

interface TablesParentProps {
  tracks: Track[];
  genres: { genres: string[] }[];
}

export default function TableParent(
  { tracks, genres }: TablesParentProps
) {

  return (
    <>
      <div>
        <GenreButtons genres={genres} />
      </div>
      <div>
        <TracksTable tracks={tracks} />
      </div>
    </>
  );

}