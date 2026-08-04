const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const userRepository = require("../repositories/userRepository");

class AuthService {

    /*
    ==========================================
    Register User
    ==========================================
    */

    async register(userData) {

        const existingUser =
            await userRepository.findByEmail(
                userData.email
            );

        if (existingUser) {
            throw new AppError(
                "Email already registered.",
                409
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                userData.password,
                12
            );

        const user =
            await userRepository.create({
                ...userData,
                password: hashedPassword,
            });

        const token = this.generateToken(
            user._id,
            user.role
        );

        return {
            user,
            token,
        };
    }

    /*
    ==========================================
    Login User
    ==========================================
    */

    async login(email, password) {

        const user =
            await userRepository.findByEmailWithPassword(
                email
            );

        if (!user) {
            throw new AppError(
                "Invalid email or password.",
                401
            );
        }

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {
            throw new AppError(
                "Invalid email or password.",
                401
            );
        }

        if (user.status !== "active") {
            throw new AppError(
                "Your account has been blocked.",
                403
            );
        }

        const token = this.generateToken(
            user._id,
            user.role
        );

        user.password = undefined;

        return {
            user,
            token,
        };
    }

    /*
    ==========================================
    Get Current User
    ==========================================
    */

    async getCurrentUser(userId) {

        const user =
            await userRepository.findById(
                userId
            );

        if (!user) {
            throw new AppError(
                "User not found.",
                404
            );
        }

        return user;
    }

    /*
    ==========================================
    Generate JWT
    ==========================================
    */

    generateToken(userId, role) {

        return jwt.sign(
            {
                id: userId,
                role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN ||
                    "7d",
            }
        );

    }
    /*
==========================================
Change Password
==========================================
*/

async changePassword(
    userId,
    currentPassword,
    newPassword
) {

    const user =
        await userRepository.findByIdWithPassword(
            userId
        );

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    const isMatch =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

    if (!isMatch) {
        throw new AppError(
            "Current password is incorrect.",
            400
        );
    }

    user.password = await bcrypt.hash(
        newPassword,
        12
    );

    await user.save();

    return {
        message: "Password changed successfully."
    };

}
/*
==========================================
Logout
==========================================
*/

async logout() {

    return {
        message: "Logout successful."
    };

}
}

module.exports = new AuthService();