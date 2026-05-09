import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-14 pb-8 px-6">
      <div className="max-w-6xl mx-auto">


        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">


          <div className="flex flex-col gap-3 max-w-xs">
            <span className="font-semibold italic text-4xl text-white">GoodStore</span>
            <p className="text-slate-400 text-sm leading-relaxed">
              Quality products, honest prices. We make online shopping feel good again.
            </p>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Shop</h4>
              {["All Products", "New Arrivals", "Best Sellers", "Sale"].map(l => (
                <Link key={l} href="#" className="text-slate-400 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Support</h4>
              {["FAQ", "Shipping", "Returns", "Contact Us"].map(l => (
                <Link key={l} href="#" className="text-slate-400 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs">Company</h4>
              {["About", "Blog", "Careers", "Privacy Policy"].map(l => (
                <Link key={l} href="#" className="text-slate-400 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">© Builded By Daulet Nursagat for showing Next+Tailwind skills.</p>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;