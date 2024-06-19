const db = require('../models');
const Profile = db.profile; // Sesuaikan dengan model profil Anda

const checkProfileExists = async (req, res, next) => {
    try {
        const userId = req.user.id; // Asumsikan ID pengguna disimpan di req.user.id setelah autentikasi
        const profile = await Profile.findOne({ where: { userId } });

        if (profile) {
            return res.status(400).json({ message: 'Profil sudah ada. Anda tidak dapat membuat profil baru.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};

module.exports = checkProfileExists;
