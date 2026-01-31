import { Response, NextFunction } from 'express';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../utils/appError';

export const getProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const queryObj: any = { isActive: true };
    
    if (req.query.category) queryObj.category = req.query.category;
    if (req.query.minPrice || req.query.maxPrice) {
      queryObj.price = {};
      if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.isFeatured === 'true') queryObj.isFeatured = true;

    let sort: any = { createdAt: -1 };
    if (req.query.sort === 'price-asc') sort = { price: 1 };
    if (req.query.sort === 'price-desc') sort = { price: -1 };
    if (req.query.sort === 'rating') sort = { rating: -1 };

    const products = await Product.find(queryObj)
      .populate('createdBy', 'username firstName lastName')
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const total = await Product.countDocuments(queryObj);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'username firstName lastName');
    if (!product) throw new AppError('Product not found', 404);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q) throw new AppError('Search query is required', 400);

    const products = await Product.find({
      $text: { $search: q as string },
      isActive: true
    }).limit(20);

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true }).limit(10);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, price, category, stock, sku, brand, tags, discount, isFeatured } = req.body;

    const skuExists = await Product.findOne({ sku: sku.toUpperCase() });
    if (skuExists) throw new AppError('SKU already exists', 400);

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      sku: sku.toUpperCase(),
      brand,
      tags,
      discount,
      isFeatured,
      createdBy: req.user?._id
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) throw new AppError('Product not found', 404);

    if (product.createdBy.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      throw new AppError('Not authorized', 403);
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new AppError('Product not found', 404);

    if (product.createdBy.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      throw new AppError('Not authorized', 403);
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
