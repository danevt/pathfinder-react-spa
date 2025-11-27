export default function PlaceDetails() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 min-h-screen flex flex-col items-center'>
            <div className='text-white text-center font-bold drop-shadow-[2px_2px_2px_black] mb-6'>
                <h2 className='text-4xl font-bold mb-2'>
                    Explore this Destination
                </h2>
                <p className='text-lg'>
                    Discover the highlights and details of this amazing place.
                </p>
            </div>

            <div className='flex flex-col md:flex-row w-full max-w-7xl gap-6'>
                <div className='md:flex-[2_2_0%] h-[600px]'>
                    <img
                        src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.vigYuyIr0o4IHBxqVFI4zgHaEK%3Fpid%3DApi&f=1&ipt=5b40d13c04ae1c5820329d73157cd0cf2b1b450b363fc1fa32ed00d754cf1e1f&ipo=images'
                        alt='Vitosha Mountain'
                        className='w-full h-full object-cover rounded-xl shadow-md'
                    />
                </div>
                <div className='md:w-1/3 h-[600px] bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border-b-6 border-black border-r-6 border-gray-900'>
                    <div>
                        <h2 className='text-xl font-extrabold text-black text-left'>
                            Vitosha Mountain
                        </h2>
                        <p className='text-gray-700 font-semibold text-left'>
                            Sofia, Bulgaria
                        </p>
                        <p className='text-gray-800 uppercase font-semibold mt-2 text-left'>
                            Mountain | Easy
                        </p>

                        <div className='flex items-center gap-2 mt-2 text-left'>
                            <span className='text-yellow-500'>★ ★ ★ ★ ☆</span>
                            <span className='text-gray-600'>(4.5)</span>
                        </div>
                    </div>

                    <div className='my-4 text-gray-700 flex-1 overflow-auto'>
                        <p>
                            Vitosha is a dome-shaped mountain massif on the
                            outskirts of Sofia, Bulgaria, rising to 2,292 m at
                            Cherni Vrah. It is one of the city's main symbols,
                            easily accessible by public transport, and popular
                            for hiking, skiing, and outdoor recreation.
                        </p>
                    </div>

                    <div className='flex justify-between items-end mt-4'>
                        <div className='flex items-center gap-2'>
                            <img
                                src='/images/avatars/avatar1.svg'
                                alt='Author Avatar'
                                className='w-12 h-12 rounded-full'
                            />
                            <div className='text-gray-700 text-sm'>
                                <p className='font-semibold'>John Doe</p>
                                <p>Created on: 27 Nov 2025</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <button className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                                Edit
                            </button>
                            <button className='bg-red-600 text-white font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'>
                                Delete
                            </button>
                            <button className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                                Rate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
