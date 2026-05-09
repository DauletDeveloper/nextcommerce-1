import { FunnelX } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  chosenCount: number;
  bestSeller: boolean;
  rating: number;
  description: string; 
}


export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    slug: "wireless-headphones-pro",
    price: 199.99,
    stock: 25,
    image: '/Headphones.jpg',
    chosenCount: 0,
    bestSeller: true,
    rating: 47,
    description: "Premium noise-canceling headphones with 40-hour battery life and spatial audio support."
  },
  {
    id: 9,
    name: "Ultra Thin Power Bank",
    slug: "power-bank-20k",
    price: 49.99,
    stock: 100,
    image: "/Powerbank.jpg",
    chosenCount: 0,
    bestSeller: true,
    rating: 50,
    description: "Pocket-sized 20,000mAh battery pack with fast charging and dual USB-C ports."
  },
  {
    id: 10,
    name: "Solo Coffee Brewing Kit",
    slug: "coffee-set-solo",
    price: 29.99,
    stock: 18,
    image: "/Kit.jpg",
    chosenCount: 0,
    bestSeller: true,
    rating: 50,
    description: "Everything you need for the perfect pour-over: ceramic dripper, filters, and glass server."
  },
  {
    id: 11,
    name: 'Air Cleaner',
    slug: 'air-cleaner',
    price: 39.99,
    stock: 3,
    image: '/Airclean.jpg',
    chosenCount: 0,
    bestSeller: true,
    rating: 49,
    description: "Compact HEPA filter air purifier that removes 99% of dust, pollen, and smoke."
  },
  {
    id: 2,
    name: "Smart Watch Active",
    slug: "smart-watch-active",
    price: 129.99,
    stock: 12,
    image: "/SmartWatch.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 49,
    description: "Track your fitness, heart rate, and sleep with this sleek, water-resistant smartwatch."
  },
  {
    id: 3,
    name: "Urban Leather Backpack",
    slug: "leather-backpack-urban",
    price: 89.99,
    stock: 8,
    image: "/BackPack.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 45,
    description: "Handcrafted genuine leather backpack with a padded 15-inch laptop compartment."
  },
  {
    id: 4,
    name: "Mechanical RGB Keyboard",
    slug: "mechanical-keyboard-rgb",
    price: 110.99,
    stock: 15,
    image: "/Keyboard.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 33,
    description: "Tactile blue switches and customizable RGB lighting for the ultimate gaming experience."
  },
  {
    id: 5,
    name: "Pure Air Humidifier",
    slug: "air-humidifier-pure",
    price: 45.99,
    stock: 40,
    image: "/Cyberpunk.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 39,
    description: "Ultrasonic cool mist humidifier with a 2-liter tank and silent operation for bedrooms."
  },
  {
    id: 6,
    name: "Boom Portable Speaker",
    slug: "portable-speaker-boom",
    price: 75.99,
    stock: 20,
    image: "/Speaker.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 41,
    description: "Rugged, IPX7 waterproof Bluetooth speaker with deep bass and 360-degree sound."
  },
  {
    id: 7,
    name: "Classic White Sneakers",
    slug: "sneakers-classic-white",
    price: 65.99,
    stock: 33,
    image: "/Shoes.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 45,
    description: "Timeless minimalist design made with recycled materials and breathable fabric."
  },
  {
    id: 8,
    name: "Minimalist LED Lamp",
    slug: "desk-lamp-led",
    price: 35.99,
    stock: 50,
    image: "/Lamp.jpg",
    chosenCount: 0,
    bestSeller: false,
    rating: 42,
    description: "Adjustable desk lamp with three color temperatures and touch-sensitive controls."
  },
];

export default products;
