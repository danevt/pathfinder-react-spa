export default function PlaceCard() {
    return (
        <div className='bg-white  rounded-xl shadow-md overflow-hidden border-b-6 border-black border-r-6 border-gray-900 transform transition-transform duration-300 hover:scale-105'>
            <img
                src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.vigYuyIr0o4IHBxqVFI4zgHaEK%3Fpid%3DApi&f=1&ipt=5b40d13c04ae1c5820329d73157cd0cf2b1b450b363fc1fa32ed00d754cf1e1f&ipo=images'
                alt='Interesting place'
                className='w-full h-64 object-cover'
            />

            <div className='p-4'>
                <h3 className='text-xl font-bold mb-2 text-black'>Vitosha</h3>
                <p className='text-gray-700 mb-4'>
                    Vitosha is a dome-shaped mountain massif on the outskirts of
                    Sofia, Bulgaria, rising to 2,292 m at Cherni Vrah. It is one
                    of the city's main symbols, easily accessible by public
                    transport, and popular for hiking, skiing, and outdoor
                    recreation.
                </p>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <span className='text-yellow-500'>★ ★ ★ ★ ☆</span>
                        <span className='text-sm text-gray-600'>(4.0)</span>
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
