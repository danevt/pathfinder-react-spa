export default function PlaceDelete({ placeId, onCancel, onConfirm }) {
    const deletePlaceHandler = () => {
        fetch(`http://localhost:3030/jsonstore/blog/places/${placeId}`, {
            method: 'DELETE'
        })
            .then(() => onConfirm())
            .catch(error => alert(error.message));
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center z-50 pointer-events-none'>
            <div className='bg-white rounded-xl shadow-md w-full max-w-md border-b-8 border-black border-r-6 border-gray-900 pointer-events-auto relative p-6'>
                <button
                    onClick={onCancel}
                    className='absolute top-3 right-3 w-6 h-6 bg-red-600 text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-2xl font-bold text-black drop-shadow-lg text-center mb-8'>
                    Are you sure you want to
                    <br />
                    delete this destination?
                </h2>

                <div className='flex justify-center gap-4'>
                    <button
                        onClick={deletePlaceHandler}
                        className='bg-red-600 text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                    >
                        Delete
                    </button>
                    <button
                        onClick={onCancel}
                        className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
