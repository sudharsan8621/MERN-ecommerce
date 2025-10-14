const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const products = [
  {
    title: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation and 24-hour battery life',
    priceINR: 5999,
    images: ['earbuds.jpg'],
    rating: 4.5,
    category: 'Electronics',
    stock: 50
  },
  {
    title: 'Smart Watch Ultra',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS',
    priceINR: 12999,
    images: ['smartwatch.jpg'],
    rating: 4.3,
    category: 'Electronics',
    stock: 30
  },
  {
    title: 'Cotton Casual Shirt',
    description: 'Premium cotton casual shirt for everyday comfort',
    priceINR: 1299,
    images: ['shirt.jpg'],
    rating: 4.0,
    category: 'Apparel',
    stock: 100
  },
  {
    title: 'Denim Jeans',
    description: 'Classic fit denim jeans with modern styling',
    priceINR: 2499,
    images: ['jeans.jpg'],
    rating: 4.2,
    category: 'Apparel',
    stock: 75
  },
  {
    title: 'Coffee Maker Deluxe',
    description: 'Automatic coffee maker with programmable settings',
    priceINR: 8999,
    images: ['coffee-maker.jpg'],
    rating: 4.6,
    category: 'Home',
    stock: 25
  },
  {
    title: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels',
    priceINR: 1999,
    images: ['desk-lamp.jpg'],
    rating: 4.1,
    category: 'Home',
    stock: 60
  },
  {
    title: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 360-degree sound',
    priceINR: 3999,
    images: ['speaker.jpg'],
    rating: 4.4,
    category: 'Electronics',
    stock: 45
  },
  {
    title: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning',
    priceINR: 1499,
    images: ['yoga-mat.jpg'],
    rating: 4.7,
    category: 'Sports',
    stock: 80
  },
  {
    title: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning',
    priceINR: 4999,
    images: ['shoes.jpg'],
    rating: 4.5,
    category: 'Sports',
    stock: 55
  },
  {
    title: 'Backpack Travel',
    description: 'Durable travel backpack with multiple compartments',
    priceINR: 2999,
    images: ['backpack.jpg'],
    rating: 4.3,
    category: 'Accessories',
    stock: 40
  },
  {
    title: 'Sunglasses Polarized',
    description: 'UV protection polarized sunglasses',
    priceINR: 1799,
    images: ['sunglasses.jpg'],
    rating: 4.2,
    category: 'Accessories',
    stock: 70
  },
  {
    title: 'Wireless Charger',
    description: 'Fast wireless charging pad for all Qi-enabled devices',
    priceINR: 1599,
    images: ['charger.jpg'],
    rating: 4.0,
    category: 'Electronics',
    stock: 65
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create test user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash
    });
    console.log('Created test user - Email: test@example.com, Password: password123');

    // Create products
    await Product.insertMany(products);
    console.log('Added sample products');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();