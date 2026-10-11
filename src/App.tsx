import { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  Filter,
  Star,
  ArrowRight,
  X,
  Plus,
  Minus,
  LogOut,
  Lock,
  TrendingUp,
  Package,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { Product, CartItem } from './types/index';
import { products } from './data/products';

type SortMode = 'featured' | 'price-low' | 'price-high' | 'popular';
type View = 'shop' | 'account' | 'admin';

function App() {
  const [view, setView] = useState<View>('shop');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortMode>('featured');
  const [maxPrice, setMaxPrice] = useState(210);
  const [cartQty, setCartQty] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set([1, 7]));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.badge.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.reviews - a.reviews;
        default:
          return b.rating - a.rating;
      }
    });

    return result;
  }, [searchTerm, selectedCategory, sortBy, maxPrice]);

  const cartItems: CartItem[] = products
    .filter((p) => cartQty[p.id])
    .map((p) => ({ ...p, quantity: cartQty[p.id] }));

  const cartCount = Object.values(cartQty).reduce((sum, qty) => sum + qty, 0);
  const wishlistCount = wishlist.size;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const addToCart = (productId: number) => {
    setCartQty((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  const removeFromCart = (productId: number) => {
    setCartQty((prev) => {
      const newQty = { ...prev };
      if (newQty[productId] > 1) {
        newQty[productId]--;
      } else {
        delete newQty[productId];
      }
      return newQty;
    });
  };

  const toggleWishlist = (productId: number) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-accent-500 text-lg font-black text-white shadow-soft">
                S
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-slate-900">ShopNova</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
              <button onClick={() => setView('shop')} className="transition hover:text-primary-700">
                Shop
              </button>
              <button onClick={() => setView('account')} className="transition hover:text-primary-700">
                Account
              </button>
              <button onClick={() => setView('admin')} className="transition hover:text-primary-700">
                Admin
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary-300">
                Login
              </button>
              <button
                onClick={() => toggleWishlist(0)}
                className="relative rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:text-primary-700"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button className="relative rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:text-primary-700">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 lg:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-2">
            <button onClick={() => { setView('shop'); setShowMobileMenu(false); }} className="text-left px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-700">
              Shop
            </button>
            <button onClick={() => { setView('account'); setShowMobileMenu(false); }} className="text-left px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-700">
              Account
            </button>
            <button onClick={() => { setView('admin'); setShowMobileMenu(false); }} className="text-left px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary-700">
              Admin
            </button>
          </nav>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {view === 'shop' && (
          <>
            {/* Hero Search */}
            <section className="mb-12 rounded-[32px] bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 px-6 py-12 text-white md:px-8 md:py-16">
              <h1 className="max-w-2xl text-4xl font-black leading-tight md:text-5xl">
                Everything You Love, <span className="text-accent-300">One Click Away!</span>
              </h1>
              <p className="mt-4 max-w-lg text-base text-white/80 md:text-lg">
                Discover premium fashion essentials curated for modern living.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-full bg-white/95 px-4 py-3">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Filters Section */}
            <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Shop by Category</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortMode)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700">
                    <Filter className="h-4 w-4" />
                    <input
                      type="range"
                      min="30"
                      max="210"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-24 accent-primary-600"
                    />
                    <span>Up to ${maxPrice}</span>
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === null
                      ? 'bg-primary-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-primary-300'
                  }`}
                >
                  All
                </button>
                {['women', 'men', 'shoes', 'bags', 'jewellery'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition capitalize ${
                      selectedCategory === cat
                        ? 'bg-primary-700 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-primary-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Products Grid */}
            <section>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.has(product.id);
                  return (
                    <article key={product.id} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border ${
                            isWishlisted
                              ? 'border-red-200 bg-red-50 text-red-500'
                              : 'border-white/60 bg-white/80 text-slate-700'
                          } backdrop-blur-sm transition`}
                        >
                          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>
                        {product.badge && (
                          <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="rounded-full bg-primary-50 px-2 py-1 text-[10px] font-bold uppercase text-primary-700 capitalize">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>

                        <div className="mt-4 flex items-end justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-black text-slate-900">${product.price}</span>
                              <span className="text-sm font-medium text-slate-400 line-through">${product.originalPrice}</span>
                            </div>
                            <div className="text-xs font-bold uppercase text-accent-600">Save {product.discount}%</div>
                          </div>
                          <div className="text-right text-xs text-slate-500">{product.reviews} reviews</div>
                        </div>

                        <button
                          onClick={() => addToCart(product.id)}
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-800"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {view === 'account' && (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Auth Section */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">Account</p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">Welcome to ShopNova</h2>
              </div>

              {!isLoggedIn ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">Login</h3>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-300"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-300"
                      />
                      <button
                        onClick={() => setIsLoggedIn(true)}
                        className="w-full rounded-2xl bg-primary-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-800"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">Create Account</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full name"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-300"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-300"
                      />
                      <button
                        onClick={() => setIsLoggedIn(true)}
                        className="w-full rounded-2xl bg-accent-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-3xl bg-gradient-to-r from-primary-700 to-primary-900 p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase text-primary-200">Logged in as</p>
                        <h3 className="mt-1 text-2xl font-black">Sophia Carter</h3>
                      </div>
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-lg font-black">SC</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Section */}
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase text-primary-700">Shopping Cart</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">Order Summary</h2>
                </div>
                <div className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase text-primary-700">
                  {cartCount} items
                </div>
              </div>

              <div className="space-y-3">
                {cartItems.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Your cart is empty. Add items to see order summary.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500">${item.price} × {item.quantity}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-lg border border-slate-200 bg-white p-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="rounded-lg border border-slate-200 bg-white p-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 text-base font-black text-slate-900">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-600">
                <ArrowRight className="h-4 w-4" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {view === 'admin' && (
          <div className="space-y-6">
            {!adminUnlocked ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Admin Access Required</h3>
                <p className="mt-3 text-sm text-slate-600">This demo dashboard is protected. Click to unlock for a preview.</p>
                <button
                  onClick={() => setAdminUnlocked(true)}
                  className="mt-6 rounded-full bg-primary-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-800"
                >
                  Unlock Admin Portal
                </button>
              </div>
            ) : (
              <>
                {/* Admin Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { label: 'Revenue', value: '$84.2K', trend: '+18.4%' },
                    { label: 'Orders', value: '1,426', trend: '+12.1%' },
                    { label: 'Customers', value: '368', trend: '+9.7%' },
                    { label: 'Inventory', value: '92%', trend: '+5.3%' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between text-slate-500 text-sm font-medium mb-3">
                        <span>{stat.label}</span>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                      <div className="mt-1 text-xs font-bold uppercase text-emerald-600">{stat.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Admin Table */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h3 className="text-lg font-bold text-slate-900">Recent Products</h3>
                    <button className="rounded-full bg-primary-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-800">
                      Add Product
                    </button>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100">
                      <tr className="text-slate-600 font-semibold">
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map((product) => (
                        <tr key={product.id} className="border-t border-slate-200">
                          <td className="px-6 py-4 font-medium text-slate-800">{product.name}</td>
                          <td className="px-6 py-4 text-slate-600 capitalize">{product.category}</td>
                          <td className="px-6 py-4 text-slate-600">${product.price}</td>
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
                              In Stock
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-accent-500 text-lg font-black text-white">
                S
              </div>
              <div className="text-2xl font-black text-white">ShopNova</div>
            </div>
            <p className="mt-4 text-sm text-slate-300">Premium fashion destination for trend-led essentials.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>support@shopnova.com</li>
              <li>+1 (800) 555-0123</li>
              <li>Mon–Sat • 9am–9pm</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Policies</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Shipping & Returns</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 px-4 py-6 text-center text-sm text-slate-400 md:px-6">
          <p>© 2026 ShopNova. All rights reserved. This is a demo website.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
