import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    // Initial products data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Mineral Water 500ml",
            price: 29.99,
            stock: 100,
            image: "https://example.com/mineral-water.jpg"
        },
        {
            id: 2,
            name: "Sparkling Water",
            price: 39.99,
            stock: 80,
            image: "https://example.com/sparkling-water.jpg"
        },
        {
            id: 3,
            name: "Flavored Water",
            price: 34.99,
            stock: 60,
            image: "https://example.com/flavored-water.jpg"
        }
    ]);

    // Sales data
    const [sales, setSales] = useState([]);

    // Cart functionality
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product && product.stock > 0) {
            // Add to sales
            setSales(prev => [...prev, {
                productId,
                price: product.price,
                date: new Date().toISOString()
            }]);
            
            // Update stock
            updateStock(productId, product.stock - 1);
        }
    };

    // Inventory management
    const updateStock = (productId, newStock) => {
        setProducts(products.map(product =>
            product.id === productId
                ? { ...product, stock: newStock }
                : product
        ));
    };

    const value = {
        products,
        setProducts,
        sales,
        setSales,
        addToCart,
        updateStock
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
