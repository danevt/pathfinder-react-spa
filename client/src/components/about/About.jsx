import { Link } from 'react-router';

export default function About() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black px-6 py-12 flex justify-center items-center'>
            <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl space-y-6 border-b-6 border-black border-r-6 border-gray-800'>
                <h2 className='text-4xl font-bold text-center text-black drop-shadow-[1px_1px_1px_black]'>
                    About Pathfinder
                </h2>

                <p className='text-lg text-black font-semibold leading-relaxed text-shadow-sm'>
                    Pathfinder is a blog dedicated to sharing{' '}
                    <Link to='/create'>
                        <span className='text-[#4A9603] font-bold hover:text-[#5ECF00] transition text-shadow-sm'>
                            unique destinations
                        </span>{' '}
                    </Link>
                    and travel experiences. Our mission is to inspire explorers
                    to{' '}
                    <Link to='/catalog'>
                        <span className='text-[#4A9603] font-bold hover:text-[#5ECF00] transition text-shadow-sm'>
                            discover new places
                        </span>{' '}
                    </Link>
                    , connect with nature, and enjoy unforgettable adventures.
                </p>

                <p className='text-lg text-black font-semibold leading-relaxed text-shadow-sm'>
                    Here you will find curated guides, personal stories, and
                    recommendations for both popular and hidden gems. Whether
                    you are looking for a weekend getaway or a long journey,
                    Pathfinder helps you plan and explore with ease.
                </p>

                <p className='text-lg text-black font-semibold leading-relaxed text-shadow-sm'>
                    <Link to='/register'>
                        <span className='text-[#4A9603] font-bold hover:text-[#5ECF00] transition text-shadow-sm'>
                            Join
                        </span>{' '}
                    </Link>
                    our community, share your favorite destinations, and let's
                    build a collection of inspiring places together.
                </p>
            </div>
        </section>
    );
}
