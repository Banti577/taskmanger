'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/redux/type';
import { checkAuth } from '../lib/features/authSlice';

export default function AuthInitializer({ children }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return children;
}
