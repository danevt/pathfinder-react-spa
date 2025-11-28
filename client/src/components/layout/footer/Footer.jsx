import { Link } from 'react-router';
import GithubIcon from '../../ui/icons/GithubIcon.jsx';

export default function Footer() {
    return (
        <footer className='bg-[#438004] border-t-2 border-black p-0'>
            <div className='px-4 py-2 bg-neutral-secondary-soft flex items-center justify-between'>
                <div className='flex-1'></div>
                <div className='flex-1 text-center'>
                    <Link
                        to='https://softuni.bg/opencourses/react-js'
                        className='text-sm text-body font-semibold hover:drop-shadow-[3px_3px_3px_#7CFC00]'
                    >
                        &copy; SoftUni React Course Final Project 2025
                        Pathfinder &trade;
                    </Link>
                </div>
                <div className='flex space-x-5 flex-1 justify-end font-bold'>
                    <Link
                        to='/about'
                        className='hover:drop-shadow-[3px_3px_3px_#7CFC00]'
                    >
                        About
                    </Link>
                    <Link
                        to='https://github.com/danevt'
                        className='hover:drop-shadow-[3px_3px_3px_#7CFC00]'
                    >
                        <GithubIcon />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
