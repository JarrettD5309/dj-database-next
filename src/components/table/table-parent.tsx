import { Track } from "@prisma/client";
import GenreButtons from "../genre-buttons";
import TracksTable from "./tracks-table";

interface TablesParentProps {
  tracks: Track[];
  genres: { genres: string[] }[];
  currentGenre: string;
}

export default function TableParent(
  { tracks, genres, currentGenre }: TablesParentProps
) {

  return (
    <>
      <div>
        <GenreButtons genres={genres} />
      </div>
      <div>
        <TracksTable tracks={tracks} currentGenre={currentGenre} />
      </div>
    </>
  );

}