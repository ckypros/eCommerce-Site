import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear the db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        // Get the Admin user
        const adminUser = createdUsers[0]._id;

        // Add the admin user to each of the imported products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Insert the products into the db
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear the db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Data can be deleted by appendeding -d.. "node backend/seeder -d"
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
