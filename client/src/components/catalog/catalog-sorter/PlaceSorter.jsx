import { useState, useEffect } from 'react';

export default function PlaceSorter({ places, setPlaces }) {
    const [sortAsc, setSortAsc] = useState(false);

    useEffect(() => {
        const sortedPlaces = [...places].sort((a, b) =>
            sortAsc
                ? a._createdOn - b._createdOn
                : b._createdOn - a._createdOn
        );
        setPlaces(sortedPlaces);
    }, [sortAsc, places.length, setPlaces]);

    const toggleSort = () => setSortAsc(prev => !prev);

    return (
        <div className='flex justify-center gap-2 mb-4'>
            <button
                onClick={toggleSort}
                className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 transform transition-transform duration-300 hover:scale-105'
            >
                {sortAsc ? 'Oldest First ↓' : 'Newest First ↑'}
            </button>
        </div>
    );
}
