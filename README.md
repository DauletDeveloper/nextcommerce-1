🛍️ GoodStore — E-Commerce App
> **Quality products, honest prices.** Built with Next.js & Tailwind CSS.
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![Live Demo](https://img.shields.io/badge/Live-Demo-green?logo=vercel)
---
🌐 Live Demo
👉 https://ecommerceapp3431.web.app/
---
📸 Features
🛒 Shopping Cart — Add/remove products, real-time item count
🔥 Best Seller Badges — Highlighted trending products
💲 Price Range Filter — Filter products by min/max price
📦 Product Detail Pages — Individual pages for each product (`/cartabout/[slug]`)
🔐 Authentication — Log In / Log Out flow
📱 Fully Responsive — Mobile-first design with Tailwind CSS
🚀 Static Generation — Fast page loads via Next.js SSG/SSR
---
🛠️ Tech Stack
Layer	Technology
Framework	Next.js (App Router)
Styling	Tailwind CSS
Hosting	Firebase Hosting
Language	TypeScript / JavaScript
State	React Context / useState
---
🚀 Getting Started
Prerequisites
Node.js `>= 18.x`
npm or yarn
Installation
```bash
# Clone the repository
git clone https://github.com/your-username/goodstore.git
cd goodstore

# Install dependencies
npm install
```
Development
```bash
npm run dev
```
Open http://localhost:3000 in your browser.
Build for Production
```bash
npm run build
npm run start
```
---
📁 Project Structure
```
goodstore/
├── app/
│   ├── page.tsx               # Home — product listing
│   ├── cart/
│   │   └── page.tsx           # Cart page
│   └── cartabout/
│       └── [slug]/
│           └── page.tsx       # Product detail page
├── components/
│   ├── Header.tsx             # Navigation & cart icon
│   ├── ProductCard.tsx        # Product tile with "Add to cart"
│   ├── PriceFilter.tsx        # Min/max price filter
│   └── Footer.tsx             # Footer with links
├── context/
│   └── CartContext.tsx        # Global cart state
├── data/
│   └── products.ts            # Static product catalogue
├── public/                    # Static assets & images
├── tailwind.config.ts
└── next.config.ts
```
---
🛍️ Product Catalogue
Product	Price
Wireless Headphones Pro	$199.99
Ultra Thin Power Bank	$49.99
Solo Coffee Brewing Kit	$29.99
Air Cleaner	$39.99
Smart Watch Active	$129.99
Urban Leather Backpack	$89.99
Mechanical RGB Keyboard	$110.99
Pure Air Humidifier	$45.99
Boom Portable Speaker	$75.99
Classic White Sneakers	$65.99
Minimalist LED Lamp	$35.99
---
🔥 Deployment (Firebase Hosting)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login & init
firebase login
firebase init hosting

# Build & deploy
npm run build
firebase deploy
```
Make sure your `firebase.json` points to the Next.js export output:
```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```
---
📄 Scripts
Command	Description
`npm run dev`	Start local development server
`npm run build`	Create optimized production build
`npm run start`	Start production server locally
`npm run lint`	Run ESLint checks
---
👤 Author
Daulet Nursagat
> Built to demonstrate Next.js + Tailwind CSS skills.
---
📜 License
This project is open-source and available under the MIT License.
