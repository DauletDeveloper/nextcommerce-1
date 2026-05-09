'use client';

import Items from '../../DB/items';
import ItemPrice from '../../components/Itemprice';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, use } from 'react';

export default function Page({ params }) {
  const { slug } = use(params);

  const [products, setProducts] = useState(Items);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch {
        setTheme(savedTheme);
      }
    }
  }, []);

  const product = products.find(i => i.slug === slug);

  const addCount = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, chosenCount: item.chosenCount + 1 }
          : item
      )
    );
  };

  const minusCount = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              chosenCount: Math.max(0, item.chosenCount - 1),
            }
          : item
      )
    );
  };

  const isDark = theme?.toLowerCase() === 'dark';

  if (!product) {
    return (
      <div className="p-20 text-center">
        Товар "{slug}" не найден
      </div>
    );
  }

  const otherProducts = products.filter(i => i.slug !== slug);

  const bgClass =
    isDark ? 'bg-[#020617] text-white' : 'bg-white text-black';

  const cardClass =
    isDark
      ? 'bg-[#09090b] border-gray-800'
      : 'bg-gray-100 border-transparent';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgClass}`}>
      <div className="max-w-7xl mx-auto p-4">

        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-3xl hover:scale-105 duration-300 ease-in-out w-fit"
        >
          <ArrowLeft size={40} />
          Go back
        </Link>

        <div className="p-[40px] items-center justify-center flex">
          <div
            className={`${cardClass} w-[350px] min-h-[500px] flex flex-col justify-between p-8 rounded-2xl shadow-2xl border transition-all group hover:border-blue-500`}
          >
            <div className="w-full h-[250px] overflow-hidden rounded-xl mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold group-hover:text-blue-500 transition-colors mb-2">
                {product.name}
              </h1>

              <ItemPrice item={`${product.price}`} />
            <h1 className=' italic text-xl'>{product.description}</h1>
            </div>
            <div className="flex items-center justify-center border-black bg-white text-black w-40 h-10 border rounded-[14px] overflow-hidden">
              {product.chosenCount > 0 ? (
                <div className="flex items-center justify-between w-full h-full">
                  <button
                    onClick={() => minusCount(product.id)}
                    className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {product.chosenCount}
                  </span>

                  <button
                    onClick={() => addCount(product.id)}
                    className="px-4 h-full hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addCount(product.id)}
                  className="w-full h-full hover:bg-black hover:text-white transition-all"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className={`my-12 ${isDark ? 'border-gray-800' : 'border-gray-300'}`} />

        <h2 className="text-3xl font-bold text-center mb-8">
          Other products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherProducts.map(item => (
            <div
              key={item.id}
              className={`${cardClass} flex flex-col justify-between p-6 rounded-xl hover:shadow-2xl transition-all border hover:border-blue-500 group`}
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
    </div>
  );
}