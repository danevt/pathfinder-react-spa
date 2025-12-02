import { useState } from 'react';
import request from '../../../../utils/requester.js';
import { COMMENTS_API } from '../../../../config/api.js';

export default function CommentCreateOverlay({ onClose, placeId, user }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);

        try {
            const newComment = {
                placeId,
                text,
                username: user.username,
                avatar: user.avatar,
                _createdOn: Date.now()
            };

            await request(COMMENTS_API, 'POST', newComment);

            setText('');
            onClose();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='absolute inset-0 z-50 flex items-center justify-center'>
            <div
                className='fixed inset-0 bg-transparent backdrop-blur-[2px] pointer-events-auto'
                onClick={onClose}
            ></div>

            <form
                onSubmit={handleSubmit}
                className='relative z-10 bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border-b-8 border-black border-r-6 border-gray-900 flex flex-col gap-4'
            >
                <button
                    onClick={onClose}
                    className='absolute z-30 top-6 right-6 w-7 h-7 bg-black text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 bg-red-600 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-4xl mb-4 font-bold text-center text-[#4A9603] drop-shadow-[3px_3px_1px_black]'>
                    Add Comment
                </h2>

                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
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
