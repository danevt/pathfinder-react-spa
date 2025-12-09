import usePersistedState from './usePersistedState.js';
import { useEffect, useState } from 'react';

export default function useLike(itemObject, userId) {
    const [likesMap, setLikesMap] = usePersistedState('likes', {}); // локален сторидж
    const [likes, setLikes] = useState(itemObject.likes || []);

    // при първо зареждане – синхронизация с локалния сторидж
    useEffect(() => {
        const storedLikes = likesMap[itemObject._id];
        if (storedLikes) {
            setLikes(storedLikes);
        } else if (itemObject.likes) {
            setLikes(itemObject.likes);
            setLikesMap(prev => ({ ...prev, [itemObject._id]: itemObject.likes }));
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




// import usePersistedState from './usePersistedState.js';

// export default function useLike(itemObject, userId) {
//     const itemId = itemObject._id;
//     const backendLikes = itemObject.likes || [];

//     const [likesMap, setLikesMap] = usePersistedState('likes', {});
//     const hasLocalEntry = Boolean(likesMap[itemId]);

//     const likes = hasLocalEntry ? likesMap[itemId] : backendLikes;

//     // Инициализация от бекенда → само ако няма локален запис
//     if (!hasLocalEntry && backendLikes.length > 0) {
//         setLikesMap(prev => ({ ...prev, [itemId]: backendLikes }));
//     }

//     const toggleLike = () => {
//         if (!userId) return;

//         const current = hasLocalEntry ? likesMap[itemId] : backendLikes;

//         const updatedLikes = current.includes(userId)
//             ? current.filter(id => id !== userId)
//             : [...current, userId];

//         setLikesMap(prev => ({ ...prev, [itemId]: updatedLikes }));
//     };

//     return [likes, toggleLike];
// }
