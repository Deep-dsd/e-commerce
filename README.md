# Product Listing App

A modern e-commerce product listing application built with Next.js 14, TypeScript, and Tailwind CSS. Features product browsing, shopping cart functionality, and persistent cart storage.

## Features

- **Product Listing**: Browse products with pagination
- **Shopping Cart**: Add, remove, and update product quantities
- **Persistent Storage**: Cart data persists across browser sessions
- **Stock Management**: Real-time stock validation
- **Responsive Design**: Works seamlessly on desktop and mobile
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Context API**
- **Local Storage** for cart persistence

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/Deep-dsd/e-commerce.git
cd e-commerce
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /products       # Products listing page
  /cart           # Shopping cart page        
  layout.tsx      # Root layout with providers
  page.tsx        # Home page
  globals.css     # Global styles

/components
  /providers      # Context providers wrapper
  /navbar         # Navigation component
  /products       # Product-related components
  /cart           # Cart-related components
  /ui             # UI components

/context
  useProductsContext.tsx  # Products data management
  useCartContext.tsx      # Cart state management

/lib              # For utility functions
/models           # For TypeScript Models

```

## Key Features Explained

### Product Management
- Fetches products from DummyJSON API
- Implements pagination (12 items per page)
- Shows stock status and low stock warnings
- Displays product images, descriptions, and prices

### Shopping Cart
- Add products to cart with quantity management
- Visual indicators for items already in cart
- Stock-based quantity limits
- Persistent cart using localStorage
- Real-time total calculations

### State Management
- React Context API for global state
- Separate contexts for products and cart
- TypeScript interfaces for type safety

## API Integration

Uses [DummyJSON Products API](https://dummyjson.com/products) for product data with:
- Pagination support
- Product details (title, description, price, stock, images)
- Error handling and loading states

## Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interface elements
- Optimized for various screen sizes

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- localStorage support for cart persistence

