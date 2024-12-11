'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addVote } from '@/movies'
import { Media, Movie } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const MovieCards = ({ movies: initialMovies }: { movies: Movie[] }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)

  return (
    <div className="flex flex-wrap gap-8">
      {movies.map((movie) => (
        <React.Fragment key={movie.id}>
          <Card className="md:w-64">
            <CardHeader>
              <CardTitle>{movie.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              <Link href={`/movie/${movie.slug}`} className="">
                <Image
                  className="aspect-[6/9] object-cover"
                  src={(movie.poster as Media)?.url ?? ''}
                  alt={(movie.poster as Media)?.alt ?? ''}
                  width={200}
                  height={300}
                />
              </Link>
              <div className="flex justify-between items-center gap-2">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                  <div>{movie.votes}</div>
                </div>

                <Button
                  onClick={async () => {
                    setMovies(await addVote(movie.id))
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  Vote
                </Button>
              </div>
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </div>
  )
}

export default MovieCards
