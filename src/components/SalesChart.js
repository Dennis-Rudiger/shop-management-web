import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart({ sales, products }) {
  const [timePeriod, setTimePeriod] = useState('daily');

  const processDataByTimePeriod = () => {
    const currentDate = new Date();
    const filteredSales = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      if (timePeriod === 'daily') {
        return saleDate.toDateString() === currentDate.toDateString();
      } else if (timePeriod === 'weekly') {
        const weekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
        return saleDate >= weekAgo;
      } else if (timePeriod === 'monthly') {
        return saleDate.getMonth() === currentDate.getMonth() &&
               saleDate.getFullYear() === currentDate.getFullYear();
      }
      return true;
    });

    return filteredSales.reduce((acc, sale) => {
      const product = products.find(p => p.id === sale.productId);
      if (product) {
        acc[product.name] = (acc[product.name] || 0) + sale.price;
      }
      return acc;
    }, {});
  };

  const salesByProduct = processDataByTimePeriod();

  const chartData = {
    labels: Object.keys(salesByProduct),
    datasets: [
      {
        label: 'Sales Amount (KSH)',
        data: Object.values(salesByProduct),
        backgroundColor: 'rgba(34, 51, 130, 0.6)',
        borderColor: 'rgba(34, 51, 130, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales by Product (${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} View)`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const exportToCSV = () => {
    const salesData = Object.entries(salesByProduct)
      .map(([product, amount]) => `${product},${amount}`)
      .join('\n');
    
    const headers = 'Product,Amount (KSH)\n';
    const csv = headers + salesData;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${timePeriod}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="sales-chart">
      <div className="time-period-controls" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <select 
          value={timePeriod} 
          onChange={(e) => setTimePeriod(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button 
          onClick={exportToCSV}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#223382',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Export to CSV
        </button>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default SalesChart;
