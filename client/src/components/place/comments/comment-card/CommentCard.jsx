import { useEffect, useState } from 'react';
import { COMMENTS_API, USERS_API } from '../../../../config/api.js';
import request from '../../../../utils/requester.js';
import CommentEditOverlay from '../comment-edit/CommentEditOverlay.jsx';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';

export default function CommentCard({
    comment,
    currentUser,
    onUpdate,
    onDelete
}) {
    const { userId, _createdOn, text, likes } = comment;
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const formattedDate = new Date(_createdOn).toLocaleDateString();

    useEffect(() => {
        request(`${USERS_API}${userId}`)
            .then(data => setUser(data))
            .catch(error => {
                alert(error.message);
                setUser({ username: 'Unknown', avatar: 'avatar1' });
            });
    }, [userId]);

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        request(`${COMMENTS_API}${comment._id}`, 'DELETE')
            .then(() => {
                onDelete(comment._id);
            })
            .catch(error => {
                alert(error.message || 'Failed to delete comment');
            });
    };

    const handleLike = () => {
        if (!currentUser) {
            alert('You need to be logged in like comments!');
            return;
        }

        let updatedLikes;

        if (likes.includes(currentUser._id)) {
            updatedLikes = likes.filter(id => id !== currentUser._id);
        } else {
            updatedLikes = [...likes, currentUser._id];
        }

        request(`${COMMENTS_API}${comment._id}`, 'PATCH', {
            likes: updatedLikes
        })
            .then(() => {
                onUpdate({ ...comment, likes: updatedLikes });
            })
            .catch(error => alert(error.message));
    };

    if (!user) return <LogoSpinner />;

    const { username, avatar } = user;
    const avatarSrc = `/images/avatars/${avatar}.svg`;

    return (
        <>
            <div className='bg-white rounded-xl shadow-md w-full max-w-lg border-b-8 border-black border-r-6 border-gray-900 relative p-8 z-10 pointer-events-auto'>
                <h2 className='text-1xl font-semibold text-black drop-shadow-lg text-center mb-6'>
                    {text}
                </h2>
                <div className='flex items-center gap-2'>
                    <img
                        src={avatarSrc}
                        alt={username}
                        className='w-12 h-12 rounded-full'
                    />
                    <div className='text-gray-700 text-sm'>
                        <p className='font-semibold'>{username}</p>
                        <p>{formattedDate}</p>
                    </div>
                    <p className='text-sm  text-yellow-500 font-bold drop-shadow-[1px_1px_0px_black]'>
                        {likes?.length || 0} Likes
                    </p>
                </div>
                <div className='relative flex-1'>
                    <div className='absolute bottom-0 right-0 flex gap-2'>
                        <button
                            onClick={handleLike}
                            className='bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-yellow-400 transform transition-transform duration-300 hover:scale-105'
                        >
                            Like
                        </button>
                        <button
                            onClick={() => setIsEditing(true)}
                            className='bg-[#4A9603] text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className='py-2 px-2 rounded-xl border-b-4 border-black border-r-4 font-bold text-black transform transition-transform duration-300 hover:scale-105 bg-red-600 hover:bg-red-500'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {isEditing && (
                <CommentEditOverlay
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
