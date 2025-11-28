import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center  text-center text-white p-0 px-4 drop-shadow-[2px_2px_2px_black]'>
            <h1 className='text-[15rem] font-extrabold text-white leading-none drop-shadow-[2px_2px_2px_black]'>
                404
            </h1>

            <h2 className='text-4xl text-center  font-extrabold mb-4'>
                Destination Not Found
            </h2>

            <p className='text-sm md:text-base font-bold mt-0 mb-2'>
                The path you are trying to explore does not exist or has been
                moved.
            </p>
            <p className='text-[#7CFC00] text-sm md:text-base font-bold mt-2 mb-2'>
                To find your way back to familiar paths, follow your Pathfinder.
                {/* Lost on the trail? Let your Pathfinder guide you home. */}
                {/* Return to known routes using your Pathfinder. */}
            </p>

            <Link
                to='/'
                className='flex flex-col items-center group  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
            >
                <img
                    src='/images/logos/logo2.png'
                    alt='Pathfinder Logo'
                    className='w-50 h-50'
                />
            </Link>
        </div>
    );
}
