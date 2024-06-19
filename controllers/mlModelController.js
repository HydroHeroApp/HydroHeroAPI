const axios = require('axios');
const FormData = require('form-data');

const predict = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Tambahkan ini untuk melihat data yang dikirimkan

        // Buat instance FormData
        const form = new FormData();
        for (const key in req.body) {
            form.append(key, req.body[key]);
        }

        const response = await axios.post('https://dehidrasiprediction-7xls4vqcza-et.a.run.app/predict', form, {
            headers: {
                ...form.getHeaders() // Tambahkan header yang diperlukan untuk form-data
            }
        });

        console.log('Response data:', response.data); // Tambahkan ini untuk melihat respons dari server
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error making prediction:', error.response ? error.response.data : error.message); // Tambahkan ini untuk melihat detail kesalahan
        res.status(500).json({ message: 'Error making prediction', error: error.response ? error.response.data : error.message });
    }
};

module.exports = {
    predict
};