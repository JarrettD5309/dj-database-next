import { useRouter } from "next/navigation";

interface GenreButtonsProps {
  genres: { genres: string[] }[];
}

export default function GenreButtons({ genres }: GenreButtonsProps) {

  const router = useRouter();

  const genresArray: string[][][] = [];

  genres.forEach((obj) => genresArray.push(Object.values(obj)));

  const uniqueGenres = genresArray.flat(Infinity).filter((v, i, a) => a.indexOf(v) === i);

  return (
    <>
    <button
          className="border rounded p-2 bg-blue-200 mr-2 mb-2"
          onClick={() => router.push('/?genre=all')}
        >
          All Genres
        </button>
      {uniqueGenres.map((genre) => (
        <button
          key={`${genre}`}
          className="border rounded p-2 bg-blue-200 mr-2 mb-2"
          onClick={() => router.push(`/?genre=${genre}`)}
        >
          {genre}
        </button>
      ))}
    </>
  );
}