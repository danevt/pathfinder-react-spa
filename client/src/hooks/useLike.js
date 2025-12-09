import usePersistedState from './usePersistedState.js';
import { useEffect, useState } from 'react';

export default function useLike(itemObject, userId) {
    const [likesMap, setLikesMap] = usePersistedState('likes', {});
    const [likes, setLikes] = useState(itemObject.likes || []);

    useEffect(() => {
        const storedLikes = likesMap[itemObject._id];
        if (storedLikes) {
            setLikes(storedLikes);
        } else if (itemObject.likes) {
            setLikes(itemObject.likes);
            setLikesMap(prev => ({
                ...prev,
                [itemObject._id]: itemObject.likes
            }));
        }
    }, [itemObject, likesMap, setLikesMap]);

    const toggleLike = () => {
        if (!userId) return;

        let updatedLikes;
        if (likes.includes(userId)) {
            updatedLikes = likes.filter(id => id !== userId);
        } else {
            updatedLikes = [...likes, userId];
        }

        setLikes(updatedLikes);
        setLikesMap(prev => ({ ...prev, [itemObject._id]: updatedLikes }));
    };

    return [likes, toggleLike];
}
