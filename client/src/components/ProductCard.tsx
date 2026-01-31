import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../context/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <Link to={`/products/${product._id}`}>
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          {product.thumbnail || product.images[0] ? (
            <img
              src={product.thumbnail || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1 mb-2">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm">{product.rating.toFixed(1)} ({product.reviewsCount})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
          <span className={product.stock > 0 ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
