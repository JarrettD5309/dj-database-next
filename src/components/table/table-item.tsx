'use client';

import { Track } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

const GRID_ITEM_CLASS = 'border-l border-b border-black p-2 text-center';
const ANCHOR_CLASS = 'underline text-blue-600 hover:text-blue-800 visited:text-purple-600';

export default function TableItem({ track }: { track: Track }) {

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div className={GRID_ITEM_CLASS}>{track.artist}</div>
      <div className={GRID_ITEM_CLASS}>{track.songTitle}</div>
      <div className={GRID_ITEM_CLASS}>{track.bpm}</div>
      <div className={GRID_ITEM_CLASS}>{track.position}</div>
      <div className={GRID_ITEM_CLASS}>{track.rpm}</div>
      <div className={GRID_ITEM_CLASS}>
        <button className="border rounded p-2 bg-green-200" onClick={() => setIsDetailOpen(!isDetailOpen)}>
          {isDetailOpen ? 'Close' : 'Open'}
        </button>
      </div>
      {isDetailOpen && (
        <div className={`${GRID_ITEM_CLASS} col-[1_/_-1]`}>
          <p>Artist: {track.artist}</p>
          <p>Song: {track.songTitle}</p>
          <p>BPM: {track.bpm}</p>
          <p>Position: {track.position}</p>
          <p>RPM: {track.rpm}</p>
          <p>Genres: {track.genres.join(', ')}</p>
          <p>Release: {track.release}</p>
          <p>Year: {track.year}</p>
          <p>Discogs: <a href={track.discogsLink} className={ANCHOR_CLASS} target="_blank" rel="noreferrer">{track.discogsLink}</a></p>
          <div className="py-3 mt-2">
            <Link href={`/track/${track.id}`} className="border rounded p-2 bg-blue-200">Edit Track</Link>
          </div>
        </div>
      )}
    </>
  );
}