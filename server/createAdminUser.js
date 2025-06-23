const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userModel = require('./models/userModel');
require('dotenv').config();

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        // Check if admin user already exists
        const existingAdmin = await userModel.findOne({ email: 'admin@example.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync('admin123', salt);

        const adminUser = new userModel({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashPassword,
            role: 'ADMIN'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

createAdminUser(); 