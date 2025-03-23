import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { products } from './data/products';
import { useCartStore } from './store/cartStore';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={toggleMobileMenu}
                    className="sm:hidden p-2 rounded-md text-neutral-900 hover:text-neutral-500"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <div className="flex-shrink-0 ml-4 sm:ml-0">
                    <Link to="/" className="text-2xl font-serif">GLOW</Link>
                  </div>
                </div>
                
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-8">
                    <Link to="/skincare" className="text-neutral-900 hover:text-neutral-500 px-3 py-2 text-sm font-medium">Skincare</Link>
                    <Link to="/makeup" className="text-neutral-900 hover:text-neutral-500 px-3 py-2 text-sm font-medium">Makeup</Link>
                    <Link to="/sets" className="text-neutral-900 hover:text-neutral-500 px-3 py-2 text-sm font-medium">Sets</Link>
                    <Link to="/about" className="text-neutral-900 hover:text-neutral-500 px-3 py-2 text-sm font-medium">About</Link>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="text-neutral-900 hover:text-neutral-500">
                    <Search className="h-5 w-5" />
                  </button>
                  <button className="text-neutral-900 hover:text-neutral-500">
                    <User className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleCart}
                    className="text-neutral-900 hover:text-neutral-500 relative"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-40 transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out sm:hidden`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300 ease-in-out`}
            onClick={toggleMobileMenu}
          />

          {/* Menu Content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-xl flex flex-col">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <Link to="/" className="text-2xl font-serif" onClick={toggleMobileMenu}>GLOW</Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-neutral-900 hover:text-neutral-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 px-4 py-6">
              <nav className="space-y-4">
                <Link
                  to="/skincare"
                  className="block text-neutral-900 hover:text-neutral-500 py-2 text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  Skincare
                </Link>
                <Link
                  to="/makeup"
                  className="block text-neutral-900 hover:text-neutral-500 py-2 text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  Makeup
                </Link>
                <Link
                  to="/sets"
                  className="block text-neutral-900 hover:text-neutral-500 py-2 text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  Sets
                </Link>
                <Link
                  to="/about"
                  className="block text-neutral-900 hover:text-neutral-500 py-2 text-base font-medium"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <div className="relative">
                <div className="absolute inset-0">
                  <img
                    className="w-full h-[600px] object-cover"
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Korean skincare products"
                  />
                  <div className="absolute inset-0 bg-neutral-900 bg-opacity-40"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Discover Korean Beauty</h1>
                  <p className="mt-6 text-xl text-white max-w-3xl">
                    Curated selection of premium K-beauty products for your skincare routine
                  </p>
                  <div className="mt-10">
                    <a
                      href="#products"
                      className="inline-block bg-white px-8 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-8">Best Sellers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </>
          } />
          
          <Route path="/skincare" element={<div className="max-w-7xl mx-auto px-4 py-8">Skincare Page</div>} />
          <Route path="/makeup" element={<div className="max-w-7xl mx-auto px-4 py-8">Makeup Page</div>} />
          <Route path="/sets" element={<div className="max-w-7xl mx-auto px-4 py-8">Sets Page</div>} />
          <Route path="/about" element={<div className="max-w-7xl mx-auto px-4 py-8">About Page</div>} />
        </Routes>

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/" className="text-base text-neutral-600 hover:text-neutral-900">New Arrivals</Link></li>
                  <li><Link to="/" className="text-base text-neutral-600 hover:text-neutral-900">Best Sellers</Link></li>
                  <li><Link to="/skincare" className="text-base text-neutral-600 hover:text-neutral-900">Skincare</Link></li>
                  <li><Link to="/makeup" className="text-base text-neutral-600 hover:text-neutral-900">Makeup</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/contact" className="text-base text-neutral-600 hover:text-neutral-900">Contact</Link></li>
                  <li><Link to="/shipping" className="text-base text-neutral-600 hover:text-neutral-900">Shipping</Link></li>
                  <li><Link to="/returns" className="text-base text-neutral-600 hover:text-neutral-900">Returns</Link></li>
                  <li><Link to="/faq" className="text-base text-neutral-600 hover:text-neutral-900">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-neutral-600 hover:text-neutral-900">About</Link></li>
                  <li><Link to="/blog" className="text-base text-neutral-600 hover:text-neutral-900">Blog</Link></li>
                  <li><Link to="/careers" className="text-base text-neutral-600 hover:text-neutral-900">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Newsletter</h3>
                <p className="mt-4 text-base text-neutral-600">Subscribe to get special offers, free giveaways, and updates.</p>
                <form className="mt-4">
                  <input
                    type="email"
                    className="block w-full px-4 py-2 text-neutral-900 placeholder-neutral-500 border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-800"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </footer>

        <Cart />
      </div>
    </Router>
  );
}

export default App;