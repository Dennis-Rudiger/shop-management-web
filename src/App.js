import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="shop-header">
          <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏪 Duka</Link></h1>
        </header>
        <main className="shop-main">
          <nav className="shop-nav">
            <Link to="/"><button>📦 Products</button></Link>
            <Link to="/inventory"><button>🗒️ Inventory</button></Link>
            <Link to="/sales"><button>💰 Sales</button></Link>
          </nav>
          
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Navigate to="/" replace />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
