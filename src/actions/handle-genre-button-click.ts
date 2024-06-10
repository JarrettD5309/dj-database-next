'use server';

import { redirect } from "next/navigation";

export async function handleGenreButtonClick(data: FormData) {
  const genre = data.get('genre');
  redirect(`/?genre=${genre}`);
};