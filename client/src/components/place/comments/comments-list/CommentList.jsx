import { useState } from 'react';
import { ENDPOINT_COMMENTS } from '../../../../config/api.js';
import useRequest from '../../../../hooks/useRequest.js';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';
import CommentCard from '../comment-card/CommentCard.jsx';
import CommentCreate from '../comment-create/CommentCreate.jsx';

export default function CommentList({ onClose, placeId }) {
    const {
        data: commentsData,
        setData,
        loading
    } = useRequest(ENDPOINT_COMMENTS, {});

    const [sortAsc, setSortAsc] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    if (loading) return <LogoSpinner />;

    const comments = Object.values(commentsData).filter(
        c => c.placeId === placeId
    );

    const sortedComments = [...comments].sort((a, b) =>
        sortAsc ? a._createdOn - b._createdOn : b._createdOn - a._createdOn
    );

    return (
        <div className='absolute inset-0 z-50 flex items-center justify-center pt-10 md:pt-10 lg:pt-20'>
            <div
                className='fixed inset-0 bg-transparent backdrop-blur-[2px] pointer-events-auto'
                onClick={onClose}
            />

            <div className='relative z-10 bg-gradient-to-r from-gray-700 via-gray-300 to-gray-600 rounded-xl shadow-md w-full max-w-lg p-6 border-b-8 border-black border-r-6 border-gray-900'>
                <h2 className='text-3xl text-white text-center font-bold drop-shadow-[5px_5px_2px_black] mb-6'>
                    Comments
                </h2>

                <button
                    onClick={() => setShowOverlay(true)}
                    className='absolute z-30 top-6 right-26 w-7 h-7 bg-blue-500 text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-blue-400 transition'
                >
                    +
                </button>

                <button
                    onClick={() => setSortAsc(s => !s)}
                    className='absolute z-30 top-6 right-16 w-7 h-7 bg-[#4A9603] text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-[#5ECF00] transition'
                >
                    {sortAsc ? '↓' : '↑'}
                </button>

                <button
                    onClick={onClose}
                    className='absolute z-30 top-6 right-6 w-7 h-7 bg-red-600 text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 hover:bg-red-500 transition'
                >
                    X
                </button>

                {comments.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 mt-20'>
                        <h3 className='text-4xl font-bold text-white drop-shadow-[5px_5px_2px_black] text-center'>
                            No comments yet!
                        </h3>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 max-h-[80vh] pr-4 overflow-y-auto pl-4'>
                        {sortedComments.map(comment => (
                            <CommentCard
                                key={comment._id}
                                comment={comment}
                                onUpdate={updated =>
                                    setData(prev => ({
                                        ...prev,
                                        [updated._id]: updated
                                    }))
                                }
                                onDelete={deletedId =>
                                    setData(prev => {
                                        const copy = { ...prev };
                                        delete copy[deletedId];
                                        return copy;
                                    })
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {showOverlay && (
                <CommentCreate
                    onClose={() => setShowOverlay(false)}
                    placeId={placeId}
                    setComments={setData}
                />
            )}
        </div>
    );
}
