import React from 'react';
import { useProductContext } from '../context/ProductContext';

function Inventory() {
  const { products, updateStock } = useProductContext();

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>
      <div className="inventory-grid">
        {products.map((product) => (
          <div key={product.id} className="inventory-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="stock-control">
              <p>Current Stock: {product.stock}</p>
              <div className="stock-actions">
                <button onClick={() => updateStock(product.id, product.stock + 1)}>
                  + Add Stock
                </button>
                <button 
                  onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                  disabled={product.stock <= 0}
                >
                  - Remove Stock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
