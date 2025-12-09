import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useUserContext } from '../../../contexts/UserContext.jsx';
import useRequest from '../../../hooks/useRequest.js';
import CommentList from '../comments/comments-list/CommentList.jsx';
import PlaceDelete from '../delete/PlaceDelete.jsx';
import LogoSpinner from '../../ui/spinner/LogoSpinner.jsx';
import LikeButton from '../../ui/buttons/LikeButton.jsx';
import { ENDPOINT_PLACES, ENDPOINT_PROFILES } from '../../../config/api.js';

export default function PlaceDetails() {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useUserContext();

    const { data: place } = useRequest(`${ENDPOINT_PLACES}${placeId}`, {});
    const { data: author } = useRequest(
        place._ownerId ? `${ENDPOINT_PROFILES}${place._ownerId}` : null,
        { username: 'Unknown', avatar: 'avatar1' }
    );

    const [showComments, setShowComments] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!place._id) return <LogoSpinner />;

    const isAuthor = isAuthenticated && user._id === place._ownerId;

    const formattedDate = new Date(place._createdOn).toLocaleDateString();
    const avatarSrc = `/images/avatars/${author?.avatar || 'avatar1'}.svg`;

    const cancelDeleteHandler = () => setShowDeleteModal(false);
    const afterDeleteHandler = () => {
        setShowDeleteModal(false);
        navigate('/');
    };

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col items-center'>
            <div className='text-white text-center font-bold drop-shadow-[5px_5px_2px_black] mb-6'>
                <h2 className='text-4xl mb-2'>{place.title}</h2>
                <p className='text-lg'>{place.location}</p>
            </div>

            <div className='flex flex-col md:flex-row w-full max-w-7xl gap-6'>
                <div className='md:flex-[2_2_0%] h-[600px] rounded-xl border-b-6 border-black border-r-6 border-gray-800'>
                    <img
                        src={
                            place.imageUrl ||
                            '/images/defaultImg/defaultImg.jpg'
                        }
                        alt={place.title}
                        className='w-full h-full object-cover rounded-xl shadow-md'
                    />
                </div>

                <div className='md:w-1/3 h-[600px] bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-xl shadow-lg p-6 flex flex-col justify-between border-b-6 border-black border-r-6 border-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-extrabold text-black'>
                            {place.title}
                        </h2>
                        <p className='text-black uppercase font-semibold'>
                            {place.category} | {place.difficulty}
                        </p>
                    </div>

                    <div className='my-8 font-bold text-black flex-1 overflow-auto'>
                        <p>{place.description}</p>
                    </div>

                    <div className='flex justify-between items-end mt-4'>
                        {author && (
                            <div className='flex items-center gap-2'>
                                <img
                                    src={avatarSrc}
                                    alt={author.username}
                                    className='w-12 h-12 rounded-full'
                                />
                                <div className='text-gray-700 text-sm'>
                                    <p className='text-sm text-gray-600 mt-1'>
                                        <span className='font-semibold'>
                                            {formattedDate}
                                        </span>
                                    </p>
                                    <p className='font-semibold'>
                                        {author.username}
                                    </p>
                                </div>
                            </div>
                        )}

                        <LikeButton
                            itemObject={place}
                            currentUser={user}
                            authorId={place._ownerId}
                        />
                    </div>

                    <div className='flex gap-2 mt-auto'>
                        <button
                            onClick={() => setShowComments(true)}
                            className='bg-blue-500 text-black font-bold py-2 px-2 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-blue-400'
                        >
                            Comments
                        </button>

                        {showComments && (
                            <CommentList
                                placeId={placeId}
                                onClose={() => setShowComments(false)}
                            />
                        )}

                        {isAuthor && (
                            <>
                                <Link to={`/places/${placeId}/edit`}>
                                    <button className='bg-[#4A9603] text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00]'>
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className='bg-red-600 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500'
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <PlaceDelete
                    placeId={placeId}
                    placeTitle={place.title}
                    onCancel={cancelDeleteHandler}
                    onConfirm={afterDeleteHandler}
                />
            )}
        </section>
    );
}
