import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    ENDPOINT_COMMENTS,
    ENDPOINT_PLACES,
    ENDPOINT_PROFILES
} from '../../../config/api.js';
import LogoSpinner from '../../ui/spinner/LogoSpinner.jsx';
import CommentCard from '../../place/comments/comment-card/CommentCard.jsx';
import Pagination from '../../ui/pagination/Pagination.jsx';
import ProfileSettingsOverlay from '../profile-settings/ProfileSettingsOverlay.jsx';
import ProfileCard from '../../profile/profile-card/ProfileCard.jsx';
import PlaceCard from '../../place/card/PlaceCard.jsx';
import useRequest from '../../../hooks/useRequest.js';

export default function ProfileDetails() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const { data: placesData, loading: loadingPlaces } = useRequest(
        ENDPOINT_PLACES,
        {}
    );
    const {
        data: commentsData,
        setData: setCommentsData,
        loading: loadingComments
    } = useRequest(ENDPOINT_COMMENTS, {});
    const { data: usersData, loading: loadingUsers } = useRequest(
        ENDPOINT_PROFILES,
        {}
    );

    const [user, setUser] = useState(null);
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [currentPlacePage, setCurrentPlacePage] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const itemsPerPage = 2;

    useEffect(() => {
        if (!usersData) return;
        const usersArray = Object.values(usersData);
        const profile = usersArray.find(u => u._id === userId);
        setUser(profile || null);
    }, [usersData, userId]);

    const placesArray = Object.values(placesData);
    const commentsArray = Object.values(commentsData);

    const userPlaces = placesArray.filter(p => p._ownerId === userId);
    const userComments = commentsArray.filter(c => c.userId === userId);

    if (loadingPlaces || loadingComments || loadingUsers)
        return <LogoSpinner />;

    const currentComments = userComments.slice(
        (currentCommentPage - 1) * itemsPerPage,
        currentCommentPage * itemsPerPage
    );

    const currentPlaces = userPlaces.slice(
        (currentPlacePage - 1) * itemsPerPage,
        currentPlacePage * itemsPerPage
    );

    const handleUserUpdate = updatedUser => setUser(updatedUser);
    const handleUserDelete = () => {
        alert('Profile deleted!');
        setUser(null);
        navigate('/');
    };

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col items-center min-h-screen gap-2 mt-8'>
            <h2 className='text-4xl sm:text-5xl md:text-5xl text-center font-bold mb-8 text-white drop-shadow-[5px_5px_2px_black]'>
                Profile Details
            </h2>

            <div className='flex w-full max-w-7xl gap-6 items-start'>
                {user && (
                    <div className='flex flex-col gap-4'>
                        <ProfileCard user={user} />
                    </div>
                )}

                <div className='flex-1 flex flex-col gap-2'>
                    <div className='flex gap-4 max-h-[220px] overflow-x-auto'>
                        {currentComments.length === 0 ? (
                            <p className='text-white text-lg flex items-center justify-center w-full'>
                                You still haven't made any comments.
                            </p>
                        ) : (
                            currentComments.map(comment => (
                                <div
                                    className='flex-shrink-0 min-w-[180px]'
                                    key={comment._id}
                                >
                                    <CommentCard
                                        comment={comment}
                                        onUpdate={updated => {
                                            setCommentsData(prev => ({
                                                ...prev,
                                                [updated._id]: updated
                                            }));
                                        }}
                                        onDelete={deletedId => {
                                            setCommentsData(prev => {
                                                const copy = { ...prev };
                                                delete copy[deletedId];
                                                return copy;
                                            });
                                        }}
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    <div className='flex items-center mt-2 gap-2'>
                        <button
                            onClick={() => setShowSettings(true)}
                            className='bg-blue-500 text-black font-bold py-2 px-4 rounded-xl border-b-4 border-black border-r-4 border-gray-900 hover:bg-blue-400 transform transition-transform duration-300 hover:scale-105 self-start'
                        >
                            Settings
                        </button>
                        <Pagination
                            currentPage={currentCommentPage}
                            totalItems={userComments.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentCommentPage}
                        />
                    </div>
                </div>
            </div>

            <div className='w-full max-w-7xl flex flex-col gap-2 pl-[15px] mt-6'>
                <div className='flex gap-8'>
                    {currentPlaces.length === 0 ? (
                        <p className='text-white text-lg flex items-center justify-center w-full'>
                            You still haven't added any places.
                        </p>
                    ) : (
                        currentPlaces.map(place => (
                            <div
                                className='flex-shrink-0 min-w-[280px]'
                                key={place._id}
                            >
                                <PlaceCard {...place} />
                            </div>
                        ))
                    )}
                </div>

                <div className='mt-2'>
                    <Pagination
                        currentPage={currentPlacePage}
                        totalItems={userPlaces.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPlacePage}
                    />
                </div>
            </div>

            {showSettings && user && (
                <ProfileSettingsOverlay
                    user={user}
                    onClose={() => setShowSettings(false)}
                    onUserUpdate={handleUserUpdate}
                    onUserDelete={handleUserDelete}
                />
            )}
        </section>
    );
}
