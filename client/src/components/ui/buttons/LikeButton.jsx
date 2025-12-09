import useLike from '../../../hooks/useLike.js';

export default function LikeButton({ itemObject, currentUser, authorId }) {
    const [likes, toggleLike] = useLike(itemObject, currentUser?._id);

    const isAuthor = currentUser?._id === authorId;
    const isGuest = !currentUser;
    const hasLiked = currentUser && likes.includes(currentUser._id);

    const emptyHeart = '♡';
    const fullHeart = '♥';
    const rightIcon =
        !isAuthor && !isGuest ? (hasLiked ? fullHeart : emptyHeart) : '';

    return (
        <button
            onClick={toggleLike}
            disabled={isAuthor || isGuest}
            className='bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900
                       hover:bg-yellow-400 transform transition-transform duration-300 hover:scale-105 flex items-center justify-between gap-2'
        >
            <span>{likes.length}</span>
            <span>Likes</span>
            <span
                style={{
                    fontSize: '20px',
                    color: hasLiked ? 'red' : '#ff66cc'
                }}
            >
                {rightIcon}
            </span>
        </button>
    );
}
