const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { items, shipping = 0 } = req.body;
    
    let orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      const totalLine = product.priceINR * item.quantity;
      subtotal += totalLine;

      orderItems.push({
        productId: product._id,
        title: product.title,
        category: product.category,
        priceINR: product.priceINR,
        quantity: item.quantity,
        totalLine
      });

      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }

    const totalAmount = subtotal + shipping;

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      subtotal,
      shipping,
      totalAmount,
      status: 'processing'
    });

    // Clear cart after order
    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [], updatedAt: Date.now() }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders };