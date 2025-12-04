import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import request from '../../../utils/requester.js';
import { COMMENTS_API, PLACES_API, USERS_API } from '../../../config/api.js';
import LogoSpinner from '../../ui/spinner/LogoSpinner.jsx';
import ProfileCard from '../profile-card/ProfileCard.jsx';
import PlaceCard from '../../place/card/PlaceCard.jsx';
import CommentCard from '../../place/comments/comment-card/CommentCard.jsx';
import Pagination from '../../ui/pagination/Pagination.jsx';

export default function ProfileDetails({ currentUser }) {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [places, setPlaces] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [currentPlacePage, setCurrentPlacePage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [placesData, commentsData, usersData] = await Promise.all(
                    [
                        request(PLACES_API),
                        request(COMMENTS_API),
                        request(USERS_API)
                    ]
                );

                setPlaces(
                    Object.values(placesData).filter(p => p._ownerId === userId)
                );
                setComments(
                    Object.values(commentsData).filter(c => c.userId === userId)
                );
                setUser(usersData[userId]);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) return <LogoSpinner />;

    const currentComments = comments.slice(
        (currentCommentPage - 1) * itemsPerPage,
        currentCommentPage * itemsPerPage
    );

    const currentPlaces = places.slice(
        (currentPlacePage - 1) * itemsPerPage,
        currentPlacePage * itemsPerPage
    );

    return (
        <section className='bg-gradient-to-r from-black via-gray-500 to-black p-6 flex flex-col items-center min-h-screen gap-2 mt-8'>
            <h2 className='text-4xl sm:text-5xl md:text-5xl text-center font-bold mb-4 text-white font-bold drop-shadow-[5px_5px_2px_black] mb-8'>
                Profile Details
            </h2>
            <div className='flex w-full max-w-7xl gap-6 items-start'>
                {user && <ProfileCard user={user} />}

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
                                        currentUser={currentUser}
                                        onUpdate={updated =>
                                            setComments(prev =>
                                                prev.map(c =>
                                                    c._id === updated._id
                                                        ? updated
                                                        : c
                                                )
                                            )
                                        }
                                        onDelete={deletedId =>
                                            setComments(prev =>
                                                prev.filter(
                                                    c => c._id !== deletedId
                                                )
                                            )
                                        }
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    <div className='mt-2'>
                        <Pagination
                            currentPage={currentCommentPage}
                            totalItems={comments.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentCommentPage}
                        />
                    </div>
                </div>
            </div>

            <div className='w-full max-w-7xl flex flex-col gap-2  pl-[15px]'>
                <div className='flex gap-8 '>
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
                        totalItems={places.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPlacePage}
                    />
                </div>
            </div>
        </section>
    );
}
