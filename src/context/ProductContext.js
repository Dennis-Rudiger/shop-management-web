import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 999.99,
      stock: 10,
      image: "https://picsum.photos/id/1/200"
    },
    {
      id: 2,
      name: "Smartphone",
      price: 499.99,
      stock: 15,
      image: "https://picsum.photos/id/2/200"
    },
    {
      id: 3,
      name: "Headphones",
      price: 99.99,
      stock: 20,
      image: "https://picsum.photos/id/3/200"
    },
    {
      id: 4,
      name: "Tablet",
      price: 299.99,
      stock: 8,
      image: "https://picsum.photos/id/4/200"
    }
  ]);

  const [sales, setSales] = useState([]);

  const addToCart = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId && product.stock > 0) {
        return { ...product, stock: product.stock - 1 };
      }
      return product;
    }));

    setSales([...sales, { productId, date: new Date(), price: products.find(p => p.id === productId).price }]);
  };

  const updateStock = (productId, newStock) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, stock: newStock };
      }
      return product;
    }));
  };

  return (
    <ProductContext.Provider value={{ products, sales, addToCart, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
