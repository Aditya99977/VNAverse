import api from "./api";

/*
==================================================
Profile APIs
==================================================
*/

/**
 * Get Logged-in User Profile
 * GET /api/profile
 */
export const getProfile = async () => {
    const { data } = await api.get("/profile");

    return data.data;
};

/**
 * Update User Profile
 * PUT /api/profile
 */
export const updateProfile = async (profileData) => {
    const { data } = await api.put(
        "/profile",
        profileData
    );

    return data.data;
};

/**
 * Upload Profile Image
 * PUT /api/profile/upload-profile-image
 */
export const uploadProfileImage = async (
    formData
) => {
    const { data } = await api.put(
        "/profile/upload-profile-image",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return data.data;
};