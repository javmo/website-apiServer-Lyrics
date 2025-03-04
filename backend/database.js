const mongoose = require('mongoose');

// 🔹 Desactivar la restricción de populate en mongoose
mongoose.set('strictPopulate', false);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB is connected'))
    .catch(err => console.error('Connection error:', err));


