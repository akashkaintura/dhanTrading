import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Orders from './pages/Orders';
import Portfolio from './pages/Portfolio';
import MarketData from './pages/MarketData';
import Ledger from './pages/Ledger';
import TradeHistory from './pages/TradeHistory';
import PLAnalyzer from './pages/PLAnalyzer';

const App = () => {
  return (
    <Router>

      <main>
        <Layout>
          <header>
            <nav>
              <a href="/">Home</a>
              <a href="/orders">Orders</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/market-data">Market Data</a>
              <a href="/trade-history">Trade History</a>
              <a href="/pl-analyzer">Profit & Loss</a>
              <a href="/ledger">Ledger</a>
            </nav>
          </header>
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/market-data" element={<MarketData />} />
            <Route path="/trade-history" element={<TradeHistory />} />
            <Route path="/pl-analyzer" element={<PLAnalyzer />} />
            <Route path="/ledger" element={<Ledger />} />
          </Routes>
        </Layout>
      </main>
      <footer>
        <p>Made with ❤️ by Akash</p>
      </footer>
    </Router>
  );
};

export default App;
