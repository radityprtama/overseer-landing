import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CodeComparison } from './components/CodeComparison';
import { Features } from './components/Features';
import { Integrations } from './components/Integrations';
import { UseCases } from './components/UseCases';
import { Deployment } from './components/Deployment';
import { Footer } from './components/Footer';
import { CTA } from './components/CTA';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';

// Landing Page Component to group home sections
const Landing = () => (
  <>
    <Hero />
    <Integrations />
    <CodeComparison />
    <Features />
    <UseCases />
    <Deployment />
    <CTA />
    <FAQ />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;