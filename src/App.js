import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Orders from './pages/Orders';
import Portfolio from './pages/Portfolio';
import MarketData from './pages/MarketData';
import Ledger from './pages/Ledger';
import TradeHistory from './pages/TradeHistory';
import PLAnalyzer from './pages/PLAnalyzer';
import Options from './pages/Options';

const App = () => {
  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/market-data">Market Data</Link>
          <Link to="/trade-history">Trade History</Link>
          <Link to="/pl-analyzer">Profit & Loss</Link>
          <Link to="/ledger">Ledger</Link>
          <Link to="/Options">Options</Link>

        </nav>
      </header>
      <Layout>
        <main>
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/market-data" element={<MarketData />} />
            <Route path="/trade-history" element={<TradeHistory />} />
            <Route path="/pl-analyzer" element={<PLAnalyzer />} />
            <Route path="/ledger" element={<Ledger />} />
            <Route path="/options" element={<Options />} />
          </Routes>
        </main>
      </Layout>
      <footer>
        <p>Made with ❤️ by Akash</p>
      </footer>
    </Router>
  );
};

export default App;
