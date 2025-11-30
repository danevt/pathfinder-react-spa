import { PLACES_API } from '../../../config/api.js';

export default function PlaceDelete({
    placeId,
    placeTitle,
    onCancel,
    onConfirm
}) {
    const deletePlaceHandler = async () => {
        try {
            await fetch(`${PLACES_API}${placeId}`, {
                method: 'DELETE'
            });

            //TODO  Re-enable proper error handling when switching to the real server
            // const response = await fetch(`${PLACES_API}invalid-id`, {
            //     method: 'DELETE'
            // });
            // if (!response.ok) {
            //     const errorData = await response.json().catch(() => ({}));
            //     throw new Error(
            //         errorData.message || 'This place does not exist!'
            //     );
            // }

            onConfirm();
        } catch (error) {
            alert(`Unable to delete ${placeTitle}: ${error.message}`);
        }
    };

    return (
        <div className='absolute inset-0  flex items-center justify-center z-50'>
            <div className='fixed inset-0 inset-0   bg-opacity-20 backdrop-blur-[2px]'></div>

            <div className='bg-white rounded-xl shadow-md w-full max-w-md border-b-8 border-black border-r-6 border-gray-900 relative p-6 z-10 pointer-events-auto'>
                <button
                    onClick={onCancel}
                    className='absolute top-3 right-3 w-6 h-6 bg-black text-white font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-red-500  transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-2xl font-bold text-black drop-shadow-lg text-center mb-8'>
                    Are you sure you want to
                    <br />
                    Delete{' '}
                    <span className='text-red-600 drop-shadow-lg'>
                        {placeTitle}
                    </span>{' '}
                    ?
                </h2>

                <div className='flex justify-center gap-12'>
                    <button
                        onClick={deletePlaceHandler}
                        className='bg-red-600 text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
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
