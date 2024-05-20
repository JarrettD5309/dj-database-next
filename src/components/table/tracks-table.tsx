import { Track } from "@prisma/client";
import { redirect } from "next/navigation";
import TableItem from "./table-item";
import { Directions, TrackInfo } from "@/consts/enums";

const GRID_HEADER_CLASS = 'border-l border-b border-black p-2 text-center font-semibold';

interface TracksTableProps {
  tracks: Track[];
  currentGenre: string;
}

export default function TracksTable({ tracks, currentGenre }: TracksTableProps) {

  const handleTriClick = async (data: FormData) => {
    'use server';
    const searchRoute = (column: string, direction: string) => `/?genre=${currentGenre}&column=${column}&direction=${direction}`;
    const column = data.get('column') as string;
    const direction = data.get('direction')  as string;
    redirect(searchRoute(column, direction));
  };

  return (
    <div className="grid grid-cols-[repeat(6,_auto)] border-t border-r border-black">
      <>
        <div className={GRID_HEADER_CLASS}>Artist&nbsp;
          <form action={handleTriClick} className="inline-block">
            <input name="column" className="hidden" value={TrackInfo.ARTIST} readOnly />
            <input name="direction" className="hidden" value={Directions.ASCEND} readOnly />
            <button type="submit">&#9650;</button>
          </form>
          <form action={handleTriClick} className="inline-block">
            <input name="column" className="hidden" value={TrackInfo.ARTIST} readOnly />
            <input name="direction" className="hidden" value={Directions.DESCEND} readOnly />
            <button type="submit">&#9660;</button>
          </form>
        </div>
        <div className={GRID_HEADER_CLASS}>Title&nbsp;
          <form action={handleTriClick} className="inline-block">
            <input name="column" className="hidden" value={TrackInfo.SONG_TITLE} readOnly />
            <input name="direction" className="hidden" value={Directions.ASCEND} readOnly />
            <button type="submit">&#9650;</button>
          </form>
          <form action={handleTriClick} className="inline-block">
            <input name="column" className="hidden" value={TrackInfo.SONG_TITLE} readOnly />
            <input name="direction" className="hidden" value={Directions.DESCEND} readOnly />
            <button type="submit">&#9660;</button>
          </form>
        </div>
        <div className={GRID_HEADER_CLASS}>BPM&nbsp;
        <form action={handleTriClick} className="inline-block">
            <input name="column" className="hidden" value={TrackInfo.BPM} readOnly />
            <input name="direction" className="hidden" value={Directions.ASCEND} readOnly />
            <button type="submit">&#9650;</button>
          </form>
          <form action={handleTriClick} className="inline-block">
            <input name="column" className="hidden" value={TrackInfo.BPM} readOnly />
            <input name="direction" className="hidden" value={Directions.DESCEND} readOnly />
            <button type="submit">&#9660;</button>
          </form>
        </div>
        <div className={GRID_HEADER_CLASS}>Position</div>
        <div className={GRID_HEADER_CLASS}>RPM</div>
        <div className={GRID_HEADER_CLASS}>Details</div>
      </>
      {tracks.map((track) => <TableItem key={track.id} track={track} />)}
    </div>
  );
}