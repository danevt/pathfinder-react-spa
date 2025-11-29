import { Link } from 'react-router';

export default function PlaceCard({
    _id,
    title,
    imageUrl,
    location,
    category,
    difficulty
}) {
    return (
        <div className='bg-white rounded-xl shadow-md overflow-hidden border-b-6 border-black border-r-6 border-gray-900 transform transition-transform duration-300 hover:scale-105'>
            <img
                src={imageUrl}
                alt={title}
                className='w-full h-64 object-cover'
            />
            <div className='p-4 flex flex-col justify-between h-36'>
                <div className='flex justify-between items-start mb-4'>
                    <div className='text-left'>
                        <h3 className='text-xl font-extrabold text-black text-shadow-sm'>
                            {title}
                        </h3>
                        <p className='text-sm text-gray-600 text-shadow-sm'>{location}</p>
                    </div>
                    <div className='text-right'>
                        <span className='text-sm font-semibold text-gray-800 uppercase text-shadow-sm'>
                            {category} | {difficulty}
                        </span>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        {/* <span className='text-yellow-500'>★ ★ ★ ★ ☆</span> */}
                        {/* <span className='text-sm text-gray-600'>(4.5)</span> */}
                    </div>
                    <Link to={`/places/${_id}/details`}>
                        <button
                            className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6
                        rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900
                        transform transition-transform duration-300 hover:scale-105'
                        >
                            Explore
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
