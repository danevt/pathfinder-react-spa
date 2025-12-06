import { Link, useNavigate } from 'react-router';

export default function Register({ onRegister }) {
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            return alert('Passwords do not match.');
        }

        try {
            onRegister({
                email,
                password
            });

            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black px-6 py-12 flex justify-center items-center'>
            <form
                id='register'
                onSubmit={submitHandler}
                className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 border-b-6 border-black border-r-6 border-gray-800'
            >
                <h2 className='text-4xl font-bold text-center text-[#4A9603] drop-shadow-[3px_3px_1px_black]'>
                    Register
                </h2>
                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        required
                        pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                        placeholder='example@mail.com'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>
                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        required
                        minlength='8'
                        maxlength='20'
                        pattern='[A-Za-z0-9!@#$%^&*()_+=-]+'
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
                        id='confirmPassword'
                        name='confirmPassword'
                        required
                        placeholder='********'
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-[#4A9603] text-black font-bold py-2 hover:bg-[#5ECF00] rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 
             transform transition-transform duration-300 hover:scale-105'
                >
                    Register
                </button>
                <p className='text-sm text-center mt-4 text-black font-semibold drop-shadow-[1px_1px_0px_black]'>
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
