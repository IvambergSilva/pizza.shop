import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAutheticated, setIsAutheticated] = useState<boolean | null>(null);

    const location = useLocation();
    
    function checkAuthenticated() {
        const isAutheticated = document.cookie.includes('isLoggedIn');
        setIsAutheticated(isAutheticated)
    }

    useEffect(() => {
        checkAuthenticated();
    }, [])

    if (isAutheticated === null) return null

    if (isAutheticated && (location.pathname === '/sign-in' || location.pathname === '/sign-up')) {
        return <Navigate to='/' replace />
    }

    if (!isAutheticated && location.pathname !== '/sign-in' && location.pathname !== '/sign-up') {
        return <Navigate to='/sign-in' replace />
    }

    return (
        <>
            {children}
        </>
    )
}
