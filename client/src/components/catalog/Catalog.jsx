import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import PlaceCard from '../place/card/PlaceCard.jsx';
import request from '../../utils/requester.js';
import { PLACES_API } from '../../config/api.js';

export default function Catalog() {
    const [places, setPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const placesPerPage = 3;

    useEffect(() => {
        request(PLACES_API)
            .then(result => {
                const allPlaces = Object.values(result).sort(
                    (a, b) => b._createdOn - a._createdOn
                );
                setPlaces(allPlaces);
            })
            .catch(error => alert(error.message));
    }, []);

    const totalPages = Math.ceil(places.length / placesPerPage);

    const indexOfFirstPlace = (currentPage - 1) * placesPerPage;
    const indexOfLastPlace = currentPage * placesPerPage;
    const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const goToPage = num => setCurrentPage(num);
    const goFirst = () => setCurrentPage(1);
    const goLast = () => setCurrentPage(totalPages);
    const goPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

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
                        {currentPlaces.map(place => (
                            <PlaceCard key={place._id} {...place} />
                        ))}
                    </div>

                    <div className='flex justify-center gap-2 mb-8'>
                        <button
                            onClick={goFirst}
                            disabled={currentPage === 1}
                            className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900'
                        >
                            First
                        </button>
                        <button
                            onClick={goPrev}
                            disabled={currentPage === 1}
                            className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900'
                        >
                            Prev
                        </button>

                        {pageNumbers.map(num => (
                            <button
                                key={num}
                                onClick={() => goToPage(num)}
                                className={`bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 ${
                                    currentPage === num
                                        ? 'ring-2 ring-[#5ECF00]'
                                        : ''
                                }`}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            onClick={goNext}
                            disabled={currentPage === totalPages}
                            className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900'
                        >
                            Next
                        </button>
                        <button
                            onClick={goLast}
                            disabled={currentPage === totalPages}
                            className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900'
                        >
                            Last
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
