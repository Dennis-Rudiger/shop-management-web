import React, { useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';

function Inventory() {
    const { products, updateStock } = useProductContext();
    const [openingStock, setOpeningStock] = useState({});

    // Store opening stock when component mounts
    useEffect(() => {
        const stockRecord = products.reduce((acc, product) => {
            acc[product.id] = product.stock;
            return acc;
        }, {});
        setOpeningStock(stockRecord);
    }, []);

    const getStockDifference = (productId, currentStock) => {
        const opening = openingStock[productId] || 0;
        return currentStock - opening;
    };

    return (
        <div className="inventory-container">
            <h2>Inventory Management</h2>
            <div className="inventory-grid">
                {products.map((product) => (
                    <div key={product.id} className="inventory-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <div className="stock-control">
                            <p>Opening Stock: {openingStock[product.id] || 0}</p>
                            <p>Current Stock: {product.stock}</p>
                            <p>Stock Change: {getStockDifference(product.id, product.stock)}</p>
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
