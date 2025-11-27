import PlaceCard from "../place-card/PlaceCard.jsx";


export default function Catalog() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col'>
            {/* Заглавие */}
            <div className='text-white font-bold drop-shadow-[2px_2px_2px_black] mb-8'>
                <h2 className='text-4xl text-center font-bold mb-4'>
                    Explore Places
                </h2>
                <p className='text-lg text-center'>
                    Discover interesting destinations around you
                </p>
            </div>

            {/* Секция с карти */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
                <PlaceCard />
                <PlaceCard />
                <PlaceCard />
                <PlaceCard />
                <PlaceCard />
                <PlaceCard />
            </div>

            {/* Пагинация (статична) */}
            <div className='flex justify-center gap-2'>
                <button className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700'>
                    1
                </button>
                <button className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700'>
                    2
                </button>
                <button className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700'>
                    3
                </button>
                <button className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700'>
                    Next
                </button>
            </div>
        </section>
    );
}
