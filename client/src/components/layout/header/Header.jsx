import { Link } from 'react-router';

export default function Header() {
    return (
        <header className='bg-gray-700 flex justify-between items-center px-6 py-0 border-b-4 border-black'>
            <div className='flex items-center gap-2'>
                <Link
                    to='/'
                    className='flex items-center object-contain '
                >
                    <span className='text-heading self-center text-6xl font-bold whitespace-nowrap '>
                        Pathfinder
                    </span>
                </Link>
            </div>

            <nav className='flex flex-wrap gap-6 font-bold text-black'>
                <Link className='inline-block text-3xl ' to='/catalog'>
                    Locations
                </Link>
                <Link className='inline-block text-3xl ' to='/create'>
                    Add Location
                </Link>
                <Link className='inline-block text-3xl ' to='/profile'>
                    Profile
                </Link>
                <Link className='inline-block text-3xl ' to='/logout'>
                    Logout
                </Link>
                <Link className='inline-block text-3xl ' to='/login'>
                    Login
                </Link>
                <Link className='inline-block text-3xl ' to='/register'>
                    Register
                </Link>
            </nav>
        </header>
    );
}
