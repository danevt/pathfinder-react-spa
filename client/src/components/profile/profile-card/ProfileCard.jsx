import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { USERS_API } from '../../../config/api.js';
import request from '../../../utils/requester.js';
import LogoSpinner from '../../../ui/spinner/LogoSpinner.jsx';

export default function ProfileCard() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        request(`${USERS_API}${userId}`)
            .then(data => setUser(data))
            .catch(error => alert(error.message));
    }, [userId]);

    if (!user) return <LogoSpinner />;
    const { username, avatar, aboutMe } = user;
    const avatarSrc = `/images/avatars/${avatar}.svg`;

    return (
        <>
            <div className='bg-gradient-to-r from-white via-gray-300 to-gray-400 rounded-xl shadow-md  w-[260px]  border-b-8 border-black border-r-6 border-gray-900 relative p-8 z-10 pointer-events-auto'>
                <div className='flex gap-4'>
                    <img
                        src={avatarSrc}
                        alt={username}
                        className='w-20 h-20 rounded-full flex-shrink-0'
                    />
                    <div className='flex flex-col justify-center gap-1'>
                        <p className='font-semibold  text-black'>{username}</p>
                    </div>

                    <p className='flex-1 text-sm text-gray-700 line-clamp-3'>
                        {aboutMe}
                    </p>
                </div>
            </div>
        </>
    );
}
