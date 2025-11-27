export default function PlaceCard() {
    return (
        <div className='bg-white rounded-xl shadow-md overflow-hidden border-b-6 border-black border-r-6 border-gray-900 transform transition-transform duration-300 hover:scale-105'>
            <img
                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.vigYuyIr0o4IHBxqVFI4zgHaEK%3Fpid%3DApi&f=1&ipt=5b40d13c04ae1c5820329d73157cd0cf2b1b450b363fc1fa32ed00d754cf1e1f&ipo=images'
                alt='Vitosha Mountain'
                className='w-full h-64 object-cover'
            />
            <div className='p-4 flex flex-col justify-between h-36'>
                <div className='flex justify-between items-start mb-4'>
                    <div className='text-left'>
                        <h3 className='text-xl font-extrabold text-black'>
                            Vitosha Mountain
                        </h3>
                        <p className='text-sm text-gray-600'>Sofia, Bulgaria</p>
                    </div>
                    <div className='text-right'>
                        <span className='text-sm font-semibold text-gray-800 uppercase'>
                            Mountain | Easy
                        </span>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <span className='text-yellow-500'>★ ★ ★ ★ ☆</span>
                        <span className='text-sm text-gray-600'>(4.5)</span>
                    </div>
                    <button
                        className='bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6
                        rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900
                        transform transition-transform duration-300 hover:scale-105'
                    >
                        Explore
                    </button>
                </div>
            </div>
        </div>
    );
}
