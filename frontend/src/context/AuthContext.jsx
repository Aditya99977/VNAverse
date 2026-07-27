import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

/*
==========================================
Restore Session
==========================================
*/

const restoreSession = () => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const user = localStorage.getItem(USER_KEY);

        if (!token || !user) {
            return null;
        }

        return {
            token,
            ...JSON.parse(user),
        };
    } catch (error) {
        console.error("Failed to restore session:", error);

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        return null;
    }
};

/*
==========================================
Auth Provider
==========================================
*/

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /*
    ==========================================
    Initialize Auth
    ==========================================
    */

    useEffect(() => {
        const session = restoreSession();

        if (session) {
            setUser(session);
        }

        setLoading(false);
    }, []);

    /*
    ==========================================
    Save Session
    ==========================================
    */

    const saveSession = (token, userData) => {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
    };

    /*
    ==========================================
    Clear Session
    ==========================================
    */

    const clearSession = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    };

    /*
    ==========================================
    Login
    ==========================================
    */

    const login = (token, userData) => {
        saveSession(token, userData);

        setUser({
            token,
            ...userData,
        });
    };

    /*
    ==========================================
    Logout
    ==========================================
    */

    const logout = () => {
        clearSession();
        setUser(null);
    };

    /*
    ==========================================
    Update User
    ==========================================
    */

    const updateUser = (updatedData) => {
        setUser((previousUser) => {
            if (!previousUser) {
                return null;
            }

            const updatedUser = {
                ...previousUser,
                ...updatedData,
            };

            saveSession(updatedUser.token, {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                preferredExam: updatedUser.preferredExam,
                profileImage: updatedUser.profileImage,
            });

            return updatedUser;
        });
    };

    /*
    ==========================================
    Context Value
    ==========================================
    */

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
            updateUser,
            isAuthenticated: !!user,
        }),
        [user, loading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}