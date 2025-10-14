// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const wishlistRoutes = require('./routes/wishlistRoutes');

// dotenv.config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/wishlist', wishlistRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? err : {}
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




























// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const wishlistRoutes = require('./routes/wishlistRoutes');

// dotenv.config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/wishlist', wishlistRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: `Route ${req.path} not found` });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? err : {}
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`API available at http://localhost:${PORT}/api`);
// });








// // At the top of server.js, add:
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // CORS configuration for production
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://your-frontend.vercel.app'] // Update with your Vercel URL
//     : ['http://localhost:5173', 'http://127.0.0.1:5173'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));

// // ... rest of your server code

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'E-commerce API is running!',
//     status: 'OK',
//     timestamp: new Date().toISOString()
//   });
// });

// // ... your routes

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://mern-ecommerce-frontend.vercel.app',
      'https://mern-ecommerce-frontend-git-main-sudharsan8621s-projects.vercel.app',
      'https://mern-ecommerce-frontend-*.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173'
    ];
    
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp(allowedOrigin.replace('*', '.*'));
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Root health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      auth: '/api/auth/login',
      register: '/api/auth/register'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Seed endpoint (for initial setup - remove in production if needed)
app.post('/api/seed', async (req, res) => {
  try {
    // Only allow in development or with secret key
    const { secretKey } = req.body;
    if (process.env.NODE_ENV === 'production' && secretKey !== process.env.SEED_SECRET) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const Product = require('./models/Product');
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Seed products
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

    await Product.insertMany(products);

    // Create test user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    await User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash
    });

    res.json({ 
      message: 'Database seeded successfully!',
      productsCount: products.length,
      testUser: 'test@example.com / password123'
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: `Route ${req.path} not found`,
    availableEndpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      wishlist: '/api/wishlist'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'CORS policy violation',
      error: 'This origin is not allowed to access the API'
    });
  }
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  if (process.env.NODE_ENV === 'production') {
    console.log('API URL: https://mern-ecommerce-api.onrender.com');
  } else {
    console.log(`API URL: http://localhost:${PORT}`);
  }
});


