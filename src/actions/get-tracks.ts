'use server';

import db from "@/db";
import { Track } from "@prisma/client";

export async function getTracks(
  column: string,
  direction: string,
  genre: string,
): Promise<Track[]> {

  if (genre === 'all' || !genre) {
    return await db.track.findMany({
      orderBy: {
        [column]: direction
      }
    });
  }

  return await db.track.findMany({
    where: {
      genres: {
        hasSome: [genre]
      }
    },
    orderBy: {
      [column]: direction
    }
  })
}