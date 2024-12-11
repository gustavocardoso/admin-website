'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { addMovieAction } from '@/movies'
import { posterURL } from '@/movies/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Movie = {
  id: number
  poster_path: string
  title: string
}

const Page = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then(setMovies)
  }, [query])

  const router = useRouter()

  async function addMovie(id: number) {
    await addMovieAction(id)
    router.push('/')
  }

  return (
    <div className="mt-5">
      <div className="mb-8">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {movies.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {movies.map(({ id, poster_path, title }) => (
              <CarouselItem key={id} className="basis-1/6 flex flex-col">
                <Image
                  src={posterURL(poster_path)}
                  width={600}
                  height={900}
                  alt={title ?? ''}
                  className="w-full aspect-[6/9] object-cover"
                />

                <h1 className="text-center font-bold truncate text-xl my-5">{title}</h1>
                <Button onClick={() => addMovie(id)}>Add</Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-2xl">Type in a query to find movies</p>
      )}
    </div>
  )
}

export default Page
