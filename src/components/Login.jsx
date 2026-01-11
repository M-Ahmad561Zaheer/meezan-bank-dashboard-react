import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleBypassLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-0 md:p-6 lg:p-10 font-sans">
      {/* Main Container: Mobile par full width, desktop par rounded box */}
      <div className="flex flex-col md:flex-row bg-white md:rounded-[40px] shadow-2xl overflow-hidden max-w-5xl w-full min-h-screen md:min-h-[600px] border border-gray-100">
        
        {/* LEFT SIDE: Branding - Mobile par chota header ban jayega */}
        <div className="w-full md:w-5/12 bg-[#006837] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles: Hidden on very small screens to save space */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl hidden md:block"></div>
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter mb-2">MEEZAN BANK</h1>
            <div className="w-12 h-1 bg-yellow-400 mb-6 md:mb-10 mx-auto md:mx-0"></div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Welcome <br className="hidden md:block"/> Back!</h2>
            <p className="mt-4 opacity-80 text-sm md:text-base font-medium hidden md:block">
              Securely access your Shariah-compliant digital world.
            </p>
          </div>

          {/* Security Tip: Hidden on mobile to keep form high up */}
          <div className="relative z-10 mt-8 hidden md:block">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🛡️</span>
                <p className="text-[10px] uppercase tracking-[2px] font-black opacity-60">Security Tip</p>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                Always ensure you are on the official <strong>meezanbank.com</strong> domain before entering credentials.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white rounded-t-[30px] -mt-6 md:mt-0 relative z-20">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Sign In</h3>
            <p className="text-gray-400 text-sm font-semibold mt-2">Personal Internet Banking Portal</p>
          </div>

          <form onSubmit={handleBypassLogin} className="space-y-5 md:space-y-7">
            {/* Username Input */}
            <div className="group space-y-2">
              <label className="text-[11px] font-black uppercase tracking-wider text-gray-400 ml-1 group-focus-within:text-[#006837] transition-all">
                Customer ID / Username
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">👤</div>
                <input 
                  type="text" 
                  placeholder="e.g. m_ahmad786" 
                  className="w-full pl-14 pr-6 py-4 md:py-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-bold text-gray-700"
                  
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-gray-400 group-focus-within:text-[#006837] transition-all">
                  Password
                </label>
                <button type="button" className="text-[11px] font-black text-[#006837] hover:underline uppercase tracking-tighter">Forgot?</button>
              </div>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">🔒</div>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full pl-14 pr-6 py-4 md:py-5 bg-gray-50 border-2 border-transparent rounded-[22px] focus:bg-white focus:border-[#006837] focus:ring-4 focus:ring-green-500/5 outline-none transition-all font-bold text-gray-700"
                  
                />
              </div>
            </div>

            {/* Remember & Options */}
            <div className="flex items-center justify-between px-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-[#006837] focus:ring-0 cursor-pointer" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Remember Me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#006837] text-white py-5 rounded-[22px] font-black text-sm uppercase tracking-[2px] hover:bg-[#004d29] transition-all shadow-xl shadow-green-900/20 active:scale-[0.97] flex items-center justify-center space-x-3"
            >
              <span>Secure Login</span>
              <span className="text-xl">→</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-12 text-center border-t border-gray-50 pt-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Don't have an account? 
              <Link to="/signup" className="text-[#006837] ml-2 hover:text-green-800 transition-colors">Apply Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleBypassLogin = (e) => {
    e.preventDefault(); // Page refresh rokne ke liye
    // Bina kisi validation ke direct dashboard par bhejo
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#006837] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-[#ffd700]">
        
        
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#006837] rounded-full flex items-center justify-center shadow-inner">
             <span className="text-white font-bold text-3xl">M</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Internet Banking Portal</p>
        
        <form onSubmit={handleBypassLogin} className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Username / Customer ID" 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006837] outline-none bg-gray-50"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006837] outline-none bg-gray-50"
            />
          </div>

          <div className="text-right text-xs text-[#006837] font-semibold cursor-pointer hover:underline">
            Forgot Password?
          </div>

          
          <button 
            type="submit"
            className="w-full bg-[#006837] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#004d29] transition-all shadow-lg active:scale-95"
          >
            Login Now
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account? 
            <span className="text-[#006837] font-bold ml-2 cursor-pointer hover:underline">Apply Now</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;*/