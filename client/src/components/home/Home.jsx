import PlaceCard from '../catalog/place-card/PlaceCard.jsx';

export default function Home() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-20  flex flex-col'>
            <div className='text-white text-left font-bold  drop-shadow-[2px_2px_2px_black]'>
                <h2 className='text-4xl font-bold mb-2'>
                    Welcome to Pathfinder
                </h2>
                <p className='text-lg mb-6 '>
                    Discover interesting places and landmarks around you
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                <PlaceCard />
                <PlaceCard />
                <PlaceCard />
            </div>
        </section>
    );
}
