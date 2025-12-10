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
                <h2 className='text-3xl mb-1'>
                    {' '}
                    Explore the details of this destination
                </h2>
                <p className='text-3xl'>BULGARIA</p>
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
                    <div>
                        <h2 className='text-2xl font-extrabold text-black'>
                            {place.title}
                        </h2>
                        <p className='text-gray-700 font-semibold  mt-1 transform translate-x-2'>
                            {place.location}
                        </p>
                    </div>

                    <div className='flex-1 mt-8 mb-4 overflow-auto'>
                        <p className='text-center break-words whitespace-pre-wrap'>
                            {place.description}
                        </p>
                    </div>

                    <div className='flex flex-col mt-auto'>
                        <div className='flex justify-between items-end mb-2'>
                            {author && (
                                <div className='flex items-center gap-2'>
                                    <img
                                        src={avatarSrc}
                                        alt={author.username}
                                        className='w-12 h-12 rounded-full'
                                    />
                                    <div className='text-gray-900 text-sm'>
                                        <p className='font-semibold'>
                                            {author.username}
                                        </p>
                                        <p className='text-gray-900 text-xs'>
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <p className='text-black uppercase font-semibold mt-1 mb-2'>
                                {place.category} | {place.difficulty}
                            </p>
                        </div>

                        <div className='flex justify-center gap-2 mt-2 flex-wrap'>
                            <LikeButton
                                itemObject={place}
                                currentUser={user}
                                authorId={place._ownerId}
                            />

                            <button
                                onClick={() => setShowComments(true)}
                                className='bg-blue-500 text-black font-bold py-2 px-3 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-blue-400'
                            >
                                Comments
                            </button>

                            {isAuthor && (
                                <>
                                    <Link to={`/places/${placeId}/edit`}>
                                        <button className='bg-[#4A9603] text-black font-bold py-2 px-3 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00]'>
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className='bg-red-600 text-black font-bold py-2 px-2 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500'
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showComments && (
                <CommentList
                    placeId={placeId}
                    onClose={() => setShowComments(false)}
                />
            )}

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
