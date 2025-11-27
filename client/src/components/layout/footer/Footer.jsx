export default function Footer() {
    return (
        <footer className='bg-black px-0 py-0 border-t-2 border-black'>
            <div class='px-4 py-2 bg-neutral-secondary-soft md:flex md:items-center md:justify-between'>
                <div class='mb-6 md:mb-0'>
                    <a
                        to='https://softuni.bg/opencourses/react-js'
                        class='text-sm text-white text-body sm:text-center '
                    >
                        &copy; SoftUni-React Course-Final Project
                        2025-Pathfinder &trade;
                    </a>
                </div>
            </div>
        </footer>
    );
}
