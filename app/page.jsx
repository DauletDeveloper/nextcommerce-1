"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import items from "./DB/items";
import Link from "next/link";
import ItemPrice from "./components/Itemprice";
import { SearchIcon } from "lucide-react";
import { useMemo } from "react";
import Footer from "./components/Footer";
const Home = () => {
  const [price, setPrice] = useState({ from: "", to: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [opened, setOpened] = useState(true);
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("chosenProduct");
      if (!saved) return items;
      const chosen = JSON.parse(saved);
      return items.map((item) => {
        const found = chosen.find((c) => c.id === item.id);
        return { ...item, chosenCount: found ? found.count : 0 };
      });
    } catch {
      return items;
    }
  });
  const [theme, setTheme] = useState("Light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "Dark" ? "Light" : "Dark"));
  const isDark = theme === "Dark";
  const addCount = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, chosenCount: item.chosenCount + 1 } : item,
      ),
    );
  };

  const minusCount = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, chosenCount: Math.max(0, item.chosenCount - 1) }
          : item,
      ),
    );
  };
  useEffect(() => {
    const chosen = products
      .filter((item) => item.chosenCount > 0)
      .map((item) => ({ id: item.id, count: item.chosenCount }));

    localStorage.setItem("chosenProduct", JSON.stringify(chosen));
  }, [products]);
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const min = price.from ? Number(price.from) : 0;
      const max = price.to ? Number(price.to) : Infinity;

      const matchesPrice = item.price >= min && item.price <= max;

      const matchesSearch = item.name
        ? item.name.toLowerCase().includes((searchQuery || "").toLowerCase())
        : false;

      return matchesPrice && matchesSearch;
    });
  }, [products, searchQuery, price]);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === "Dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Header cardData={products} theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-20 p-6">
        <div
          className={`flex gap-4 p-3 items-center ${isDark ? "bg-slate-800 text-white" : "bg-white text-black"} shadow-sm`}
        >
          <div className="relative flex-1 flex-col">
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-2 rounded-xl border ${isDark ? "bg-slate-700 border-slate-600" : "bg-gray-100 border-gray-300"} outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Search Product..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 size-5 text-gray-400 hover:cursor-pointer" />
            {opened ? (
              <div
                className={`flex mt-5 flex-col gap-3 p-5 rounded-2xl w-full max-w-[2600px] border shadow-sm transition-all ${
                  isDark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-semibold tracking-wide uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Price Range
                  </span>
                  <button
                    onClick={() => setOpened(false)}
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-lg leading-none transition-colors ${
                      isDark
                        ? "text-slate-400 hover:bg-slate-700 hover:text-white"
                        : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {["From", "To"].map((label) => {
                    const key = label.toLowerCase();
                    return (
                      <div key={label} className="relative">
                        <span
                          className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? "text-slate-400" : "text-slate-400"}`}
                        >
                          $
                        </span>
                        <input
                          value={price[key]}
                          onChange={(e) =>
                            setPrice((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          type="number"
                          placeholder={label}
                          className={`w-full pl-7 pr-3 py-2.5 rounded-xl text-sm font-medium border outline-none transition-all focus:ring-2 ${
                            isDark
                              ? "bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/20"
                              : "bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/20"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                <button className="mt-1 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white text-sm font-semibold transition-all">
                  Apply
                </button>
              </div>
            ) : (
              <div className="items-center justify-center flex mt-3">
              <button
                onClick={() => setOpened(true)}
                className={`flex items-center w-50 justify-center border-3 gap-2 px-4 py-2.5 rounded-xl h-15 text- font-semibold border transition-all active:scale-95 hover:shadow-md ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    : "bg-white border-slate-800 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Set Price
              </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 p-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className={`group w-[300px] h-[400px] flex flex-col justify-between p-6 rounded-xl hover:shadow-lg transition-shadow border border-transparent hover:border-blue-500 ${isDark ? "bg-slate-900 text-white" : "bg-white text-black"}`}
            >
              <Link href={`/cartabout/${item.slug}`}>
             {item.bestSeller && (
              <div className="bg-amber-200 text-black w-fit px-3 py-1 rounded-full items-center justify-center flex italic font-bold text-xl">
              <span className="mr-1 not-italic">🔥</span>
               BestSeller
            </div>
             )}
                <div className="w-full h-[200px] overflow-hidden rounded-lg mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full object-cover hover:scale-101 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold group-hover:text-blue-500 transition-colors">
                    {item.name}
                  </h1>
                </div>
                <h1>
                  <ItemPrice item={`${item.price}`} />
                </h1>
              </Link>
              <div>
                <div className="flex items-center justify-center border-black bg-white text-black w-40 h-10 border rounded-[14px] overflow-hidden">
                  {item.chosenCount > 0 ? (
                    <div className="flex items-center justify-between w-full h-full">
                      <button
                        onClick={() => minusCount(item.id)}
                        className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>

                      <span className="font-bold">{item.chosenCount}</span>

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
                      className="w-full h-full duration-500 transition-all ease-in-out hover:cursor-pointer hover:bg-black hover:text-white"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;