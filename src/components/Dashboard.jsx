import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // FIXED: Added missing state
  const navigate = useNavigate();

  const now = new Date().toLocaleString();

  // Prayer Timings Data
  const prayerSchedule = [
    { name: 'Fajr', time: '05:30', period: 'AM' },
    { name: 'Dhuhr', time: '12:15', period: 'PM' },
    { name: 'Asr', time: '03:45', period: 'PM' },
    { name: 'Maghrib', time: '05:20', period: 'PM' },
    { name: 'Isha', time: '06:40', period: 'PM' },
  ];

  // Function to check current prayer time
  const getCurrentPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let i = prayerSchedule.length - 1; i >= 0; i--) {
      const [hours, minutes] = prayerSchedule[i].time.split(':');
      let prayerMinutes = parseInt(hours) * 60 + parseInt(minutes);
      
      // PM conversion (except 12 PM)
      if (prayerSchedule[i].period === 'PM' && hours !== '12') {
        prayerMinutes += 12 * 60;
      }

      if (currentTime >= prayerMinutes) {
        return prayerSchedule[i].name;
      }
    }
    return 'Isha'; 
  };

  const currentPrayer = getCurrentPrayer();

  // Banking & Financial States
  const [transferType, setTransferType] = useState('meezan');
  const [wealth, setWealth] = useState("");
  const [zakatResult, setZakatResult] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");

  // Financing (Loan/Ijarah) States
  const [loans, setLoans] = useState([
    { id: 1, type: "Car Ijarah", amount: 1500000, profit: 12.5, remaining: 850000, status: 'Active' },
    { id: 2, type: "Easy Home", amount: 5000000, profit: 10.2, remaining: 4200000, status: 'Active' }
  ]);
  const [loanForm, setLoanForm] = useState({ type: "Car Ijarah", amount: "", duration: "12" });

  // Card Data
  const myCards = [
    { id: 1, type: 'Visa Platinum', color: 'from-gray-700 to-black', number: '4532 •••• •••• 1092', expiry: '09/28' },
    { id: 2, type: 'Gold Ijarah Card', color: 'from-yellow-600 to-yellow-800', number: '5210 •••• •••• 4432', expiry: '12/26' },
    { id: 3, type: 'Titanium Debit', color: 'from-blue-700 to-blue-900', number: '4021 •••• •••• 8812', expiry: '05/27' },
    { id: 4, type: 'Business Infinity', color: 'from-[#006837] to-black', number: '4990 •••• •••• 3001', expiry: '01/30' },
  ];

  // Logic Functions
  const calculateZakat = () => {
    setZakatResult(Number(wealth) * 0.025);
  };

  const handleLoanSubmit = (e) => {
    e.preventDefault();
    const newLoan = {
      id: loans.length + 1,
      type: loanForm.type,
      amount: parseFloat(loanForm.amount),
      profit: 11.5,
      remaining: parseFloat(loanForm.amount),
      status: 'Pending'
    };
    setLoans([...loans, newLoan]);
    setLoanForm({ type: "Car Ijarah", amount: "", duration: "12" });
    alert("Financing Application Submitted!");
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };
    return (
      <div className={`flex h-[100dvh] transition-all overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>

        {/* SIDEBAR - Mobile pe Drawer ban jayega */}
        <aside className={`fixed lg:relative z-50 w-72 h-full flex flex-col shadow-2xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isDarkMode ? 'bg-black' : 'bg-[#006837] text-white'}`}>

          {/* BRANDING & BRANCH INFO SECTION */}
          <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
            <div>
              <div className="text-xl md:text-2xl font-black italic tracking-tighter">MEEZAN BANK</div>
              <div className="mt-4 flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">Premium Banking</p>
                  <p className="text-[10px] font-medium opacity-90 mt-1">Gulberg Branch, LHR</p>
                </div>
              </div>
            </div>
            {/* Mobile Close Button */}
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-2xl">✕</button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="mt-4 px-4 flex-1 space-y-2 font-semibold overflow-y-auto custom-scrollbar">
            {[
              { id: 'summary', icon: '🏠', label: 'Summary' },
              { id: 'transfer', icon: '💸', label: 'Transfer' },
              { id: 'history', icon: '📜', label: 'History' },
              { id: 'loan', icon: '🚗', label: 'Financing' },
              { id: 'zakat', icon: '🌙', label: 'Zakat Portal' },
              { id: 'bills', icon: '📑', label: 'Bills' },
              { id: 'cards', icon: '💳', label: 'Cards' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}
              >
                <span>{item.icon}</span> <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* BOTTOM CONTROLS */}
          <div className="p-6 border-t border-white/10 space-y-3">
            {/*<button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full py-2 bg-white/10 rounded-xl text-xs transition-colors hover:bg-white/20">
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>*/}
            <button onClick={() => navigate('/login')} className="w-full py-3 bg-red-600 rounded-xl font-bold transition-transform active:scale-95">
              Logout
            </button>
          </div>
        </aside>

    {/* MAIN AREA START */}
        <main className="flex-1 h-full overflow-y-auto">
          {/* MOBILE TOP BAR */}
         <div className={`lg:hidden p-4 flex justify-between items-center sticky top-0 z-40 border-b transition-all duration-300 
  ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
    <span className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>☰</span>
  </button>
         <div className="text-xl md:text-2xl font-black italic tracking-tighter leading-none text-[#006837] dark:text-white block">
  Meezan Bank
</div>
  <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-xl">
    {isDarkMode ? '☀️' : '🌙'}
  </button>
            <img src={`https://ui-avatars.com/api/?name=Ahmad&background=006837&color=fff`} className="w-8 h-8 rounded-full" alt="profile" />
          </div>
          
      <div className="p-4 md:p-10 max-w-7xl mx-auto">
              
              {/* SUCCESS OVERLAY */}
              {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl text-center animate-in zoom-in max-w-sm w-full">
                    <div className="text-6xl mb-4 text-green-500">✔️</div>
                    <h2 className="text-2xl font-bold text-gray-900">Transfer Successful</h2>
                    <button 
                      onClick={() => setShowSuccess(false)} 
                      className="mt-8 w-full bg-[#006837] text-white py-3 rounded-xl font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

          {/* TAB 1: SUMMARY */}
{activeTab === 'summary' && (
  <div className="animate-in fade-in duration-700">
    
    {/* 1. WELCOME HEADER (Responsive Flex) */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-4xl font-black tracking-tighter italic uppercase">
          Salaam, <span className="text-[#006837] dark:text-green-500">Ahmad!</span>
        </h2>
        <p className="text-[9px] md:text-xs font-bold opacity-50 uppercase tracking-[2px]">
          Last Login: {now}
        </p>
      </div>
      
      {/* Desktop Profile Info */}
      <div className="hidden md:flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl">
        <div className="relative text-2xl cursor-pointer">
          🔔<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-[8px] text-white flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">3</span>
        </div>
        <img 
          src="https://ui-avatars.com/api/?name=Ahmad&background=006837&color=fff" 
          className="w-10 h-10 rounded-full border-2 border-green-500 shadow-md" 
          alt="profile"
        />
      </div>
    </div>

    {/* 2. PRAYER & REMINDER WIDGET (Grid 1 -> 3) */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <div className={`col-span-1 lg:col-span-2 p-5 md:p-8 rounded-[30px] md:rounded-[35px] shadow-xl flex flex-col md:flex-row items-center justify-between border-t-4 border-emerald-500 transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-6 mb-6 md:mb-0 w-full md:w-auto">
          <div className="text-4xl md:text-5xl drop-shadow-lg">🕌</div>
          <div>
            <h4 className="font-black text-[10px] uppercase text-gray-600 tracking-widest text-left">Active Prayer</h4>
            <p className="text-2xl md:text-3xl font-black text-emerald-600 flex items-center">
              {currentPrayer}
              <span className="ml-3 flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </p>
          </div>
        </div>

        {/* Swipeable Prayer Times */}
        <div className="flex space-x-3 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar scroll-smooth">
          {prayerSchedule.map((p) => (
            <div key={p.name} className={`flex-shrink-0 px-5 py-3 rounded-2xl text-center border transition-all duration-500 ${currentPrayer === p.name ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105' : 'bg-transparent border-gray-100 dark:border-gray-700 opacity-40'}`}>
              <p className="text-[8px] font-bold uppercase tracking-tighter">{p.name}</p>
              <p className="text-xs font-black">{p.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Islamic Reminder Card */}
      <div className={`p-8 rounded-[30px] md:rounded-[35px] shadow-xl relative overflow-hidden group flex flex-col justify-center ${isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="absolute -right-4 -bottom-4 text-7xl md:text-8xl opacity-10 group-hover:rotate-12 transition-transform">🌙</div>
        <h4 className="text-[10px] font-black uppercase text-emerald-700 mb-4 tracking-widest">Islamic Reminder</h4>
        <div className={`text-xs md:text-sm font-bold leading-relaxed ${isDarkMode ? 'text-emerald-100' : 'text-emerald-800'}`}>
          {currentPrayer === 'Fajr' ? "Prayer is better than sleep." : "The best of you are those who are best to their families."}
          <span className="block mt-3 text-gray-600 font-medium text-[10px]">— Prophet Muhammad (PBUH)</span>
        </div>
      </div>
    </div>

    {/* 3. BALANCE CARDS (Responsive Grid) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-10">
      <div className={`p-8 rounded-[35px] md:rounded-[45px] shadow-lg border-l-[12px] border-green-600 hover:scale-[1.01] transition-transform ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <p className="text-[10px] md:text-xs font-bold opacity-50 uppercase tracking-widest">Available Balance</p>
        <div className="flex items-baseline space-x-2 mt-4">
          <span className="text-lg font-bold opacity-40">PKR</span>
          <h3 className="text-3xl md:text-5xl font-black font-mono tracking-tighter">2,450,900</h3>
        </div>
      </div>
      <div className={`p-8 rounded-[35px] md:rounded-[45px] shadow-lg border-l-[12px] border-yellow-500 hover:scale-[1.01] transition-transform ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <p className="text-[10px] md:text-xs font-bold opacity-50 uppercase tracking-widest">Monthly Profit</p>
        <div className="flex items-baseline space-x-2 mt-4 text-yellow-600">
          <span className="text-lg font-bold opacity-40">PKR</span>
          <h3 className="text-3xl md:text-5xl font-black font-mono tracking-tighter">15,200</h3>
        </div>
      </div>
    </div>

    {/* 4. QUICK ACTIONS (Horizontal on Mobile) */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {[{ label: 'Send Money', icon: '📤', t: 'transfer', c: 'bg-green-100 text-green-700' }, 
        { label: 'Pay Bills', icon: '🧾', t: 'bills', c: 'bg-blue-100 text-blue-700' }, 
        { label: 'Cards', icon: '🛡️', t: 'cards', c: 'bg-purple-100 text-purple-700' }, 
        { label: 'Zakat', icon: '🌙', t: 'zakat', c: 'bg-yellow-100 text-yellow-700' }].map(a => (
        <button key={a.label} onClick={() => setActiveTab(a.t)} className={`p-5 rounded-3xl flex flex-col items-center space-y-3 border shadow-sm transition-all active:scale-95 hover:shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className={`w-12 h-12 rounded-2xl ${a.c} flex items-center justify-center text-xl`}>{a.icon}</div>
          <span className="text-[10px] font-black uppercase tracking-tight">{a.label}</span>
        </button>
      ))}
    </div>

    {/* 5. RECENT TRANSACTIONS */}
    <div className={`rounded-[30px] md:rounded-[40px] shadow-xl overflow-hidden border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <div className="p-6 md:p-8 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-gray-900/50">
        <div>
          <span className="font-black text-xs uppercase opacity-60 tracking-widest">Recent Activity</span>
          <p className="text-[10px] font-bold text-gray-600 italic mt-1">Real-time settlement</p>
        </div>
        <button className="bg-[#006837] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-green-900/20 active:scale-95 transition-all">View All</button>
      </div>
      
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left min-w-[500px]">
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {[
              { date: 'Jan 03', desc: 'IBFT Transfer to HBL', amount: '-25,000', type: 'debit' },
              { date: 'Jan 02', desc: 'Monthly Profit Credit', amount: '+4,200', type: 'credit' },
              { date: 'Dec 24', desc: 'Superstore POS Payment', amount: '-8,750', type: 'debit' }
            ].map((trx, i) => (
              <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-6 text-xs font-bold opacity-60">{trx.date}</td>
                <td className="p-6 font-black text-sm">{trx.desc}</td>
                <td className={`p-6 text-right font-black text-lg ${trx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{trx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

      {/* TAB 2: TRANSFER */}
{activeTab === 'transfer' && (
  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
    {/* Page Header */}
    <div className="mb-8 px-2">
      <h2 className="text-3xl md:text-5xl font-black text-[#006837] dark:text-green-500 italic tracking-tighter">
        Secure Transfer
      </h2>
      <p className="text-[10px] md:text-xs font-bold opacity-50 uppercase tracking-[3px] mt-2">
        {transferType === 'meezan' ? 'Meezan to Meezan Transfer' : 'Interbank Funds Transfer (IBFT)'}
      </p>
    </div>

    {/* Main Form Card */}
    <div className={`p-6 md:p-12 rounded-[40px] md:rounded-[55px] shadow-2xl border-t-[10px] border-[#ffd700] transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
      <form onSubmit={handleTransferSubmit} className="space-y-8 md:space-y-10">
        
        {/* 1. TRANSFER TYPE TOGGLE */}
        <div className={`grid grid-cols-2 gap-2 p-2 rounded-[25px] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <button 
            type="button" 
            onClick={() => setTransferType('meezan')}
            className={`py-4 rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${transferType === 'meezan' ? 'bg-[#006837] text-white shadow-xl scale-100' : 'text-gray-600 hover:text-gray-500'}`}
          >
            Meezan
          </button>
          <button 
            type="button" 
            onClick={() => setTransferType('other')}
            className={`py-4 rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${transferType === 'other' ? 'bg-[#006837] text-white shadow-xl scale-100' : 'text-gray-600 hover:text-gray-500'}`}
          >
            Other Banks
          </button>
        </div>

        {/* 2. DYNAMIC BANK SELECTION (Mobile optimized grid) */}
        {transferType === 'other' && (
          <div className="animate-in zoom-in-95 duration-300">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-4 mb-3 block italic ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Select Destination Bank
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {['HBL', 'UBL', 'Alfalah', 'SadaPay', 'NBP', 'MCB', 'NayaPay', 'SCB'].map((bank) => (
                <label key={bank} className="group cursor-pointer">
                  <input type="radio" name="bank" className="hidden peer" required={transferType === 'other'} />
                  <div className={`py-3 px-2 text-center border-2 rounded-2xl text-[9px] md:text-[11px] font-black transition-all group-active:scale-95 
                    ${isDarkMode 
                      ? 'border-gray-700 hover:bg-gray-700 peer-checked:border-green-500 peer-checked:bg-green-900/30 peer-checked:text-green-400' 
                      : 'border-gray-100 hover:bg-gray-50 peer-checked:border-[#006837] peer-checked:bg-green-50 peer-checked:text-[#006837]'}`}>
                    {bank}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 3. ACCOUNT & AMOUNT INPUTS */}
        <div className="space-y-6">
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl md:text-2xl group-focus-within:grayscale-0 grayscale transition-all">💳</span>
            <input 
              type="text" 
              placeholder={transferType === 'meezan' ? "Meezan Account Number" : "IBAN / Account Number"} 
              className={`w-full pl-16 pr-6 py-5 md:py-6 rounded-[25px] md:rounded-[30px] border-none outline-none focus:ring-4 focus:ring-[#006837]/20 font-bold text-sm md:text-lg shadow-inner ${isDarkMode ? 'bg-gray-900 text-white placeholder-gray-600' : 'bg-gray-50 text-gray-800 placeholder-gray-300'}`} 
              required 
            />
          </div>

          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl md:text-2xl group-focus-within:grayscale-0 grayscale transition-all">💰</span>
            <input 
              type="number" 
              placeholder="0.00" 
              className={`w-full pl-16 pr-6 py-6 md:py-8 rounded-[25px] md:rounded-[30px] border-none outline-none focus:ring-4 focus:ring-[#006837]/20 font-black text-2xl md:text-4xl text-[#006837] dark:text-green-400 shadow-inner ${isDarkMode ? 'bg-gray-900 placeholder-green-900/30' : 'bg-gray-50 placeholder-gray-200'}`} 
              required 
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-xs opacity-30 tracking-widest">PKR</span>
          </div>

          {/* PURPOSE & REFERENCE (Grid for Tablet/Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className={`p-5 rounded-[25px] border-none outline-none focus:ring-4 focus:ring-[#006837]/20 font-bold text-xs md:text-sm appearance-none cursor-pointer ${isDarkMode ? 'bg-gray-900 text-gray-600' : 'bg-gray-50 text-gray-500'}`}>
              <option>Purpose: Family Support</option>
              <option>Purpose: Education / Fees</option>
              <option>Purpose: Business Utility</option>
              <option>Purpose: Others</option>
            </select>
            <input 
              type="text" 
              placeholder="Comments (Optional)" 
              className={`p-5 rounded-[25px] border-none outline-none focus:ring-4 focus:ring-[#006837]/20 font-bold text-xs md:text-sm ${isDarkMode ? 'bg-gray-900 text-white placeholder-gray-600' : 'bg-gray-50'}`} 
            />
          </div>
        </div>

        {/* 4. ACTION BUTTON */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-[#006837] text-white py-6 md:py-8 rounded-[30px] md:rounded-[35px] font-black text-lg md:text-2xl uppercase tracking-[5px] shadow-2xl shadow-green-900/30 active:scale-[0.97] transition-all hover:bg-[#00522c] hover:shadow-green-900/40 relative overflow-hidden group"
          >
            <span className="relative z-10">Proceed Securely</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <p className="text-center text-[9px] font-bold opacity-30 mt-6 uppercase tracking-widest flex items-center justify-center">
            <span className="mr-2">🔒</span> End-to-End Shariah Compliant Encryption
          </p>
        </div>
      </form>
    </div>
  </div>
)}
      {/* TAB 4: FINANCING (LOAN) */}
{activeTab === 'loan' && (
  <div className="animate-in slide-in-from-bottom-5 duration-500 pb-10">
    {/* Page Title */}
    <h2 className="text-2xl md:text-4xl font-black mb-8 text-[#006837] dark:text-green-500 uppercase tracking-tighter italic px-2">
      Islamic Financing (Ijarah)
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
      
      {/* 1. APPLICATION FORM CARD */}
      <div className={`p-6 md:p-10 rounded-[35px] md:rounded-[45px] shadow-2xl h-fit border-t-8 border-[#006837] transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-2xl">📝</span>
          <h3 className="font-black text-xs md:text-sm uppercase opacity-80 tracking-[3px]">New Application</h3>
        </div>

        <form onSubmit={handleLoanSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase opacity-80 ml-2 tracking-widest">Select Product</label>
            <select 
              value={loanForm.type} 
              onChange={(e) => setLoanForm({...loanForm, type: e.target.value})} 
              className={`w-full p-5 rounded-2xl border-none outline-none focus:ring-4 focus:ring-[#006837]/20 font-bold text-sm appearance-none cursor-pointer ${isDarkMode ? 'bg-gray-900 text-gray-600' : 'bg-gray-50 text-gray-600'}`}
            >
              <option>Car Ijarah</option>
              <option>Easy Home</option>
              <option>Bike Ijarah</option>
              <option>Personal Finance</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase opacity-80 ml-2 tracking-widest">Financing Amount</label>
            <div className="relative">
              <input 
                type="number" 
                placeholder="0.00" 
                value={loanForm.amount} 
                onChange={(e) => setLoanForm({...loanForm, amount: e.target.value})} 
                className={`w-full p-5 pl-12 rounded-2xl border-none outline-none focus:ring-4 focus:ring-[#006837]/20 font-black text-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`} 
                required
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-80 font-bold">Rs</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#006837] text-white py-5 rounded-[25px] font-black uppercase text-xs tracking-[4px] shadow-xl shadow-green-900/20 active:scale-95 transition-all hover:bg-[#00522c] mt-4"
          >
            Apply Now
          </button>
        </form>
      </div>

      {/* 2. ACTIVE FINANCING TABLE CARD */}
      <div className="lg:col-span-2">
        <div className={`p-6 md:p-10 rounded-[35px] md:rounded-[45px] shadow-2xl h-full border-t-8 border-yellow-500 transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
          <div className="flex justify-between items-center mb-8 px-2">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📊</span>
              <h3 className="font-black text-xs md:text-sm uppercase opacity-80 tracking-[3px]">Active Portfolio</h3>
            </div>
            <div className="text-[10px] font-black bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full uppercase">
              Shariah Verified
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="opacity-80 border-b dark:border-gray-700 text-[10px] uppercase font-black tracking-widest">
                  <th className="pb-5 px-4">Financing Type</th>
                  <th className="pb-5 px-4">Remaining Balance</th>
                  <th className="pb-5 px-4 text-right">Current Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-50'}`}>
                {loans.map(loan => (
                  <tr key={loan.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-all">
                    <td className="py-6 px-4">
                      <p className="font-black text-sm md:text-base text-gray-600 dark:text-gray-600">{loan.type}</p>
                      <p className="text-[9px] font-bold opacity-80 uppercase tracking-tighter">ID: #{loan.id.toString().slice(-5)}</p>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-[10px] font-bold opacity-80">PKR</span>
                        <span className="font-mono font-black text-base md:text-lg">
                          {Number(loan.remaining).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm
                        ${loan.status === 'Active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State if no loans */}
          {loans.length === 0 && (
            <div className="py-20 text-center opacity-80">
              <p className="text-4xl mb-4">📭</p>
              <p className="font-black uppercase text-xs tracking-widest">No active financing found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
{/* TAB 5: ZAKAT PORTAL */}
{activeTab === 'zakat' && (
  <div className="max-w-2xl mx-auto animate-in zoom-in duration-300 pb-10">
    <div className={`p-6 md:p-12 rounded-[40px] md:rounded-[60px] shadow-2xl border-t-[12px] border-[#006837] transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
      
      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
          <span className="text-3xl md:text-4xl">🌙</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-[#006837] dark:text-green-500">Zakat Portal</h2>
        <p className="text-[10px] md:text-xs opacity-80 mt-2 font-bold italic tracking-wide leading-relaxed px-4">
          "Establish prayer and give zakat..." <br className="hidden md:block"/> (Al-Baqarah 2:110)
        </p>
      </div>

      {/* Nisab Info Card */}
      <div className={`mb-10 p-5 rounded-3xl border-2 border-dashed flex items-center justify-between transition-colors ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-green-100 bg-green-50/30'}`}>
        <div className="text-left">
          <p className="text-[10px] font-black uppercase opacity-80 tracking-widest mb-1">Current Nisab (Silver)</p>
          <p className={`text-sm md:text-base font-black ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>PKR 155,000 <span className="text-[10px] opacity-80 italic">approx.</span></p>
        </div>
        <div className="bg-yellow-400/20 p-2 rounded-xl">✨</div>
      </div>

      <div className="space-y-8">
        <div className="group">
          <label className="text-[10px] font-black uppercase opacity-80 ml-5 mb-3 block tracking-[2px]">Total Zakatable Wealth</label>
          <div className="relative">
            <input 
              type="number" 
              value={wealth} 
              onChange={(e) => setWealth(e.target.value)} 
              placeholder="0.00" 
              className={`w-full p-6 md:p-8 rounded-[30px] text-center text-2xl md:text-4xl font-black transition-all focus:ring-8 focus:ring-green-500/10 outline-none shadow-inner ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-800' : 'bg-gray-50 border-none text-gray-600 placeholder-gray-200'}`} 
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-80 font-black hidden md:block">PKR</span>
          </div>
        </div>

        <button 
          onClick={calculateZakat} 
          className="w-full bg-yellow-500 text-black py-5 md:py-6 rounded-[30px] font-black text-base md:text-xl shadow-2xl shadow-yellow-500/30 hover:bg-yellow-400 active:scale-[0.97] transition-all uppercase tracking-[4px]"
        >
          Calculate Zakat
        </button>

        {/* Result Area */}
        {zakatResult > 0 && (
          <div className="mt-10 animate-in slide-in-from-top-6 duration-700">
            <div className={`p-8 rounded-[35px] text-center border-4 border-double shadow-inner ${isDarkMode ? 'bg-green-950/20 border-green-900/50' : 'bg-green-50/50 border-green-100'}`}>
              <p className={`text-[10px] md:text-xs font-black uppercase tracking-[3px] mb-2 opacity-80 ${isDarkMode ? 'text-green-100' : 'text-green-800'}`}>Your Zakat Obligation</p>
              <h3 className="text-3xl md:text-5xl font-black text-green-600 font-mono tracking-tighter">
                PKR {zakatResult.toLocaleString()}
              </h3>
              
              <div className="mt-10 pt-8 border-t border-dashed border-green-500/20">
                <p className="text-[9px] md:text-[10px] mb-5 opacity-50 uppercase font-black tracking-[4px]">Verified Zakat Recipients</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => alert('Redirecting to Indus Hospital...')} className={`py-4 px-2 text-[9px] md:text-[10px] font-black rounded-2xl shadow-sm border-2 transition-all active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white text-gray-600 border-gray-100 hover:border-green-200'}`}>INDUS HOSPITAL</button>
                  <button onClick={() => alert('Redirecting to Edhi Foundation...')} className={`py-4 px-2 text-[9px] md:text-[10px] font-black rounded-2xl shadow-sm border-2 transition-all active:scale-95 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white text-gray-600 border-gray-100 hover:border-green-200'}`}>EDHI FOUNDATION</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}
{/* TAB 5: BILL PAYMENTS */}
{activeTab === 'bills' && (
  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-10 duration-500 pb-10">
    <div className="mb-8 px-2">
      <h2 className="text-2xl md:text-4xl font-black text-[#006837] dark:text-green-500 uppercase italic tracking-tighter">
        Utility Bill Payments
      </h2>
      <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[2px] mt-1">
        Pay your bills instantly with zero service charges
      </p>
    </div>
    
    {/* Bill Types Grid (Responsive 2x2 on mobile, 4x1 on desktop) */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {[
        { id: 'Electricity', icon: '⚡', color: 'text-yellow-500' },
        { id: 'Gas', icon: '🔥', color: 'text-orange-500' },
        { id: 'Water', icon: '💧', color: 'text-blue-500' },
        { id: 'Internet', icon: '🌐', color: 'text-purple-500' }
      ].map((item) => (
        <div 
          key={item.id} 
          className={`p-6 md:p-8 rounded-[30px] text-center cursor-pointer active:scale-95 hover:border-green-500/50 transition-all shadow-xl group border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-transparent'}`}
        >
          <div className={`text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
            {item.icon}
          </div>
          <p className="text-[10px] md:text-xs font-black uppercase text-gray-600 tracking-widest">{item.id}</p>
        </div>
      ))}
    </div>

    {/* Bill Form Card */}
    <div className={`p-6 md:p-12 rounded-[40px] md:rounded-[50px] shadow-2xl border-t-[10px] border-[#006837] transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
      <form className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase ocpaity-40 ml-4 tracking-widest">Company / Provider</label>
            <div className="relative">
              <select className={`w-full p-5 rounded-2xl border-none outline-none focus:ring-4 focus:ring-green-500/20 font-bold text-sm appearance-none cursor-pointer ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-600'}`}>
                <option>Select Company</option>
                <option>LESCO - Electricity</option>
                <option>SNGPL - Gas</option>
                <option>KE - K-Electric</option>
                <option>PTCL - Internet/Landline</option>
                <option>StormFiber</option>
              </select>
              <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">▼</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase opacity-40 ml-4 tracking-widest">Consumer Number / ID</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter Reference No." 
                className={`w-full p-5 rounded-2xl border-none outline-none focus:ring-4 focus:ring-green-500/20 font-bold text-sm ${isDarkMode ? 'bg-gray-900 text-white placeholder-gray-700' : 'bg-gray-50 text-gray-600'}`} 
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30 cursor-help" title="Check your bill for reference ID">❓</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="button" 
            onClick={() => alert('Fetching Bill Details...')} 
            className="w-full bg-[#006837] text-white py-6 md:py-7 rounded-[30px] font-black shadow-2xl shadow-green-900/30 active:scale-[0.98] transition-all uppercase tracking-[5px] text-xs md:text-sm hover:bg-[#00522c]"
          >
            Fetch Bill Details
          </button>
          <p className="text-center text-[9px] font-bold opacity-30 mt-6 uppercase tracking-widest">
            Please ensure you have a stable internet connection
          </p>
        </div>
      </form>
    </div>
  </div>
)}

         {/* TAB 6: CARDS MANAGEMENT */}
{activeTab === 'cards' && (
  <div className="max-w-5xl mx-auto animate-in zoom-in duration-500 pb-10">
    <div className="mb-8 px-2">
      <h2 className="text-2xl md:text-4xl font-black text-[#006837] dark:text-green-500 uppercase italic tracking-tighter">
        My Islamic Cards
      </h2>
      <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[2px]">
        Manage your physical and virtual debit cards
      </p>
    </div>
    
    {/* Horizontal Scrollable Cards (Optimized for Touch) */}
    <div className="flex space-x-6 overflow-x-auto pb-10 snap-x snap-mandatory no-scrollbar px-2">
      {myCards.map((card) => (
        <div 
          key={card.id} 
          className={`flex-shrink-0 w-[85vw] md:w-[400px] h-52 md:h-60 rounded-[35px] p-8 text-white shadow-2xl bg-gradient-to-br ${card.color} snap-center transition-all active:scale-95 hover:rotate-1 relative overflow-hidden group cursor-pointer`}
        >
          {/* Card Design Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[3px] opacity-70 mb-1">{card.type}</p>
                <div className="h-8 w-12 bg-yellow-400/80 rounded-md shadow-inner border border-yellow-200/50"></div> {/* Chip */}
              </div>
              <div className="text-xl md:text-2xl italic font-black tracking-tighter">MEEZAN</div>
            </div>

            <div className="font-mono text-xl md:text-2xl tracking-[4px] py-4 drop-shadow-lg">
              {card.number}
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest">Card Holder</p>
                <p className="text-sm font-bold tracking-[2px] uppercase">AHMAD</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest">Expires</p>
                <p className="text-sm font-bold font-mono">{card.expiry}</p>
              </div>
              {/* Visa/Mastercard Logo Placeholder */}
              <div className="w-12 h-8 bg-white/20 rounded-lg flex items-center justify-center font-black italic text-[10px]">VISA</div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Card Controls Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
      {[
        { title: 'E-Commerce', desc: 'Online & Subscriptions', active: true, icon: '🌐' },
        { title: 'Contactless', desc: 'NFC & POS Tap Pay', active: false, icon: '📶' }
      ].map((ctrl) => (
        <div key={ctrl.title} className={`p-6 rounded-[35px] shadow-xl flex justify-between items-center transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 border' : 'bg-white border-none'}`}>
          <div className="flex items-center space-x-4">
            <span className="text-xl">{ctrl.icon}</span>
            <div>
              <p className="font-black text-xs md:text-sm uppercase tracking-tight">{ctrl.title}</p>
              <p className="text-[9px] opacity-50 font-bold">{ctrl.desc}</p>
            </div>
          </div>
          {/* CUSTOM TOGGLE */}
          <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-all cursor-pointer ${ctrl.active ? 'bg-green-600 shadow-inner' : 'bg-gray-300 dark:bg-gray-700'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${ctrl.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </div>
      ))}

      <div className={`p-6 rounded-[35px] shadow-xl flex justify-between items-center transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 border' : 'bg-white border-none'}`}>
        <div className="flex items-center space-x-4">
          <span className="text-xl">⚙️</span>
          <div>
            <p className="font-black text-xs md:text-sm uppercase tracking-tight">Daily Limit</p>
            <p className="text-[9px] opacity-50 font-bold text-green-600">PKR 100,000</p>
          </div>
        </div>
        <button className="text-[10px] font-black text-[#006837] dark:text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full hover:bg-green-500/20 transition-all uppercase tracking-widest">Edit</button>
      </div>

      <button className="p-6 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-[35px] font-black uppercase text-[10px] md:text-xs tracking-[2px] hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95 border-2 border-transparent hover:border-red-400">
        ⚠️ Block Current Card
      </button>
    </div>
  </div>
)}

       {/* TAB 7: FULL TRANSACTION HISTORY */}
{activeTab === 'history' && (
  <div className="animate-in fade-in slide-in-from-left-5 duration-500 pb-10">
    <div className="mb-8 px-2">
      <h2 className="text-2xl md:text-4xl font-black text-[#006837] dark:text-green-500 uppercase italic tracking-tighter">
        Statement History
      </h2>
      <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[2px]">
        Track and filter your shariah-compliant spending
      </p>
    </div>

    {/* FILTERS SECTION */}
    <div className={`p-4 md:p-6 rounded-[30px] shadow-xl mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          <input
            type="text"
            placeholder="Search transactions..."
            className={`w-full p-4 pl-12 rounded-2xl border-none outline-none font-bold text-xs md:text-sm shadow-inner ${isDarkMode ? 'bg-gray-900 text-white placeholder-gray-700' : 'bg-gray-50 text-gray-600'}`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`p-4 rounded-2xl border-none outline-none font-black text-[10px] md:text-xs uppercase tracking-widest cursor-pointer shadow-sm ${isDarkMode ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-[#006837]'}`}
        >
          <option value="all">All Logs</option>
          <option value="credit">Credits (+)</option>
          <option value="debit">Debits (-)</option>
        </select>
      </div>
      
      <button className="px-6 py-4 bg-[#006837] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#004d29] active:scale-95 transition-all">
        📥 Download PDF
      </button>
    </div>

    {/* DATA TABLE */}
    <div className={`rounded-[35px] md:rounded-[45px] shadow-2xl overflow-hidden border-b-8 border-[#006837] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left min-w-[600px]">
          <thead className={`text-[10px] uppercase font-black tracking-[3px] ${isDarkMode ? 'bg-gray-900/50 text-gray-600' : 'bg-gray-50 text-gray-600'}`}>
            <tr>
              <th className="p-6 text-center">Date</th>
              <th className="p-6">Transaction Detail</th>
              <th className="p-6 text-right">Amount (PKR)</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {[
              { id: 101, type: "Salary Credit", amount: 150000, date: "01 JAN", category: "credit" },
              { id: 102, type: "K-Electric Bill", amount: -12450, date: "02 JAN", category: "debit" },
              { id: 103, type: "Profit Payout (Mudarabah)", amount: 4500, date: "02 JAN", category: "credit" },
              { id: 104, type: "Metro Cash & Carry", amount: -8200, date: "03 JAN", category: "debit" },
              { id: 105, type: "IBFT to SadaPay", amount: -5000, date: "04 JAN", category: "debit" }
            ]
            .filter((t) => {
              const matchType = filterType === "all" ? true : filterType === "credit" ? t.amount > 0 : t.amount < 0;
              const matchSearch = t.type.toLowerCase().includes(search.toLowerCase());
              return matchType && matchSearch;
            })
            .map((t) => (
              <tr key={t.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-900/40 transition-all cursor-default">
                <td className="p-6">
                  <div className="flex flex-col items-center">
                    <span className="font-mono font-black text-sm md:text-base">{t.date.split(' ')[0]}</span>
                    <span className="text-[9px] font-bold opacity-40">{t.date.split(' ')[1]}</span>
                  </div>
                </td>
                <td className="p-6">
                  <p className="font-black text-xs md:text-base text-gray-800 dark:text-gray-100">{t.type}</p>
                  <p className="text-[9px] font-bold text-green-600/60 uppercase tracking-tighter">Ref: MZN-{t.id}992X</p>
                </td>
                <td className={`p-6 text-right font-black text-base md:text-xl ${t.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  <span className="text-[10px] mr-1 opacity-50">{t.amount > 0 ? "+" : ""}</span>
                  {Math.abs(t.amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer / Pagination Placeholder */}
      <div className="p-6 text-center border-t dark:border-gray-700">
        <button className="text-[10px] font-black uppercase tracking-[4px] opacity-30 hover:opacity-100 transition-opacity">
          Load More Transactions
        </button>
      </div>
    </div>
  </div>
)}

{/* CLOSING THE MAIN LAYOUT TAGS */}
      </div>
    </main>
  </div>
);
};

export default Dashboard;