import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getCurrentUser,
    loginUser,
    logoutUser,
} from "../services/authService";

export const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

/*
==================================================
Session Helpers
==================================================
*/

const saveSession = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

const getStoredToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/*
==================================================
Auth Provider
==================================================
*/

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /*
    ==============================================
    Restore Session
    ==============================================
    */

    const restoreSession = useCallback(async () => {
        const token = getStoredToken();

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await getCurrentUser();

            if (!response.success) {
                throw new Error(response.message);
            }

            const userData = response.data;

            saveSession(token, userData);

            setUser({
                token,
                ...userData,
            });
        } catch (error) {
            console.error(
                "Session restoration failed:",
                error
            );

            clearSession();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        restoreSession();
    }, [restoreSession]);

    /*
    ==============================================
    Login
    ==============================================
    */

    const login = useCallback(async (credentials) => {
        const response = await loginUser(credentials);

        if (!response.success) {
            throw new Error(response.message);
        }

        const { token, user } = response.data;

        saveSession(token, user);

        setUser({
            token,
            ...user,
        });

        return response;
    }, []);

    /*
    ==============================================
    Logout
    ==============================================
    */

    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error(
                "Logout request failed:",
                error
            );
        } finally {
            clearSession();
            setUser(null);
        }
    }, []);

    /*
    ==============================================
    Update User
    ==============================================
    */

    const updateUser = useCallback((updatedData) => {
        setUser((previousUser) => {
            if (!previousUser) {
                return null;
            }

            const updatedUser = {
                ...previousUser,
                ...updatedData,
            };

            saveSession(updatedUser.token, {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profileImage: updatedUser.profileImage,
                currentExam: updatedUser.currentExam,
                testsAttempted:
                    updatedUser.testsAttempted,
                highestScore:
                    updatedUser.highestScore,
                status: updatedUser.status,
                createdAt: updatedUser.createdAt,
            });

            return updatedUser;
        });
    }, []);

    /*
    ==============================================
    Context Value
    ==============================================
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
        [
            user,
            loading,
            login,
            logout,
            updateUser,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}