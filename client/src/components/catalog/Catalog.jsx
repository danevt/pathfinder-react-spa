import { useState } from 'react';
import { Link } from 'react-router';
import PlaceCard from '../place/card/PlaceCard.jsx';
import { ENDPOINT_PLACES } from '../../config/api.js';
import Pagination from '../ui/pagination/Pagination.jsx';
import useRequest from '../../hooks/useRequest.js';
import PlaceSorter from './catalog-sorter/PlaceSorter.jsx';

export default function Catalog() {
    const [currentPage, setCurrentPage] = useState(1);
    const placesPerPage = 3;

    const { data: places, setData: setPlaces } = useRequest(
        ENDPOINT_PLACES,
        []
    );

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

                    <PlaceSorter places={places} setPlaces={setPlaces} />

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
