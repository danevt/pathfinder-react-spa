import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { USERS_API } from '../../../config/api.js';
import request from '../../../utils/requester.js';
import LogoSpinner from '../../ui/spinner/LogoSpinner.jsx';

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
            <div className='bg-gradient-to-r from-white via-gray-300 to-gray-400 w-[380px] h-[240px] rounded-xl shadow-md border-b-8 border-black border-r-6 border-gray-900 relative p-6 z-10 pointer-events-auto'>
                <div className='flex h-full items-center gap-6'>
                    <div className='flex flex-col items-center -mt-4'>
                        <img
                            src={avatarSrc}
                            alt={username}
                            className='w-28 h-28 rounded-full'
                        />
                        <p className='font-semibold text-black mt-2'>
                            {username}
                        </p>
                    </div>
                    <p className='flex-1 text-center text-sm text-gray-900 px-2'>
                        {aboutMe}
                    </p>
                </div>
            </div>
        </>
    );
}
