import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts
} from '../controllers/productController';
import { authenticate } from '../middleware/auth';
import { productValidationRules, validate } from '../middleware/validation';

const router = express.Router();

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

router.post('/', authenticate, productValidationRules.create, validate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
