export default function CommentCard() {
    return (
        <div className='bg-white rounded-xl shadow-md w-full max-w-md border-b-8 border-black border-r-6 border-gray-900 relative p-6 z-10 pointer-events-auto'>
            <h2 className='text-1xl font-semibold text-black drop-shadow-lg text-center mb-6'>
                Comment...Amazing view and peaceful surroundings. Definitely
                worth visiting! Great for hiking and photography.
            </h2>
            <div className='flex items-center gap-2'>
                <img
                    src='/images/avatars/avatar1.svg'
                    alt='Author Avatar'
                    className='w-12 h-12 rounded-full'
                />
                <div className='text-gray-700 text-sm'>
                    <p className='font-semibold'>John Doe</p>
                    <p>27 Nov 2025</p>
                </div>
                <p className='text-sm mt-4 text-[#4A9603] font-bold text-shadow-sm'>
                    Likes→10
                </p>
            </div>
            <div className='relative flex-1'>
                <div className='absolute bottom-0 right-0 flex gap-2'>
                    <button className='bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-yellow-400 transform transition-transform duration-300 hover:scale-105'>
                        Like
                    </button>
                    <button className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                        Edit
                    </button>
                    <button className='py-2 px-2 rounded-xl border-b-4 border-black border-r-4 font-bold text-black transform transition-transform duration-300 hover:scale-105 bg-red-600 hover:bg-red-500'>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
