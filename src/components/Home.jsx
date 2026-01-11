import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden">
      {/* TOP STRIP - Mobile par scrolling text ya hide kar sakte hain */}
      <div className="bg-[#004d29] text-[9px] md:text-[10px] text-white py-2 text-center font-bold tracking-[0.2em] uppercase px-4">
        Official Islamic Banking Partner of Pakistan
      </div>

      {/* HEADER & NAV */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#006837] rounded-lg flex items-center justify-center text-white text-xl md:text-2xl font-bold">M</div>
            <h1 className="text-xl md:text-2xl font-black text-[#006837] italic tracking-tighter">MEEZAN BANK</h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 text-gray-700 font-bold text-sm uppercase">
            <Link to="/" className="hover:text-[#006837] transition">Personal</Link>
            <Link to="/" className="hover:text-[#006837] transition">Business</Link>
            <Link to="/" className="hover:text-[#006837] transition">About Us</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/login" className="text-[#006837] font-bold px-3 py-2 text-sm md:text-base">Login</Link>
            <Link to="/signup" className="bg-[#006837] text-white px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base hover:bg-[#004d29] transition shadow-md">
              Register
            </Link>
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-[#006837] p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b p-4 space-y-4 font-bold text-[#006837] animate-in slide-in-from-top duration-300">
            <Link to="/" className="block">Personal</Link>
            <Link to="/" className="block">Business</Link>
            <Link to="/" className="block">About Us</Link>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#006837] to-[#004d29] py-12 md:py-24 px-6 text-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-4xl md:text-7xl font-black leading-tight italic">
              Banking the <br /> <span className="text-[#ffd700]">Shariah</span> Way.
            </h2>
            <p className="text-base md:text-lg opacity-80 max-w-md mx-auto lg:mx-0 font-medium">
              Experience Pakistan's first and largest Islamic bank with cutting-edge digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/signup" className="bg-[#ffd700] text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl">
                OPEN ACCOUNT
              </Link>
              <button className="border-2 border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Card Visual - Desktop Only */}
          <div className="relative animate-in zoom-in duration-1000 hidden lg:block">
             <div className="bg-white/10 backdrop-blur-md p-10 rounded-[40px] border border-white/20 shadow-3xl transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold mb-2">Profit Rates</h3>
                <p className="opacity-70 mb-6 font-medium">Earn Riba-free halal profit on your savings every month.</p>
                <div className="text-5xl font-mono font-black text-[#ffd700]">Up to 14.5%</div>
             </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <div className="max-w-7xl mx-auto -mt-8 md:-mt-16 px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {[
          { title: 'Digital Banking', icon: '📱', desc: 'Secure mobile app access.' },
          { title: 'Car Ijarah', icon: '🚗', desc: 'Interest-free car financing.' },
          { title: 'Home Buyer', icon: '🏠', desc: 'Build your dream home.' },
          { title: 'Labbaik', icon: '🕋', desc: 'Hajj & Umrah savings.' }
        ].map((item) => (
          <div key={item.title} className="bg-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition border-b-8 border-[#006837] group">
            <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="font-black text-[#006837] text-lg md:text-xl">{item.title}</h3>
            <p className="text-gray-500 mt-2 text-sm font-semibold leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* TRUST SECTION */}
      <section className="py-16 md:py-24 text-center px-4">
          <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[3px] md:tracking-[5px] text-gray-400 mb-10">Trusted by 10 Million+ Pakistanis</h4>
          <div className="flex flex-wrap justify-center gap-6 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
             {['STATE BANK', 'SHARIAH BOARD', 'VISA', 'MASTER CARD'].map(trust => (
               <span key={trust} className="text-lg md:text-2xl font-black italic tracking-tighter">{trust}</span>
             ))}
          </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 opacity-70 text-xs md:text-sm text-center">
          <p className="font-medium">© 2026 Meezan Bank Limited. The Premier Islamic Bank.</p>
          <div className="flex space-x-6 font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-[#ffd700]">Terms</Link>
            <Link to="/" className="hover:text-[#ffd700]">Privacy</Link>
            <Link to="/" className="hover:text-[#ffd700]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

/*
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-[#006837] text-white p-6 text-center shadow-lg">
      <h1 className="text-3xl font-bold italic">MEEZAN BANK</h1>
      <p className="text-sm tracking-widest">The Premier Islamic Bank</p>
    </header>

    <nav className="bg-[#004d29] py-3 flex justify-center space-x-8 text-white font-medium">
      <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
      <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
      <Link to="/signup" className="hover:text-yellow-400 transition">Open Account</Link>
    </nav>

    <div className="relative h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.meezanbank.com/wp-content/themes/meezanbank/images/home-banner.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Shariah Compliant Banking</h2>
        <Link to="/login" className="bg-[#ffd700] text-[#006837] px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-500 transition shadow-xl">
          Get Started
        </Link>
      </div>
    </div>

    <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      {['Digital Banking', 'Car Ijarah', 'Home Buyer', 'Labbaik'].map((item) => (
        <div key={item} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#006837] text-center hover:scale-105 transition">
          <h3 className="font-bold text-[#006837] text-xl">{item}</h3>
          <p className="text-gray-600 mt-2 text-sm">Explore our world-class Islamic products.</p>
        </div>
      ))}
    </div>
  </div>
);

export default Home;
*/