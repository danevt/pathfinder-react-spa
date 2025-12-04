import { Link } from 'react-router';

export default function ProfileDetails() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col items-center min-h-screen'>
            <div className='text-white text-center font-bold drop-shadow-[5px_5px_2px_black] mb-6'>
                <h2 className='text-5xl font-bold'>User Profile</h2>
            </div>
            <div className='flex w-full max-w-7xl gap-6 mb-6'>
                <div className='w-1/3 h-[220px] bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-xl shadow-lg p-4 border-b-6 border-black border-r-6 border-gray-800'></div>
                <div className='flex-1 h-[220px] bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-xl shadow-lg p-4 border-b-6 border-black border-r-6 border-gray-800 overflow-x-auto whitespace-nowrap'></div>
            </div>
            <div className='w-full max-w-7xl h-[440px] bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-xl shadow-lg p-4 border-b-6 border-black border-r-6 border-gray-800 overflow-x-auto whitespace-nowrap'></div>
            <div className='flex gap-4 mt-6'>
                <button className='bg-[#4A9603] text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                    Edit
                </button>
                <button className='bg-red-600 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'>
                    Delete
                </button>
                <Link to='/'>
                    <button className='bg-blue-500 text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-blue-400 transform transition-transform duration-300 hover:scale-105'>
                        Home
                    </button>
                </Link>
            </div>
        </section>
    );
}
