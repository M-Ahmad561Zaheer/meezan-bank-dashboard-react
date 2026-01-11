import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-0 md:p-6 lg:p-10 font-sans">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row bg-white md:rounded-[40px] shadow-2xl overflow-hidden max-w-6xl w-full min-h-screen md:min-h-[700px] border border-gray-100">
        
        {/* LEFT SIDE: Branding & Benefits - Desktop par Sidebar, Mobile par Top Header */}
        <div className="w-full md:w-5/12 lg:w-4/12 bg-[#006837] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter mb-2 uppercase">MEEZAN BANK</h1>
            <div className="w-12 h-1 bg-yellow-400 mb-6 md:mb-10 mx-auto md:mx-0"></div>
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-4">Start your Halal <br className="hidden md:block"/> banking journey.</h2>
            <p className="text-sm opacity-70 hidden md:block font-medium">Join 10 million+ Pakistanis in the digital Islamic revolution.</p>
          </div>
          
          {/* Features: Icons change horizontally on mobile */}
          <div className="relative z-10 grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-8 my-8 md:my-0">
            {[
              { i: '⚡', t: 'Instant' },
              { i: '🔒', t: 'Secure' },
              { i: '🌙', t: 'Shariah' }
            ].map((feat, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 text-center md:text-left">
                <span className="bg-white/10 p-3 rounded-2xl text-xl backdrop-blur-sm">{feat.i}</span>
                <p className="text-[10px] md:text-sm font-bold uppercase md:capitalize tracking-widest md:tracking-normal">{feat.t}</p>
              </div>
            ))}
          </div>

          <p className="text-[9px] opacity-50 uppercase tracking-[4px] font-black hidden md:block">The Premier Islamic Bank</p>
        </div>

        {/* RIGHT SIDE: Form Section */}
        <div className="w-full md:w-7/12 lg:w-8/12 p-8 md:p-16 bg-white rounded-t-[35px] md:rounded-none -mt-8 md:mt-0 relative z-20">
          <div className="mb-8 md:mb-12">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Open Digital Account</h3>
            <p className="text-gray-400 font-bold text-sm mt-2">Enter your information as per CNIC.</p>
          </div>

          <form className="space-y-6 md:space-y-8">
            {/* Personal Info Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-[#006837] transition-all">Full Name (As per CNIC)</label>
                <input 
                  type="text" 
                  placeholder="Muhammad Ahmad" 
                  className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-[#006837] transition-all">CNIC Number</label>
                <input 
                  type="text" 
                  placeholder="42101-XXXXXXX-X" 
                  className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] outline-none transition-all font-bold text-gray-700 shadow-sm font-mono"
                />
              </div>
            </div>

            {/* Contact Info Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-[#006837] transition-all">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm border-r pr-3">+92</span>
                  <input 
                    type="text" 
                    placeholder="3001234567" 
                    className="w-full pl-16 pr-5 py-4 md:py-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-[#006837] transition-all">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-[#006837] transition-all">Create Secure Password</label>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                className="w-full p-4 md:p-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] outline-none transition-all font-bold text-gray-700 shadow-sm"
              />
            </div>

            {/* Agreement */}
            <label className="flex items-start space-x-3 p-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 mt-0.5 rounded-lg border-2 border-gray-200 text-[#006837] focus:ring-0 cursor-pointer" />
              <span className="text-[11px] md:text-xs font-bold text-gray-500 leading-snug">
                I authorize Meezan Bank to verify my details via Biometric/NADRA and agree to the 
                <span className="text-[#006837] ml-1 group-hover:underline">Shariah Banking Terms.</span>
              </span>
            </label>

            {/* Buttons Row */}
            <div className="flex flex-col lg:flex-row items-center gap-6 pt-6">
              <button className="w-full lg:w-2/3 bg-[#006837] text-white py-5 rounded-[22px] font-black text-xs uppercase tracking-[3px] hover:bg-[#004d29] transition-all shadow-xl shadow-green-900/20 active:scale-[0.98]">
                Start Application
              </button>
              <div className="text-center lg:text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Been here before?</p>
                <Link to="/login" className="text-[#006837] text-xs font-black uppercase tracking-tighter hover:underline">Continue Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;


/*
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#006837] px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-lg">
       
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#006837]">Open Digital Account</h2>
          <p className="text-gray-500 mt-2">Join Pakistan's Largest Islamic Bank</p>
        </div>

        <form className="space-y-5">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="As per CNIC" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-none transition"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CNIC Number</label>
              <input 
                type="text" 
                placeholder="42101-XXXXXXX-X" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="text" 
                placeholder="03XX-XXXXXXX" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-none"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Create Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-none"
            />
          </div>

         
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 accent-[#006837]" />
            <span>I agree to the <span className="text-[#006837] underline cursor-pointer">Shariah Terms & Conditions</span></span>
          </div>

          
          <button className="w-full bg-[#006837] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#004d29] transition-all transform hover:scale-[1.02] shadow-lg">
            Create My Account
          </button>
        </form>

        
        <p className="text-center mt-6 text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-[#006837] font-bold hover:underline ml-1">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
*/