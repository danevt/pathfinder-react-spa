import { Link, useNavigate } from 'react-router';
import { PLACES_API } from '../../../config/api.js';

export default function PlaceCreate() {
    const navigate = useNavigate();

    const addPlaceHandler = async e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        data._createdOn = Date.now();

        try {
            const response = await fetch(PLACES_API, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            });

            //TODO  Re-enable proper error handling when switching to the real server
            // if (!response.ok) {
            //     const errorData = await response.json().catch(() => ({}));
            //     throw new Error(errorData.message || 'Failed to create place!');
            // }

            const result = await response.json();
            console.log(result);

            navigate('/catalog');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black px-6 py-12 flex justify-center items-center'>
            <form
                id='add-new-place'
                onSubmit={addPlaceHandler}
                className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 border-b-6 border-black border-r-6 border-gray-800'
            >
                <h2 className='text-4xl font-bold text-center text-black drop-shadow-[1px_1px_1px_black]'>
                    Add New Place
                </h2>

                <div>
                    <label
                        htmlFor='title'
                        className='block text-black font-bold mb-2 text-shadow-sm pl-2'
                    >
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        required
                        placeholder='Enter place title...'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='imageUrl'
                        className='block text-black font-bold mb-2 text-shadow-sm pl-2'
                    >
                        Image URL
                    </label>
                    <input
                        type='text'
                        id='imageUrl'
                        name='imageUrl'
                        required
                        placeholder='https://example.com/image.jpg'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='block text-black font-bold mb-2 text-shadow-sm pl-2'
                    >
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        required
                        placeholder='Describe the place...'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor='location'
                        className='block text-black font-bold mb-2 text-shadow-sm pl-2'
                    >
                        Location
                    </label>
                    <input
                        type='text'
                        id='location'
                        name='location'
                        required
                        placeholder='City'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <label
                        htmlFor='category'
                        className='block text-black font-bold mb-2 text-shadow-sm pl-2'
                    >
                        Category
                    </label>
                    <select
                        id='category'
                        name='category'
                        required
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    >
                        <option value=''>Select category</option>
                        <option value='mountain'>Mountain</option>
                        <option value='beach'>Beach</option>
                        <option value='monastery'>Monastery</option>
                        <option value='lake'>Lake</option>
                        <option value='park'>Park</option>
                        <option value='river'>River</option>
                        <option value='museum'>Museum</option>
                    </select>
                </div>
                <div>
                    <span className='block text-black font-bold mb-2 text-shadow-sm pl-2'>
                        Difficulty
                    </span>
                    <div className='flex gap-4 font-bold text-shadow-sm pl-4'>
                        <label className='text-green-600'>
                            <input
                                type='radio'
                                id='difficulty-easy'
                                name='difficulty'
                                value='easy'
                                required
                                className='mr-1'
                            />
                            Easy
                        </label>
                        <label className='text-yellow-500'>
                            <input
                                type='radio'
                                id='difficulty-medium'
                                name='difficulty'
                                value='medium'
                                required
                                className='mr-1'
                            />
                            Medium
                        </label>
                        <label className='text-red-600'>
                            <input
                                type='radio'
                                id='difficulty-hard'
                                name='difficulty'
                                value='hard'
                                required
                                className='mr-1'
                            />
                            Hard
                        </label>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full bg-[#4A9603] text-black font-bold py-2 hover:bg-[#5ECF00] rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 transform transition-transform duration-300 hover:scale-105'
                >
                    Add Place
                </button>

                <p className='text-sm text-center mt-4 text-black font-semibold'>
                    <Link
                        to='/'
                        className='text-[#4A9603] font-bold hover:text-[#5ECF00] transition text-shadow-sm'
                    >
                        Back to Home
                    </Link>
                </p>
            </form>
        </section>
    );
}
