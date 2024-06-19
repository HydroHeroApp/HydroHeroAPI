const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.users;
const Profile = db.profile;
const secret = process.env.JWT_SECRET; // Pastikan ini konsisten

console.log('JWT_SECRET:', secret); // Tambahkan log ini untuk memastikan secret terbaca

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        // Ambil profil pengguna
        const userWithProfile = await User.findByPk(user.id, {
            include: [{
                model: Profile,
                as: 'profile'
            }]
        });

        res.status(200).send({ 
            message: "Login successful", 
            token,
            user: { 
                id: userWithProfile.id, 
                username: userWithProfile.username, 
                email: userWithProfile.email,
                profile: userWithProfile.profile // Sertakan profil dalam respons
            } 
        });
    } catch (error) {
        res.status(500).send({ message: "Error logging in", error: error.message });
    }
};

module.exports = {
    loginUser
};
