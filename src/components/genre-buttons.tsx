import { handleGenreButtonClick } from "@/actions";
import { redirect } from "next/navigation";

interface GenreButtonsProps {
  genres: { genres: string[] }[];
}

export default function GenreButtons({ genres }: GenreButtonsProps) {

  const genresArray: string[][][] = [];

  genres.forEach((obj) => genresArray.push(Object.values(obj)));

  const uniqueGenres = genresArray.flat(Infinity).filter((v, i, a) => a.indexOf(v) === i);

  const handleGenreButtonOnClick = async (data: FormData) => {
    'use server';
    await handleGenreButtonClick(data);
  };

  return (
    <>
      <form action={handleGenreButtonOnClick} className="inline-block">
        <input name="genre" className="hidden" value={'all'} readOnly />
        <button
          type="submit"
          className="border rounded p-2 bg-blue-200 mr-2 mb-2"
        >
          All Genres
        </button>
      </form>

      {uniqueGenres.map((genre) => (
        <form action={handleGenreButtonOnClick} className="inline-block" key={`${genre}`}>
          <input name="genre" className="hidden" value={`${genre}`} readOnly />
          <button
            type="submit"
            className="border rounded p-2 bg-blue-200 mr-2 mb-2"
          >
            {genre}
          </button>
        </form>

      ))}
    </>
  );
}