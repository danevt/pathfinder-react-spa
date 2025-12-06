import { useState } from 'react';
import request from '../../../utils/requester.js';
import { PROFILES_API } from '../../../config/api.js';

export default function ProfileSettingsOverlay({
    user,
    onClose,
    onUserUpdate,
    onUserDelete
}) {
    const {
        username: initialUsername,
        aboutMe: initialAboutMe,
        avatar: initialAvatar
    } = user;

    const [username, setUsername] = useState(initialUsername);
    const [aboutMe, setAboutMe] = useState(initialAboutMe);
    const [avatar, setAvatar] = useState(initialAvatar);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const updatedUser = await request(
                `${PROFILES_API}${user._id}`,
                'PUT',
                {
                    username,
                    aboutMe,
                    avatar
                }
            );
            onUserUpdate(updatedUser);
            onClose();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) {
            alert('Please check the box to confirm deletion.');
            return;
        }

        setIsDeleting(true);
        try {
            await request(`${PROFILES_API}${user._id}`, 'DELETE');
            onUserDelete(user._id);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='fixed inset-0  bg-opacity-20 backdrop-blur-[2px]'></div>

            <form className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 border-b-6 border-black border-r-6 border-gray-800 relative z-10'>
                <button
                    type='button'
                    onClick={onClose}
                    className='absolute z-30 top-4 right-6 w-7 h-7 bg-black text-black font-bold flex items-center justify-center rounded-sm border-black border-r-2 border-b-2 bg-red-600 hover:bg-red-500 transform transition-transform duration-300 hover:scale-105'
                >
                    X
                </button>

                <h2 className='text-4xl font-bold text-center text-[#4A9603] drop-shadow-[3px_3px_1px_black]'>
                    Edit Profile
                </h2>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm pl-2'>
                        Username
                    </label>
                    <input
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                        placeholder='Enter username...'
                    />
                </div>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm pl-2'>
                        About Me
                    </label>
                    <textarea
                        value={aboutMe}
                        onChange={e => setAboutMe(e.target.value)}
                        className='w-full h-24 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                        placeholder='About yourself...'
                    />
                </div>

                <div>
                    <label className='block text-black font-bold mb-2 text-shadow-sm pl-2'>
                        Avatar
                    </label>
                    <select
                        value={avatar}
                        onChange={e => setAvatar(e.target.value)}
                        className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5ECF00]'
                    >
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={`avatar${i + 1}`}>
                                Avatar {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type='button'
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`w-full bg-[#4A9603] text-black font-bold py-2 hover:bg-[#5ECF00] rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 transform transition-transform duration-300 hover:scale-105 ${
                        isSaving ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Save
                </button>

                <div className='flex flex-col items-center gap-2 mt-4'>
                    <h2 className='text-red-600 font-semibold drop-shadow-[2px_2px_1px_black]'>
                        {' '}
                        --- DANGER ZONE ---{' '}
                    </h2>
                    <label className='flex items-center gap-2 text-red-600 font-semibold'>
                        <input
                            type='checkbox'
                            checked={confirmDelete}
                            onChange={e => setConfirmDelete(e.target.checked)}
                        />
                        I understand this action cannot be undone
                    </label>
                    <button
                        type='button'
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`w-full py-2 rounded-xl bg-red-600 text-black font-bold hover:bg-red-500 shadow-md border-b-4 border-black border-r-4 border-gray-900 transform transition-transform duration-300 hover:scale-105 ${
                            isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Delete Profile
                    </button>
                </div>
            </form>
        </div>
    );
}
