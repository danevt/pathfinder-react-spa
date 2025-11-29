import { Link } from 'react-router';

export default function Register() {
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black px-6 py-12 flex justify-center items-center'>
            <form className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 border-b-6 border-black border-r-6 border-gray-800'>
                <h2 className='text-4xl font-bold text-center text-black drop-shadow-[1px_1px_1px_black]'>
                    Register
                </h2>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        required
                        placeholder='example@mail.com'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm'>
                        Username
                    </label>
                    <input
                        type='text'
                        required
                        placeholder='John Doe'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm'>
                        Password
                    </label>
                    <input
                        type='password'
                        required
                        placeholder='********'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm'>
                        Repeat Password
                    </label>
                    <input
                        type='password'
                        required
                        placeholder='********'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>

                <div>
                    <span className='block text-black font-bold mb-2 text-shadow-sm'>
                        Gender
                    </span>
                    <div className='flex gap-4 font-bold text-shadow-sm'>
                        <label>
                            <input
                                type='radio'
                                name='gender'
                                value='male'
                                required
                            />{' '}
                            Male
                        </label>
                        <label>
                            <input type='radio' name='gender' value='female' />{' '}
                            Female
                        </label>
                        <label>
                            <input type='radio' name='gender' value='other' />{' '}
                            Other
                        </label>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full bg-[#4A9603] text-black font-bold py-2 hover:bg-[#5ECF00] rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 
             transform transition-transform duration-300 hover:scale-105'
                >
                    Register
                </button>

                <p className='text-sm text-center mt-4 text-black font-semibold text-shadow-sm'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='text-[#4A9603] font-bold hover:text-[#5ECF00] transition text-shadow-sm'
                    >
                        → Login
                    </Link>
                </p>
            </form>
        </section>
    );
}
