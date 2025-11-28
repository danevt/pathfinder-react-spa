import { useEffect, useState } from 'react';
import PlaceCard from '../place-card/PlaceCard.jsx';
import { Link } from 'react-router';

export default function Catalog() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/blog')
            .then(response => response.json())
            .then(result => {
                // setPlaces(Object.values(result.places));
                const allPlaces = Object.values(result.places).sort(
                    (a, b) => b._createdOn - a._createdOn
                );
                setPlaces(allPlaces);
            })
            .catch(error => alert(error.message));
    }, []);

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col'>
            {places.length === 0 ? (
                <div className='flex flex-col items-center gap-4 mt-20'>
                    <p className='text-4xl sm:text-5xl md:text-6xl font-bold text-white p-24 drop-shadow-[3px_3px_3px_black] text-center'>
                        No Destinations To Explore Yet
                    </p>
                    <p className='text-3xl font-bold text-white text-center drop-shadow-[2px_2px_2px_black]'>
                        Be the first to add a{' '}
                        <Link
                            to='/create'
                            className='text-3xl text-[#4A9603] font-bold hover:text-[#5ECF00] transition'
                        >
                            place
                        </Link>
                    </p>
                </div>
            ) : (
                <>
                    <div className='text-white font-bold drop-shadow-[2px_2px_2px_black] mb-8'>
                        <h2 className='text-4xl sm:text-5xl md:text-5xl text-center font-bold mb-4'>
                            Explore Places
                        </h2>
                        <p className='text-lg text-center'>
                            Discover interesting destinations around you
                        </p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
                        {places.map(place => (
                            <PlaceCard key={place._id} {...place} />
                        ))}
                    </div>
                </>
            )}

            {places.length > 0 && (
                <div className='flex justify-center gap-2'>
                    <button
                        className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6
                        rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900
                        transform transition-transform duration-300 hover:scale-105'
                    >
                        1
                    </button>
                    <button
                        className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6
                        rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900
                        transform transition-transform duration-300 hover:scale-105'
                    >
                        2
                    </button>
                    <button
                        className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6
                        rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900
                        transform transition-transform duration-300 hover:scale-105'
                    >
                        3
                    </button>
                    <button
                        className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6
                        rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900
                        transform transition-transform duration-300 hover:scale-105'
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
}
