import { useState } from 'react';
import useForm from '../../../../hooks/useForm.js';
import useRequest from '../../../../hooks/useRequest.js';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';
import { ENDPOINT_COMMENTS } from '../../../../config/api.js';

export default function CommentCreate({
    onClose,
    placeId,
    currentUser,
    setComments
}) {
    const [loading, setLoading] = useState(false);
    const { request } = useRequest();

    const createCommentHandler = async values => {
        const text = values.text.trim();

        if (!text) {
            alert('Comment cannot be empty!');
            return;
        }

        if (!currentUser) {
            alert('You must be logged in to post a comment.');
            return;
        }

        const data = {
            placeId,
            userId: currentUser._id,
            text,
            _createdOn: Date.now()
        };

        setLoading(true);

        try {
            const result = await request(ENDPOINT_COMMENTS, 'POST', data);

            if (setComments) {
                setComments(prev => ({ ...prev, [result._id]: result }));
            }

            onClose();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const { register, formAction } = useForm(createCommentHandler, {
        text: ''
    });

    return (
        <div className='absolute inset-0 z-50 flex items-center justify-center'>
            {loading && <LogoSpinner />}
            <div
                className='fixed inset-0 bg-transparent backdrop-blur-[2px]'
                onClick={onClose}
            />
            <form
                action={formAction}
                className='relative z-10 bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border-b-8 border-black border-r-6 border-gray-900 flex flex-col gap-4'
            >
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute top-6 right-6 w-7 h-7 bg-red-600 hover:bg-red-500 text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 transform transition hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-4xl mb-4 font-bold text-center text-[#4A9603] drop-shadow-[3px_3px_1px_black]'>
                    Add Comment
                </h2>

                <textarea
                    {...register('text')}
                    placeholder='Write your comment...'
                    className='w-full p-4 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A9603]'
                    rows={5}
                />

                <button
                    type='submit'
                    disabled={loading}
                    className='self-end bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6 rounded-xl shadow-md border-b-4 border-black border-r-4 transition transform hover:scale-105'
                >
                    {loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
}
