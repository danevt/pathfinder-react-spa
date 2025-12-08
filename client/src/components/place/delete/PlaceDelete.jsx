import { useState } from 'react';
import { ENDPOINT_PLACES } from '../../../config/api.js';
import request from '../../../utils/requester.js';

export default function PlaceDelete({
    placeId,
    placeTitle,
    onCancel,
    onConfirm
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deletePlaceHandler = async () => {
        setIsDeleting(true);

        try {
            await request(`${ENDPOINT_PLACES}${placeId}`, 'DELETE');

            onConfirm();
        } catch (error) {
            alert(`Unable to delete ${placeTitle}: ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className='absolute inset-0  flex items-center justify-center z-50'>
            <div className='fixed inset-0 bg-opacity-20 backdrop-blur-[2px]'></div>

            <div className='bg-white rounded-xl shadow-md w-full max-w-md border-b-8 border-black border-r-6 border-gray-900 relative p-6 z-10 pointer-events-auto'>
                <button
                    onClick={onCancel}
                    className='absolute z-30 top-4 right-6 w-7 h-7 bg-black text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 bg-red-600 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-2xl font-bold text-black  text-center mb-8 drop-shadow-[1px_1px_0px_black]'>
                    Are you sure you want to
                    <br />
                    Delete{' '}
                    <span className='text-yellow-500 drop-shadow-lg'>
                        {placeTitle}
                    </span>{' '}
                    ?
                </h2>
                <div className='flex justify-center gap-12'>
                    <button
                        onClick={deletePlaceHandler}
                        disabled={isDeleting}
                        className={`py-2 px-6 rounded-xl border-b-4 border-black border-r-4 font-bold text-black transform transition-transform duration-300 hover:scale-105 ${
                            isDeleting
                                ? 'bg-gray-400 cursor-not-allowed hover:scale-100'
                                : 'bg-red-600 hover:bg-red-500'
                        }`}
                    >
                        Delete
                    </button>

                    <button
                        onClick={onCancel}
                        className='bg-[#4A9603] text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
