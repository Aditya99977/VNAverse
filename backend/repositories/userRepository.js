const User = require("../models/User");

class UserRepository {
    /*
    ==========================================
    Create User
    ==========================================
    */

    async create(userData) {
        return User.create(userData);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(userId) {
        return User.findById(userId);
    }
    /*
==========================================
Find By ID With Password
==========================================
*/

async findByIdWithPassword(userId) {

    return User.findById(userId)
        .select("+password");

}

    /*
    ==========================================
    Find By Email
    ==========================================
    */

    async findByEmail(email) {
        return User.findOne({
            email: email.toLowerCase(),
        }).select("+password");
    }
    /*
==========================================
Find By Email With Password
==========================================
*/

async findByEmailWithPassword(email) {

    return User.findOne({
        email: email.toLowerCase(),
    }).select("+password");

}

    /*
    ==========================================
    Find Public Profile
    ==========================================
    */

    async findProfile(userId) {
        return User.findById(userId).select(
            "-password"
        );
    }

    /*
    ==========================================
    Update User
    ==========================================
    */

    async update(userId, data) {
        return User.findByIdAndUpdate(
            userId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /*
    ==========================================
    Delete User
    ==========================================
    */

    async delete(userId) {
        return User.findByIdAndDelete(userId);
    }

    /*
    ==========================================
    List Users
    ==========================================
    */

    async findAll(filters = {}) {
        return User.find(filters).sort({
            createdAt: -1,
        });
    }

    /*
    ==========================================
    Count Users
    ==========================================
    */

    async count(filters = {}) {
        return User.countDocuments(filters);
    }
}

module.exports = new UserRepository();