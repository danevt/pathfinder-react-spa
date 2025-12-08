import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import PlaceCard from '../place/card/PlaceCard.jsx';
import request from '../../utils/requester.js';
import { ENDPOINT_PLACES } from '../../config/api.js';
import Pagination from '../ui/pagination/Pagination.jsx';

export default function Catalog() {
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortAsc, setSortAsc] = useState(false);
    const placesPerPage = 3;

    useEffect(() => {
        request(ENDPOINT_PLACES)
            .then(result => {
                const sortedPlaces = Object.values(result).sort((a, b) =>
                    sortAsc
                        ? a._createdOn - b._createdOn
                        : b._createdOn - a._createdOn
                );
                setPlaces(sortedPlaces);
            })
            .catch(error => alert(error.message));
    }, [sortAsc]);

    const indexOfFirstPlace = (currentPage - 1) * placesPerPage;
    const indexOfLastPlace = currentPage * placesPerPage;
    const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col'>
            {places.length === 0 ? (
                <div className='flex flex-col items-center gap-4 mt-20'>
                    <p className='text-4xl sm:text-5xl md:text-6xl font-bold text-white p-24 drop-shadow-[5px_5px_2px_black] text-center'>
                        No Destinations To Explore Yet
                    </p>
                    <p className='text-3xl font-bold text-white text-center drop-shadow-[5px_5px_2px_black]'>
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
                    <div className='text-white font-bold drop-shadow-[5px_5px_2px_black] mb-8'>
                        <h2 className='text-4xl sm:text-5xl md:text-5xl text-center font-bold mb-4'>
                            Explore Places
                        </h2>
                        <p className='text-lg text-center'>
                            Discover interesting destinations around you
                        </p>
                    </div>

                    <div className='flex justify-center gap-2 mb-4'>
                        <button
                            onClick={() => setSortAsc(prev => !prev)}
                            className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 transform transition-transform duration-300 hover:scale-105'
                        >
                            {sortAsc ? 'Oldest First ↑' : 'Newest First ↓'}
                        </button>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
                        {currentPlaces.map(place => (
                            <PlaceCard key={place._id} {...place} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={places.length}
                        itemsPerPage={placesPerPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </section>
    );
}
