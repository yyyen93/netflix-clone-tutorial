
// [3] This is the way to protect our home route.
import { NextPageContext } from 'next';

//[1]
import { getSession, signOut } from 'next-auth/react'

//[8] 
import useCurrentUser from '../hooks/useCurrentUser';

// [11]
import Navbar from '../components/Navbar';

// [13]
import Billboard from '../components/Billboard';

// [15]
import MovieList from '../components/MovieList';
import useMovieList from '../hooks/useMovieList';
// [19]
import useFavorites from '../hooks/useFavorites';
// [20]
import InfoModal from '../components/InfoModal';
import useInfoModal from '../hooks/useInfoModal';



// [4] This is the way to protect our home route.
export async function getServerSideProps(context: NextPageContext) {
  // [5] Fetch our session but on client side, we cannot use the serverAuth because this index.tsx is client.
  const session = await getSession(context);

  // [6] Check if any session exists, if no redirect to /auth
  if(!session){
    return{
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  // [7] We need to return something from getServerSideProps and if session exist, its not going to return anything so we have to make sure we return an object with just empty props.
  return {
    props: {}
  }
}

export default function Home() {
  /** [9] 
   * Fetch user using useCurrentUser hook. 
   * Remember we are going to have data and we can create alias for this data. Name it whatever you want. In my case is 'user'
   * 
   */
  const { data: user } = useCurrentUser();

  /** [16]
   * Load movie data from [MovieList.tsx]
   * Give the data a alias called 'movies'
   * so now you can use the movies in the data parameter in <MovieList data={}/>
   */
  const { data: movies = [] } = useMovieList();
  // [18] favorites empty array
  const { data: favorites = [] } = useFavorites(); 
  // [22]
  const {isOpen, closeModal} = useInfoModal();

  return (
    <>
      {/* [21]
        * default visible
        * onClose empty function
      */}
      <InfoModal visible={isOpen} onClose={closeModal} />
      {/* [10] Navbar Component: Navbar.tsx  */}
      <Navbar />
      {/* [12] */}
      <Billboard /> 
      {/* [14] */}
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        {/* [17] Create movielist on the bottom so we can see, once we clicked it appear below */}
        <MovieList data={favorites} title="My List" />
      </div>
    </>
  )
}
