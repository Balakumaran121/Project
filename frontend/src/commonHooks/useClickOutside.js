import { useEffect } from 'react';

const useClickOutside = (ref, callback, isActive) => {
    useEffect(() => {
        if (!isActive) return;
        const handleClick = (event) => 
            ref.current && !ref.current.contains(event.target) && callback();

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isActive, ref, callback]);
};

export default useClickOutside;
