import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import PlaceDelete from '../delete/PlaceDelete.jsx';
import request from '../../../utils/requester.js';
import { ENDPOINT_PLACES, ENDPOINT_PROFILES } from '../../../config/api.js';
import CommentCreateOverlay from '../comments/comment-create/CommentCreateOverlay.jsx';
import CommentList from '../comments/comments-list/CommentList.jsx';
import LogoSpinner from '../../ui/spinner/LogoSpinner.jsx';

export default function PlaceDetails({ currentUser }) {
    const { placeId } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showCreateComments, setShowCreateComments] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [author, setAuthor] = useState(null);
    const [likes, setLikes] = useState([]);
    const formattedDate = new Date(place._createdOn).toLocaleDateString();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const result = await request(`${ENDPOINT_PLACES}${placeId}`);
                setPlace(result);
                setLikes(result.likes);

                if (result._ownerId) {
                    const authorData = await request(
                        `${ENDPOINT_PROFILES}${result._ownerId}`
                    );
                    setAuthor(authorData);
                } else {
                    setAuthor({ username: 'Unknown', avatar: 'avatar1' });
                }
            } catch (error) {
                alert(error.message);
                setAuthor({ username: 'Unknown', avatar: 'avatar1' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [placeId]);

    if (isLoading) return <LogoSpinner />;

    const handlePlaceLike = async () => {
        if (!currentUser) {
            alert('You need to be logged in to like places!');
            return;
        }

        let updatedLikes;

        if (likes.includes(currentUser._id)) {
            updatedLikes = likes.filter(id => id !== currentUser._id);
        } else {
            updatedLikes = [...likes, currentUser._id];
        }

        try {
            await request(`${ENDPOINT_PLACES}${placeId}`, 'PATCH', {
                likes: updatedLikes
            });
            setLikes(updatedLikes);
        } catch (error) {
            alert(error.message);
        }
    };

    const cancelDeleteHandler = () => {
        setShowDeleteModal(false);
    };

    const afterDeleteHandler = () => {
        setShowDeleteModal(false);
        navigate('/');
    };

    const avatarSrc = `/images/avatars/${author?.avatar || 'avatar1'}.svg`;

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6  flex flex-col items-center'>
            <div className='text-white text-center font-bold drop-shadow-[5px_5px_2px_black] mb-6'>
                <h2 className='text-4xl font-bold mb-2'>
                    Explore this Destination
                </h2>
                <p className='text-lg'>
                    Discover the highlights and details of this amazing place.
                </p>
            </div>

            <div className='flex flex-col md:flex-row w-full max-w-7xl gap-6 '>
                <div className='md:flex-[2_2_0%] h-[600px] rounded-xl  border-b-6 border-black border-r-6 border-gray-800'>
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
                        <h2 className='text-xl font-extrabold text-black text-left text-shadow-sm'>
                            {place.title}
                        </h2>

                        <p className='text-black uppercase font-semibold mt-2 text-right text-shadow-sm'>
                            {place.category} | {place.difficulty}
                        </p>
                    </div>
                    <p className='text-gray-500 font-semibold text-left text-shadow-sm'>
                        {place.location}
                    </p>
                    <div className='my-8  font-bold text-black flex-1 overflow-auto text-shadow-sm'>
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
                        <p className='text-yellow-500 font-bold text-sm drop-shadow-[1px_1px_0px_black] mr-4'>
                            {likes.length} Likes
                        </p>
                    </div>
                    <div className='flex justify-between items-end mt-4'>
                        <div className='flex gap-2 mt-auto'>
                            <button
                                onClick={handlePlaceLike}
                                className='bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-yellow-400 transform transition-transform duration-300 hover:scale-105'
                            >
                                Like
                            </button>
                            <button
                                onClick={() => setShowCreateComments(true)}
                                className='bg-blue-500 text-black font-bold py-2 px-2 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-blue-400 transform transition-transform duration-300 hover:scale-105'
                            >
                                +Add
                            </button>
                            {showCreateComments && (
                                <CommentCreateOverlay
                                    placeId={placeId}
                                    currentUser={currentUser}
                                    onClose={() => setShowCreateComments(false)}
                                />
                            )}

                            <button
                                onClick={() => setShowComments(true)}
                                className='bg-blue-500 text-black font-bold py-2 px-2 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-blue-400 transform transition-transform duration-300 hover:scale-105'
                            >
                                Comments
                            </button>
                            {showComments && (
                                <CommentList
                                    currentUser={currentUser}
                                    onClose={() => setShowComments(false)}
                                    placeId={placeId}
                                />
                            )}
                            <Link to={`/places/${placeId}/edit`}>
                                <button className='bg-[#4A9603] text-black font-bold py-2 px-6 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-[#5ECF00] transform transition-transform duration-300 hover:scale-105'>
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className='bg-red-600 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                            >
                                Delete
                            </button>
                        </div>
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
