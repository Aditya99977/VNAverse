const profileService = require("../services/profileService");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==================================================
Get Profile
==================================================
*/

exports.getProfile = asyncHandler(async (req, res) => {
    const profile = await profileService.getProfile(
        req.user.id
    );

    return res.status(200).json(
        ApiResponse.success(
            "Profile fetched successfully.",
            profile
        )
    );
});

/*
==================================================
Update Profile
==================================================
*/

exports.updateProfile = asyncHandler(async (req, res) => {
    const updatedProfile =
        await profileService.updateProfile(
            req.user.id,
            req.body
        );

    return res.status(200).json(
        ApiResponse.success(
            "Profile updated successfully.",
            updatedProfile
        )
    );
});

/*
==================================================
Upload Profile Image
==================================================
*/

exports.uploadProfileImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json(
            ApiResponse.error(
                "Please upload an image."
            )
        );
    }

    const updatedUser =
        await profileService.updateProfileImage(
            req.user.id,
            req.file.filename
        );

    return res.status(200).json(
        ApiResponse.success(
            "Profile image updated successfully.",
            {
                profileImage:
                    updatedUser.profileImage,
            }
        )
    );
});