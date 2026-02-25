'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../lib/features/authSlice';

export default function AuthInitializer({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return children;
}
