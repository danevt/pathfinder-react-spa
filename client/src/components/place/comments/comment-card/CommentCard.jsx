import { useState, useEffect } from 'react';
import { useUserContext } from '../../../../contexts/UserContext.jsx';
import useRequest from '../../../../hooks/useRequest.js';
import CommentEdit from '../comment-edit/CommentEdit.jsx';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';
import LikeButton from '../../../ui/buttons/LikeButton.jsx';
import {
    ENDPOINT_COMMENTS,
    ENDPOINT_PROFILES
} from '../../../../config/api.js';

export default function CommentCard({ comment, onUpdate, onDelete }) {
    const { user, isAuthenticated } = useUserContext();
    const { request } = useRequest();
    const [author, setAuthor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const formattedDate = new Date(comment._createdOn).toLocaleDateString();
    const isAuthor = isAuthenticated && user?._id === comment.userId;

    useEffect(() => {
        if (!comment.userId) return;
        request(`${ENDPOINT_PROFILES}${comment.userId}`)
            .then(data => setAuthor(data))
            .catch(() => setAuthor({ username: 'Unknown', avatar: 'avatar1' }));
    }, [comment.userId]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        setIsDeleting(true);

        try {
            await request(`${ENDPOINT_COMMENTS}${comment._id}`, 'DELETE');
            onDelete(comment._id);
        } catch (err) {
            alert(`Unable to delete comment: ${err.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!author) return <LogoSpinner />;

    const avatarSrc = `/images/avatars/${author.avatar}.svg`;

    return (
        <>
            <div className='bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-xl shadow-md w-[420px] h-[180px] border-b-8 border-black border-r-6 border-gray-900 relative p-6 flex flex-col justify-between pointer-events-auto'>
                <div className='flex gap-4'>
                    <div className='flex flex-col items-start'>
                        <div className='flex items-center gap-2'>
                            <img
                                src={avatarSrc}
                                alt={author.username}
                                className='w-12 h-12 rounded-full'
                            />
                            <div className='text-gray-700 text-sm'>
                                <p className='font-semibold'>
                                    {author.username}
                                </p>
                                <p className='text-xs'>{formattedDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 flex items-start justify-start'>
                        <p className='text-black font-semibold drop-shadow-lg break-words'>
                            {comment.text}
                        </p>
                    </div>
                </div>

                <div className='flex justify-center gap-2 mt-2'>
                    <LikeButton
                        itemObject={comment}
                        currentUser={user}
                        authorId={comment.userId}
                    />
                    {isAuthor && (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className='bg-[#4A9603] text-black font-bold py-2 px-2 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] w-[80px]'
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className='bg-red-600 text-black font-bold py-2 px-2 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 w-[80px]'
                            >
                                {isDeleting ? '...' : 'Delete'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isEditing && (
                <CommentEdit
                    comment={comment}
                    onClose={() => setIsEditing(false)}
                    onSave={updated => {
                        onUpdate(updated);
                        setIsEditing(false);
                    }}
                />
            )}
        </>
    );
}
