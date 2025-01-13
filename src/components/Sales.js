import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import SalesChart from './SalesChart';

function Sales() {
    const { sales, products } = useProductContext();
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'chart'

    const getProductName = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : 'Unknown Product';
    };

    const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);

    return (
        <div className="sales-container">
            <h2>Sales Report</h2>
            <div className="view-toggle">
                <button 
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                >
                    List View
                </button>
                <button 
                    className={viewMode === 'chart' ? 'active' : ''}
                    onClick={() => setViewMode('chart')}
                >
                    Chart View
                </button>
            </div>
            <div className="sales-summary">
                <div className="sales-card">
                    <h3>Total Sales</h3>
                    <p className="total-amount">KSH {totalSales.toFixed(2)}</p>
                </div>
                <div className="sales-card">
                    <h3>Total Transactions</h3>
                    <p className="total-transactions">{sales.length}</p>
                </div>
            </div>
            
            {viewMode === 'chart' ? (
                <SalesChart sales={sales} products={products} />
            ) : (
                <div className="sales-list">
                    <h3>Recent Sales</h3>
                    {sales.map((sale, index) => (
                        <div key={index} className="sale-item">
                            <span>{getProductName(sale.productId)}</span>
                            <span>KSH {sale.price.toFixed(2)}</span>
                            <span>{new Date(sale.date).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Sales;
