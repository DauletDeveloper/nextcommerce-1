'use client';
import { useEffect, useState } from "react";
import items from "../DB/items";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function ItemPrice({ item }) {
  return <span className="text-lg font-semibold">${Number(item).toFixed(2)}</span>;
}

export default function CartPage() {
  const [theme, setTheme] = useState("Light");
  const [products, setProducts] = useState([]);
  const otherProducts = items.filter(i => i.chosenCount >= 0);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    try {
      const saved = localStorage.getItem("chosenProduct");
      if (!saved) return;
      const chosen = JSON.parse(saved);
      const cartItems = chosen
        .map(({ id, count }) => {
          const item = items.find((i) => i.id === id);
          return item ? { ...item, chosenCount: count } : null;
        })
        .filter(Boolean);
      setProducts(cartItems);
    } catch {
      setProducts([]);
    }
  }, []);

  const updateLocalStorage = (updated) => {
    const chosen = updated
      .filter((i) => i.chosenCount > 0)
      .map((i) => ({ id: i.id, count: i.chosenCount }));
    localStorage.setItem("chosenProduct", JSON.stringify(chosen));
  };

  const addCount = (id) => {
    setProducts((prev) => {
      const exists = prev.find((item) => item.id === id);
      let updated;
      if (exists) {
        updated = prev.map((item) =>
          item.id === id ? { ...item, chosenCount: item.chosenCount + 1 } : item
        );
      } else {
        const item = items.find((i) => i.id === id);
        updated = [...prev, { ...item, chosenCount: 1 }];
      }
      updateLocalStorage(updated);
      return updated;
    });
  };

  const minusCount = (id) => {
    setProducts((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id ? { ...item, chosenCount: item.chosenCount - 1 } : item
        )
        .filter((item) => item.chosenCount > 0);
      updateLocalStorage(updated);
      return updated;
    });
  };

  const isDark = theme === "Dark";
  const totalPrice = products.reduce((sum, item) => sum + Number(item.price || 0) * item.chosenCount, 0);
  const totalProducts = products.reduce((sum, item) => sum + item.chosenCount, 0);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDark ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <Link href="/" className="flex items-center gap-2 p-4">
        <ArrowLeft size={35} />
        <h1 className="font-semibold text-3xl">Go back</h1>
      </Link>

      <main className="p-4 flex-grow flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h1>
          <p>Products: {totalProducts}</p>
        </div>

        {products.length === 0 && (
          <p className="text-gray-400 mt-10">Cart empty</p>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className={`group w-[300px] h-[400px] flex flex-col justify-between p-6 rounded-xl hover:shadow-lg transition-shadow border border-transparent hover:border-blue-500 ${
                isDark ? "bg-slate-900 text-white" : "bg-white text-black"
              }`}
            >
              <Link href={`/cartabout/${item.slug}`}>
                <div className="w-full h-[200px] overflow-hidden rounded-lg mb-4">
                  <img src={item.image} alt={item.name} className="w-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <h1 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{item.name}</h1>
                <ItemPrice item={`${item.price}`} />
              </Link>

              <div className="flex items-center justify-center border-black bg-white text-black w-40 h-10 border rounded-[14px] overflow-hidden">
                <div className="flex items-center justify-between w-full h-full">
                  <button onClick={() => minusCount(item.id)} className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer">-</button>
                  <span className="font-bold">{item.chosenCount}</span>
                  <button onClick={() => addCount(item.id)} className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Link href='/pay' className="items-center justify-center flex">
      <button className={`${isDark ? 'bg-slate-800 text-white' : 'bg-black text-white'} w-50 h-15 rounded-[14px] text-3xl font-bold italic hover:scale-101 hover:bg-white hover:text-black duration-100 border-black border border-2`} >Buy</button>
      </Link>
      <h2 className="text-3xl font-bold text-center mb-8">
          Other products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherProducts.map(item => (
            <div
              key={item.id}
              className={` flex flex-col justify-between p-6 rounded-xl hover:shadow-2xl transition-all border hover:border-blue-500 group`}
            >
              <Link
                href={`/cartabout/${item.slug}`}
                className="flex-grow"
              >
                <div className="w-full h-[180px] overflow-hidden rounded-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors line-clamp-2">
                  {item.name}
                </h3>

                <div className="mt-2">
                  <ItemPrice item={`${item.price}`} />
                </div>
              </Link>

              <div className="flex items-center justify-center border-black bg-white text-black w-40 h-10 border rounded-[14px] overflow-hidden">
                {item.chosenCount > 0 ? (
                  <div className="flex items-center justify-between w-full h-full">
                    <button
                      onClick={() => minusCount(item.id)}
                      className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.chosenCount}
                    </span>

                    <button
                      onClick={() => addCount(item.id)}
                      className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addCount(item.id)}
                    className="w-full h-full hover:bg-black hover:text-white transition-all"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}