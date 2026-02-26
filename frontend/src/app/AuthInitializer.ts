'use client';

import { useEffect, ReactNode } from 'react';
import { useAppDispatch } from '@/lib/redux/type';
import { checkAuth } from '../lib/features/authSlice';

type AuthInitializerProps = {
    children: ReactNode;
};

export default function AuthInitializer({ children }: AuthInitializerProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return children;
}
