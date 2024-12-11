import { Media, Movie } from '@/payload-types'
import configPromise from '@payload-config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const payload = await getPayload({ config: configPromise })
  const { slug } = await params

  const movies = await payload.find({
    collection: 'movies',
    where: {
      slug: { equals: slug },
    },
  })

  if (movies.docs.length === 0) {
    return notFound()
  }

  const movie: Movie = movies.docs[0]

  return (
    <div className="movie md:grid md:grid-cols-12 md:gap-x-8">
      <div className="md:col-span-4">
        <div className="image-container aspect-[6/9]">
          <Image
            src={(movie.poster as Media)?.url ?? ''}
            alt={(movie.poster as Media)?.alt ?? ''}
            width={600}
            height={900}
          />
        </div>
      </div>

      <div className="md:col-span-8">
        <h2 className="text-5xl font-bold">{movie.name}</h2>

        <p className="tagline text-2xl font-light text-blue-500 my-6">{movie.tagline}</p>
        <h3 className="text-xl font-semibold mb-4">Overview</h3>
        <p className="text-lg mb-4">{movie.overview}</p>

        <h3 className="text-xl font-semibold mb-4">Genres</h3>
        <ul className="flex gap-2 divide-x-[1px] divide-gray-600 items-center mb-8">
          {movie.genres.map((genre) => (
            <li className="pl-2 first:pl-0" key={genre.id}>
              {genre.name}
            </li>
          ))}
        </ul>

        <div className="votes bg-gray-700 p-2 px-3 rounded inline-block">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#f5ba78"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span>
              {movie.votes} {movie.votes > 0 ? 'votes' : 'vote'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
