import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a product title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: ['Fashion', 'Electronics', 'Stationery', 'Gadgets', 'Books', 'Lifestyle'],
    },
    subCategory: {
      type: String,
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand name'],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    stock: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    affiliateLinks: {
      amazon: String,
      flipkart: String,
      myntra: String,
      others: Map,
    },
    specs: {
      type: Map,
      of: String,
    },
    tags: [String],
  },
  { timestamps: true }
);

// Create compound index for search
ProductSchema.index({ title: 'text', description: 'text', tags: 'text', brand: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 