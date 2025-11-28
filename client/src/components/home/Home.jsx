import { useEffect, useState } from 'react';
import PlaceCard from '../catalog/place-card/PlaceCard.jsx';
import { Link } from 'react-router';

export default function Home() {
    const [latestPlaces, setLatestPlaces] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/blog')
            .then(response => response.json())
            .then(result => {
                const resultPlaces = Object.values(result.places)
                    .sort((a, b) => b._createdOn - a._createdOn)
                    .slice(0, 3);

                setLatestPlaces(resultPlaces);
            })
            .catch(error => alert(error.message));
    }, []);

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col items-center'>
            <div className='text-white text-center font-bold drop-shadow-[2px_2px_2px_black] mb-10'>
                <h2 className='text-4xl sm:text-5xl md:text-5xl text-center font-bold mb-4'>
                    Welcome to Pathfinder
                </h2>
                <p className='text-lg'>
                    Discover interesting places and landmarks around you
                </p>
            </div>

            {latestPlaces.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full'>
                    {latestPlaces.map(place => (
                        <PlaceCard key={place._id} {...place} />
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center gap-4 mt-20'>
                    <h3 className='text-4xl sm:text-5xl md:text-5xl font-bold text-white p-0 drop-shadow-[3px_3px_3px_black] text-center'>
                        No destinations added yet!
                    </h3>
                    <p className='text-3xl font-bold text-white text-center font-bold drop-shadow-[2px_2px_2px_black] mb-10'>
                        Be the first to add a{' '}
                        <Link
                            to='/create'
                            className='text-3xl text-[#4A9603] font-bold hover:text-[#5ECF00] transition'
                        >
                            place
                        </Link>
                    </p>
                </div>
            )}
        </section>
    );
}

// <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6  flex flex-col'>
//     <div className='text-white text-left font-bold  drop-shadow-[2px_2px_2px_black]'>
//         <h2 className='text-4xl text-center  font-bold mb-4'>
//             Welcome to Pathfinder
//         </h2>
//         <p className='text-lg mb-10 text-center'>
//             Discover interesting places and landmarks around you
//         </p>
//     </div>
//     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
//         {latestPlaces.map(place => (
//             <PlaceCard key={place._id} {...place} />
//         ))}
//     </div>
// </section>
