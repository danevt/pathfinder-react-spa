import { Link } from 'react-router';

export default function Header() {
    return (
        <header className='bg-gradient-to-r from-[#438004] via-[#7CFC00] to-[#4A9603] flex justify-between items-center px-6 py-0 border-b-4 border-black'>
            <div className='flex items-center gap-2'>
                <Link
                    to='/'
                    className='flex items-center object-contain drop-shadow-[2px_2px_2px_black] hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                >
                    <img
                        src='./images/logo.png'
                        className='h-20 w-20 sm:h-10 sm:w-10 md:h-20 md:w-20 me-2'
                        alt='Pathfinder Logo'
                    />
                    <span className='text-heading self-center text-6xl font-bold whitespace-nowrap '>
                        Pathfinder
                    </span>
                </Link>
            </div>

            <nav className='flex flex-wrap gap-6 font-bold text-black'>
                <Link
                    className='inline-block text-3xl drop-shadow-[1px_1px_1px_black] hover:text-black  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                    to='/catalog'
                >
                    Locations
                </Link>
                <Link
                    className='inline-block text-3xl drop-shadow-[1px_1px_1px_black] hover:text-black  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                    to='/create'
                >
                    Add Location
                </Link>
                <Link
                    className='inline-block text-3xl drop-shadow-[1px_1px_1px_black] hover:text-black  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                    to='/profile'
                >
                    Profile
                </Link>
                <Link
                    className='inline-block text-3xl drop-shadow-[1px_1px_1px_black] hover:text-black  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                    to='/logout'
                >
                    Logout
                </Link>
                <Link
                    className='inline-block text-3xl drop-shadow-[1px_1px_1px_black] hover:text-black  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                    to='/login'
                >
                    Login
                </Link>
                <Link
                    className='inline-block text-3xl drop-shadow-[1px_1px_1px_black] hover:text-black  hover:drop-shadow-[3px_3px_3px_#7CFC00] transform transition-transform duration-300 hover:scale-110'
                    to='/register'
                >
                    Register
                </Link>
            </nav>
        </header>
    );
}
