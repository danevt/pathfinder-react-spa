import { useState } from 'react';
import { COMMENTS_API } from '../../../../config/api.js';
import request from '../../../../utils/requester.js';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';

export default function CommentEditOverlay({ comment, onClose, onSave }) {
    const [text, setText] = useState(comment.text);
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);

        const updatedComment = {
            ...comment,
            text
        };

        request(`${COMMENTS_API}${comment._id}`, 'PUT', updatedComment)
            .then(() => {
                onSave(updatedComment);
                onClose();
            })
            .catch(err => {
                alert(err.message || 'Failed to update comment');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='absolute inset-0 z-50 flex items-center justify-center'>
            {loading && <LogoSpinner />}
            <div
                className='fixed inset-0 bg-black/10 backdrop-blur-[2px]'
                onClick={onClose}
            ></div>
            <form
                onSubmit={handleSubmit}
                className='relative z-10 bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border-b-8 border-black border-r-6 border-gray-900 flex flex-col gap-4'
            >
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute z-30 top-6 right-6 w-7 h-7 bg-red-600 text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-red-500 transition hover:scale-105'
                >
                    X
                </button>
                <h2 className='text-4xl mb-4 font-bold text-center text-[#4A9603] drop-shadow-[3px_3px_1px_black]'>
                    Edit Comment
                </h2>
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='Edit your comment...'
                    className='w-full p-4 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A9603]'
                    rows={5}
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='self-end bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-6 rounded-xl shadow-md border-b-4 border-black border-r-4 transition transform hover:scale-105'
                >
                    Save
                </button>
            </form>
        </div>
    );
}
