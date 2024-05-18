import { Track } from "@prisma/client";
import TableItem from "./table-item";

const GRID_HEADER_CLASS = 'border-l border-b border-black p-2 text-center font-semibold';

export default function TracksTable({ tracks }: { tracks: Track[] }) {

  return (
    <div className="grid grid-cols-[repeat(6,_auto)] border-t border-r border-black">
      <>
        <div className={GRID_HEADER_CLASS}>Artist</div>
        <div className={GRID_HEADER_CLASS}>Title</div>
        <div className={GRID_HEADER_CLASS}>BPM</div>
        <div className={GRID_HEADER_CLASS}>Position</div>
        <div className={GRID_HEADER_CLASS}>RPM</div>
        <div className={GRID_HEADER_CLASS}>Details</div>
      </>
      {tracks.map((track) => <TableItem key={track.id} track={track} />)}
    </div>
  );
}