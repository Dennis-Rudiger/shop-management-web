import React from 'react';
import { useProductContext } from '../context/ProductContext';

function Products() {
  const { products, addToCart } = useProductContext();

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="stock">In Stock: {product.stock}</p>
            <button 
              onClick={() => addToCart(product.id)}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
