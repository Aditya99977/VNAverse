const profileRepository = require("../repositories/profileRepository");

class ProfileService {
    /*
    ==========================================
    Get Profile
    ==========================================
    */

    async getProfile(userId) {
        const user =
            await profileRepository.findUserById(
                userId
            );

        if (!user) {
            throw new Error("User not found.");
        }

        const currentExam =
            await profileRepository.getCurrentExam(
                userId
            );

        const mockTests =
            await profileRepository.getCompletedMockTests(
                userId
            );

        const testsAttempted =
            mockTests.length;

        const highestScore =
            testsAttempted > 0
                ? Math.max(
                      ...mockTests.map(
                          (test) => test.score || 0
                      )
                  )
                : 0;

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,

            profileImage:
                user.profileImage,

            status: user.status,

            currentExam:
                currentExam?.exam || null,

            testsAttempted,

            highestScore,

            createdAt:
                user.createdAt,
        };
    }

    /*
    ==========================================
    Update Profile
    ==========================================
    */

    async updateProfile(
        userId,
        profileData
    ) {
        const user =
            await profileRepository.findUserById(
                userId
            );

        if (!user) {
            throw new Error("User not found.");
        }

        const updateData = {};

        if (profileData.name) {
            updateData.name =
                profileData.name.trim();
        }

        if (profileData.email) {
            updateData.email =
                profileData.email
                    .trim()
                    .toLowerCase();
        }

        return profileRepository.updateProfile(
            userId,
            updateData
        );
    }

    /*
    ==========================================
    Update Profile Image
    ==========================================
    */

    async updateProfileImage(
        userId,
        filename
    ) {
        const user =
            await profileRepository.findUserById(
                userId
            );

        if (!user) {
            throw new Error("User not found.");
        }

        return profileRepository.updateProfileImage(
            userId,
            filename
        );
    }
}

module.exports = new ProfileService();