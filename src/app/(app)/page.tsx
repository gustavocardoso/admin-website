import configPromise from '@payload-config'
import { getPayload } from 'payload'
import MovieCards from './components/MovieCards'

const Page = async () => {
  const payload = await getPayload({ config: configPromise })

  const movies = await payload.find({
    collection: 'movies',
    sort: '-votes',
  })

  return (
    <>
      <div>
        <MovieCards movies={movies.docs} />
      </div>
    </>
  )
}

export default Page
