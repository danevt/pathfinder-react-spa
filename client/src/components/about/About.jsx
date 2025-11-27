export default function About() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black px-6 py-12 flex justify-center items-center'>
            <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl space-y-6 border-b-6 border-black border-r-6 border-gray-800'>
                <h2 className='text-4xl font-bold text-center text-black drop-shadow-[1px_1px_1px_black]'>
                    About Pathfinder
                </h2>

                <p className='text-lg text-black font-semibold leading-relaxed'>
                    Pathfinder is a blog dedicated to sharing{' '}
                    <span className='text-[#4A9603] font-bold'>
                        unique destinations
                    </span>{' '}
                    and travel experiences. Our mission is to inspire explorers
                    to discover new places, connect with nature, and enjoy
                    unforgettable adventures.
                </p>

                <p className='text-lg text-black font-semibold leading-relaxed'>
                    Here you will find curated guides, personal stories, and
                    recommendations for both popular and hidden gems. Whether
                    you are looking for a weekend getaway or a long journey,
                    Pathfinder helps you plan and explore with ease.
                </p>

                <p className='text-lg text-black font-semibold leading-relaxed'>
                    Join our community, share your favorite destinations, and
                    let’s build a collection of inspiring places together.
                </p>
            </div>
        </section>
    );
}
