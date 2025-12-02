import { useEffect, useState } from 'react';
import { COMMENTS_API } from '../../../../config/api.js';
import CommentCard from '../comment-card/CommentCard.jsx';
import request from '../../../../utils/requester.js';

export default function CommentsOverlay({ onClose, placeId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        request(`${COMMENTS_API}`)
            .then(result => {
                const all = Object.values(result);
                const filtred = all.filter(
                    comment => comment.placeId === placeId
                );

                setComments(filtred);
            })
            .catch(error => alert(error.message));
    }, [placeId]);

    return (
        <div className='absolute inset-0 z-50 flex items-center justify-center pt-10 md:pt-10 lg:pt-20'>
            <div
                className='fixed inset-0 bg-transparent backdrop-blur-[2px] pointer-events-auto'
                onClick={onClose}
            ></div>

            <div className='relative z-10 bg-gradient-to-r from-gray-700 via-gray-300 to-gray-600 rounded-xl shadow-md w-full max-w-3xl p-6 border-b-8 border-black border-r-6 border-gray-900'>
                <button
                    onClick={onClose}
                    className='absolute z-30 top-6 right-6 w-8 h-8 bg-black text-white font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-3xl text-white text-center font-bold drop-shadow-[5px_5px_2px_black] mb-6'>
                    Comments
                </h2>

                <div className='grid grid-cols-2 gap-5 max-h-[600px] overflow-y-auto'>
                    {comments.map(comment => (
                        <CommentCard key={comment._id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}
