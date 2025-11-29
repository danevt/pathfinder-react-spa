import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import PlaceDelete from '../delete/PlaceDelete.jsx';

export default function PlaceDetails() {
    const navigate = useNavigate();
    const { placeId } = useParams();
    const [place, setPlace] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/blog/places/${placeId}`)
            .then(response => response.json())
            .then(result => setPlace(result))
            .catch(error => alert(error.message));
    }, [placeId]);

    if (!place._id) {
        return <p className='text-white text-3xl'>Loading...</p>;
    }

    const cancelDeleteHandler = () => {
        setShowDeleteModal(false);
    };

    const afterDeleteHandler = () => {
        setShowDeleteModal(false);
        navigate('/');
    };
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 min-h-screen flex flex-col items-center'>
            <div className='text-white text-center font-bold drop-shadow-[2px_2px_2px_black] mb-6'>
                <h2 className='text-4xl font-bold mb-2'>
                    Explore this Destination
                </h2>
                <p className='text-lg'>
                    Discover the highlights and details of this amazing place.
                </p>
            </div>

            <div className='flex flex-col md:flex-row w-full max-w-7xl gap-6 '>
                <div className='md:flex-[2_2_0%] h-[600px] rounded-xl  border-b-6 border-black border-r-6 border-gray-800'>
                    <img
                        src={
                            place.imageUrl ||
                            '/images/defaultImg/defaultImg.jpg'
                        }
                        alt={place.title || 'Loading...'}
                        className='w-full h-full object-cover rounded-xl shadow-md'
                    />
                </div>
                <div className='md:w-1/3 h-[600px] bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border-b-6 border-black border-r-6 border-gray-800'>
                    <div>
                        <h2 className='text-xl font-extrabold text-black text-left text-shadow-sm'>
                            {place.title || 'Loading...'}
                        </h2>
                        <p className='text-gray-500 font-semibold text-left text-shadow-sm'>
                            {place.location}
                        </p>

                        <div className='flex items-center gap-2 mt-2 text-left text-shadow-sm'>
                            {/* <span className='text-yellow-500'>★ ★ ★ ★ ☆</span> */}
                            {/* <span className='text-gray-600'>(4.5)</span> */}
                        </div>
                    </div>
                    <div className='my-8  font-bold text-black flex-1 overflow-auto text-shadow-sm'>
                        <p>{place.description}</p>
                    </div>
                    <div className='flex justify-between items-end mt-4'>
                        <p className='text-black uppercase font-semibold mt-2 text-left text-shadow-sm'>
                            {place.category} | {place.difficulty}
                        </p>
                        <div className='flex items-center gap-2'>
                            {/* <img
                                src='/images/avatars/avatar1.svg'
                                alt='Author Avatar'
                                className='w-12 h-12 rounded-full'
                                /> */}
                            {/* <div className='text-gray-700 text-sm'>
                                <p className='font-semibold'>John Doe</p>
                                <p>Created on: 27 Nov 2025</p>
                                </div> */}
                        </div>
                        <div className='flex gap-2'>
                            <Link to={`/places/${placeId}/edit`}>
                                <button className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className='bg-red-600 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                            >
                                Delete
                            </button>
                            {/* <Link>
                                <button className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                                    Rate
                                </button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <PlaceDelete
                    placeId={placeId}
                    onCancel={cancelDeleteHandler}
                    onConfirm={afterDeleteHandler}
                />
            )}
        </section>
    );
}
