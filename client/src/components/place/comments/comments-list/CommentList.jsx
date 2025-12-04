import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { COMMENTS_API } from '../../../../config/api.js';
import CommentCard from '../comment-card/CommentCard.jsx';
import request from '../../../../utils/requester.js';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';

export default function CommentList({ onClose, placeId, currentUser }) {
    const [comments, setComments] = useState([]);
    const [sortAsc, setSortAsc] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        request(COMMENTS_API)
            .then(result => {
                const filteredComments = Object.values(result).filter(
                    comment => comment.placeId === placeId
                );
                setComments(filteredComments);
            })
            .catch(error => alert(error.message))
            .finally(() => setLoading(false));
    }, [placeId]);

    const sortedComments = [...comments].sort((a, b) =>
        sortAsc ? a._createdOn - b._createdOn : b._createdOn - a._createdOn
    );

    return (
        <div className='absolute inset-0 z-50 flex items-center justify-center pt-10 md:pt-10 lg:pt-20'>
            <div
                className='fixed inset-0 bg-transparent backdrop-blur-[2px] pointer-events-auto'
                onClick={onClose}
            ></div>

            <div className='relative z-10 bg-gradient-to-r from-gray-700 via-gray-300 to-gray-600 rounded-xl shadow-md w-full max-w-lg p-6 border-b-8 border-black border-r-6 border-gray-900'>
                <button
                    onClick={onClose}
                    className='absolute z-30 top-6 right-6 w-7 h-7 bg-black text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 bg-red-600 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-3xl text-white text-center font-bold drop-shadow-[5px_5px_2px_black] mb-6'>
                    Comments
                </h2>

                <button
                    onClick={() => setSortAsc(state => !state)}
                    className='absolute top-6 right-16 w-7 h-7 bg-[#4A9603] text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'
                >
                    {sortAsc ? '↓' : '↑'}
                </button>

                {loading ? (
                    <LogoSpinner />
                ) : comments.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 mt-20'>
                        <h3 className='text-4xl sm:text-5xl md:text-5xl font-bold text-white p-0 drop-shadow-[5px_5px_2px_black] text-center'>
                            No comments yet!
                        </h3>
                        <p className='text-3xl font-bold text-white text-center drop-shadow-[4px_4px_2px_black] mb-10'>
                            Be the first to{' '}
                            <Link
                                to={`/places/${placeId}/add-comment`}
                                className='text-3xl text-[#4A9603] font-bold hover:text-[#5ECF00] transition'
                            >
                                add a comment
                            </Link>
                        </p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 max-h-[80vh] pr-4 overflow-y-auto pl-4'>
                        {sortedComments.map(comment => (
                            <CommentCard
                                key={comment._id}
                                currentUser={currentUser}
                                comment={comment}
                                onUpdate={updatedComment => {
                                    setComments(previousComments =>
                                        previousComments.map(comment =>
                                            comment._id === updatedComment._id
                                                ? updatedComment
                                                : comment
                                        )
                                    );
                                }}
                                onDelete={deletedCommentId => {
                                    setComments(previousComments =>
                                        previousComments.filter(
                                            comment =>
                                                comment._id !== deletedCommentId
                                        )
                                    );
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
