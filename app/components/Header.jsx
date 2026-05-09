"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Sun, Moon } from "lucide-react";
import Link from "next/link";

const Header = ({ theme, toggleTheme, cardData }) => {
  const [chosen, setChosen] = useState(0);
  useEffect(() => {
    const total = cardData.reduce((sum, item) => sum + (item.chosenCount || 0), 0);
    setChosen(total);
  }, [cardData]); 
  


  return (
    <div className={`fixed top-0 left-0 border-b-2 flex items-center w-full h-16 px-6 z-50 transition-colors duration-300 ${
      theme === 'Dark' ? 'bg-black border-gray-800 text-white' : 'bg-white border-gray-200 text-black'
    }`}>
      
      <div className="flex font-semibold italic">
        <h1 className="font-bold text-3xl">GoodStore</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        

        <div 
          onClick={toggleTheme}
          className={`flex items-center justify-center p-2 border-2 rounded-lg cursor-pointer transition-all active:scale-90 ${
            theme === 'Dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'
          }`}
        >
          {theme === 'Dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
        </div>


        <Link href='/cart' className={`flex items-center justify-center gap-2 h-10 px-4 border-2 font-semibold rounded-lg cursor-pointer transition-all active:scale-95 ${
          theme === 'Dark' ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'
        }`}>
          <ShoppingCart size={20} />
          <span className="text-sm text-nowrap">Cart ({chosen}) </span>
        </Link>


        <div className={`flex items-center justify-center gap-2 h-10 px-4 border-2 font-semibold rounded-lg cursor-pointer transition-all active:scale-95 ${
          theme === 'Dark' ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'
        }`}>
          <User size={20} />
          <span className="text-sm text-nowrap">Log In</span>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
