# ShopNova - Premium Fashion Storefront

ShopNova is a modern, fully responsive fashion e-commerce website built with React, TypeScript, and Tailwind CSS. It features a beautiful homepage, product categories, search functionality, cart management, wishlist, and a demo admin dashboard.

## Features

✨ **Homepage & Hero Section**
- Premium branded experience with gradient hero banner
- Integrated search functionality
- Call-to-action buttons

👗 **Product Catalog**
- 5 categories: Women's Clothing, Men's Clothing, Shoes, Bags, Jewellery
- 15 demonstration products with real images
- Product ratings and reviews
- Price comparison (original vs. sale price)
- Discount badges

🔍 **Search & Filtering**
- Real-time search by product name and badge
- Category filters (All, Women, Men, Shoes, Bags, Jewellery)
- Price range slider (up to $210)
- Sort options: Featured, Price (Low-High), Price (High-Low), Most Popular

🛒 **Shopping Features**
- Add to Cart functionality with quantity tracking
- Remove from Cart with quantity adjustment
- Working wishlist with persistent state
- Cart item count badge
- Order summary with subtotal, shipping, and total

👤 **User Account**
- Demo login interface
- Demo signup interface
- Account profile section (when logged in)
- Order history view
- Saved addresses (demo data)

🔐 **Admin Dashboard**
- Protected admin access (unlock with button)
- Sales analytics and statistics
- Product inventory management
- Revenue tracking
- Quick actions for common tasks

📱 **Responsive Design**
- Mobile-first approach
- Fully responsive on tablets and desktops
- Touch-friendly navigation
- Optimized header and footer

## Tech Stack

- **Frontend:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yadavhimanshuyadav468-cyber/shopnova.git
   cd shopnova
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - The terminal will show a local URL (typically `http://localhost:3000`)
   - Open that URL in your web browser
   - The site supports hot-reloading, so changes appear instantly

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
shopnova/
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   ├── styles.css           # Global styles with Tailwind
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   └── data/
│       └── products.ts      # Product catalog data
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## Demo Features

### Shopping Experience
1. Browse products in the Shop view
2. Filter by category and price
3. Search for specific products
4. Add items to cart
5. Manage cart quantity
6. Add/remove from wishlist
7. View order summary

### Account Section
1. Try login/signup forms (demo only, no backend)
2. View logged-in account profile
3. See order history
4. View saved addresses

### Admin Portal
1. Click "Unlock Admin Portal" to access dashboard
2. View sales statistics and metrics
3. Browse product inventory
4. See quick action buttons for common tasks

## Important Notes

⚠️ **Demo Limitations:**
- No real payment processing (checkout button is demo only)
- No actual user authentication or data persistence
- No backend database (Supabase or other)
- All data is stored in component state (resets on page refresh)
- Product images are from Unsplash (external links)
- Login/signup do not store credentials

## Future Enhancements

When ready to deploy as a real store:

1. **Backend Setup:**
   - Connect to Supabase for authentication
   - Set up product database
   - Create order management system

2. **Payment Integration:**
   - Integrate Stripe or PayPal
   - Implement secure checkout
   - Add order confirmation emails

3. **User Accounts:**
   - Persistent user profiles
   - Order history tracking
   - Saved payment methods
   - Wishlist persistence

4. **Admin Features:**
   - Real product management
   - Inventory tracking
   - Sales analytics
   - Customer support tools

5. **Mobile App:**
   - React Native implementation
   - Push notifications
   - Native payment methods

## License

MIT License - feel free to use this project for learning and development.

## Support

For questions or issues:
- Email: support@shopnova.com
- Phone: +1 (800) 555-0123
- Hours: Mon–Sat, 9am–9pm

---

**Built with ❤️ for fashion lovers everywhere.**
