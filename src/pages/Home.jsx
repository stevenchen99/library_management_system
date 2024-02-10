import HeroSection from '@/components/HeroSection';
import book from '@/assets/book.jpg';

function Home() {
  return (
    <>
      <HeroSection />
      {/* Book List  */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>
        {[1, 2, 3, 4, 5].map(() => (
          <div className='border border-1 p-4'>
            <img src={book} alt='' />
            <div className='text-center space-y-2 mt-3'>
              <h1>Book Title</h1>
              <p>Description</p>
              {/* Genres */}
              <div className='flex flex-wrap'>
                {['Anime', 'Travel', 'Anime', 'Travel'].map((genre) => (
                  <span className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500'>{genre}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
