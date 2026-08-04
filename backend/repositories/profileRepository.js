const User = require("../models/User");
const MockTestAttempt = require("../models/MockTestAttempt");
const UserExamProgress = require("../models/UserExamProgress");

class ProfileRepository {
    /*
    ==========================================
    Get User By ID
    ==========================================
    */

    async findUserById(userId) {
        return User.findById(userId)
            .select("-password");
    }

    /*
    ==========================================
    Get Current Exam
    ==========================================
    */

    async getCurrentExam(userId) {
        return UserExamProgress.findOne({
            user: userId,
            isCurrent: true,
        }).populate("exam");
    }

    /*
    ==========================================
    Get Completed Mock Tests
    ==========================================
    */

    async getCompletedMockTests(userId) {
        return MockTestAttempt.find({
            user: userId,
            status: "completed",
        });
    }

    /*
    ==========================================
    Update Profile
    ==========================================
    */

    async updateProfile(userId, updateData) {
        return User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");
    }

    /*
    ==========================================
    Update Profile Image
    ==========================================
    */

    async updateProfileImage(
        userId,
        profileImage
    ) {
        return User.findByIdAndUpdate(
            userId,
            {
                profileImage,
            },
            {
                new: true,
            }
        ).select("-password");
    }
}

module.exports = new ProfileRepository();