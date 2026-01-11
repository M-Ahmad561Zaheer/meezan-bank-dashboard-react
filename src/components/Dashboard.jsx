  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('summary');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const now = new Date().toLocaleString();

    // Prayer Timings ka data (Aap ise mazeed accurate kar sakte hain)
    const prayerSchedule = [
      { name: 'Fajr', time: '05:30', period: 'AM' },
      { name: 'Dhuhr', time: '12:15', period: 'PM' },
      { name: 'Asr', time: '03:45', period: 'PM' },
      { name: 'Maghrib', time: '05:20', period: 'PM' },
      { name: 'Isha', time: '06:40', period: 'PM' },
    ];

    // Ye function check karega ke abhi kaunsi namaz ka waqt hai
      const getCurrentPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

  // Reverse loop taake sab se latest match milay
      for (let i = prayerSchedule.length - 1; i >= 0; i--) {
        const [hours, minutes] = prayerSchedule[i].time.split(':');
        let prayerMinutes = parseInt(hours) * 60 + parseInt(minutes);
        if (prayerSchedule[i].period === 'PM' && hours !== '12') prayerMinutes += 12 * 60;

        if (currentTime >= prayerMinutes) {
          return prayerSchedule[i].name;
        }
      }
      return 'Isha'; // Raat ke waqt Isha hi show hogi
    };

    const currentPrayer = getCurrentPrayer();

    const [transferType, setTransferType] = useState('meezan');

    // Zakat States
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

    // NEW: Card Data (4-5 Types)
    const myCards = [
      { id: 1, type: 'Visa Platinum', color: 'from-gray-700 to-black', number: '4532 •••• •••• 1092', expiry: '09/28' },
      { id: 2, type: 'Gold Ijarah Card', color: 'from-yellow-600 to-yellow-800', number: '5210 •••• •••• 4432', expiry: '12/26' },
      { id: 3, type: 'Titanium Debit', color: 'from-blue-700 to-blue-900', number: '4021 •••• •••• 8812', expiry: '05/27' },
      { id: 4, type: 'Business Infinity', color: 'from-[#006837] to-black', number: '4990 •••• •••• 3001', expiry: '01/30' },
    ];

    // Logic Functions (Original)
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
      <div className={`flex h-screen transition-all ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        
        {/* SIDEBAR */}
      
        <aside className={`w-72 flex flex-col shadow-2xl ${isDarkMode ? 'bg-black' : 'bg-[#006837] text-white'}`}>
          
          {/* BRANDING & BRANCH INFO SECTION */}
          <div className="p-8 border-b border-white/10">
            <div className="text-2xl font-black italic tracking-tighter">MEEZAN BANK</div>
            
            {/* Account Status Indicator */}
            <div className="mt-4 flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest leading-none">Premium Banking</p>
                <p className="text-[10px] font-medium opacity-90 mt-1">Gulberg Branch, LHR</p>
              </div>
            </div>
          </div>

            {/* NAVIGATION LINKS */}
            <nav className="mt-4 px-4 flex-1 space-y-2 font-semibold ">
              <button onClick={() => setActiveTab('summary')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'summary' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>🏠</span> <span>Summary</span>
              </button>
              
              <button onClick={() => setActiveTab('transfer')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'transfer' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>💸</span> <span>Transfer</span>
              </button>
              
              <button onClick={() => setActiveTab('history')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'history' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>📜</span> <span>History</span>
              </button>
              
              <button onClick={() => setActiveTab('loan')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'loan' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>🚗</span> <span>Financing</span>
              </button>
              
              <button onClick={() => setActiveTab('zakat')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'zakat' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>🌙</span> <span>Zakat Portal</span>
              </button>
              
              <button onClick={() => setActiveTab('bills')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'bills' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>📑</span> <span>Bills</span>
              </button>
              
              <button onClick={() => setActiveTab('cards')} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === 'cards' ? 'bg-[#ffd700] text-black shadow-lg' : 'hover:bg-white/10'}`}>
                <span>💳</span> <span>Cards</span>
              </button>
            </nav>

                {/* BOTTOM CONTROLS (Theme & Logout) */}
                <div className="p-6 border-t border-white/10 space-y-3">
                  <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full py-2 bg-white/10 rounded-xl text-xs transition-colors hover:bg-white/20">
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                  <button onClick={() => navigate('/login')} className="w-full py-3 bg-red-600 rounded-xl font-bold transition-transform active:scale-95">
                    Logout
                  </button>
                </div>
              </aside>
            
          <main className="flex-1 p-10 overflow-y-auto">
            {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-white p-10 rounded-3xl shadow-2xl text-center animate-in zoom-in">
                <div className="text-6xl mb-4 text-green-500">✔️</div>
                <h2 className="text-2xl font-bold text-gray-900">Transfer Successful</h2>
                <button onClick={() => setShowSuccess(false)} className="mt-8 w-full bg-[#006837] text-white py-3 rounded-xl font-bold">Done</button>
              </div>
            </div>
          )}

                    {/* TAB 1: SUMMARY */}
                        {activeTab === 'summary' && (
                          <div className="animate-in fade-in duration-700">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-10">
                              <div>
                                <h2 className="text-4xl font-black tracking-tighter italic">Salaam, <span className="text-[#006837]">Ahmad!</span></h2>
                                <p className="text-[9px] font-bold opacity-50 uppercase tracking-[2px] mt-1">Last Login: {now}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="relative text-2xl">🔔<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-[8px] text-white flex items-center justify-center rounded-full">3</span></div>
                                <img src="https://ui-avatars.com/api/?name=Ahmad&background=006837&color=fff" className="w-10 h-10 rounded-full border-2 border-green-500" />
                              </div>
                            </div>
              {/* DYNAMIC PRAYER WIDGET - NO SCROLLBAR */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                
                <div className={`col-span-1 lg:col-span-2 p-6 rounded-[35px] shadow-xl flex flex-col md:flex-row items-center justify-between border-t-4 border-emerald-500 transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center space-x-4 mb-6 md:mb-0 w-full md:w-auto">
                    <div className="text-4xl animate-bounce">🕌</div>
                    <div>
                      <h4 className="font-black text-[10px] uppercase opacity-60 tracking-widest">Active Prayer Time</h4>
                      <p className="text-2xl font-black text-emerald-600 flex items-center">
                        {currentPrayer} 
                        <span className="ml-2 flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Prayer List with Hidden Scrollbar */}
                  <div className="flex space-x-3 md:space-x-4 overflow-x-auto w-full md:w-auto pb-1" 
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                    <style>{`
                      div::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    
                    {prayerSchedule.map((p) => (
                      <div 
                        key={p.name} 
                        className={`flex-shrink-0 px-5 py-3 rounded-2xl text-center border transition-all duration-500 ${
                          currentPrayer === p.name 
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105' 
                          : 'bg-transparent border-gray-100 opacity-40'
                        }`}
                      >
                        <p className="text-[8px] font-bold uppercase tracking-tighter">{p.name}</p>
                        <p className="text-[10px] font-black">{p.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Islamic Reminder Card */}
                <div className={`p-6 rounded-[35px] shadow-xl relative overflow-hidden group ${isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                  <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:rotate-12 transition-transform">🌙</div>
                  <h4 className="text-[10px] font-black uppercase text-emerald-700 mb-2 tracking-widest text-left">Islamic Reminder</h4>
                  <p className={`text-xs font-bold leading-relaxed text-left ${isDarkMode ? 'text-emerald-100' : 'text-emerald-800'}`}>
                    {currentPrayer === 'Fajr' ? "Prayer is better than sleep." : 
                    currentPrayer === 'Dhuhr' ? "Take a break for your Zohr prayer." :
                    currentPrayer === 'Maghrib' ? "Time for Maghrib. Remember us in your prayers." :
                    <p className={`text-xs font-bold leading-relaxed ${isDarkMode ? 'text-emerald-100' : 'text-emerald-800'}`}>
                    "The best of you are those who are best to their families." 
                    <span className="block mt-2 opacity-60 font-medium">— Prophet Muhammad (PBUH)</span>
                  </p>}
                  </p>
                </div>
              </div>

              {/* Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className={`p-8 rounded-[40px] shadow-lg border-l-[12px] border-green-600 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className="text-xs font-bold opacity-50 uppercase">Available Balance</p>
                  <h3 className="text-4xl font-black mt-4 font-mono">PKR 2,450,900</h3>
                </div>
                <div className={`p-8 rounded-[40px] shadow-lg border-l-[12px] border-yellow-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className="text-xs font-bold opacity-50 uppercase">Monthly Profit</p>
                  <h3 className="text-4xl font-black mt-4 font-mono text-yellow-600">PKR 15,200</h3>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[{label:'Send Money',icon:'📤',t:'transfer',c:'bg-green-100 text-green-700'}, {label:'Pay Bills',icon:'🧾',t:'bills',c:'bg-blue-100 text-blue-700'}, {label:'Cards',icon:'🛡️',t:'cards',c:'bg-purple-100 text-purple-700'}, {label:'Zakat',icon:'🌙',t:'zakat',c:'bg-yellow-100 text-yellow-700'}].map(a=>(
                  <button key={a.label} onClick={()=>setActiveTab(a.t)} className={`p-4 rounded-3xl flex flex-col items-center space-y-2 border transition-all hover:scale-105 ${isDarkMode?'bg-gray-800 border-gray-700':'bg-white border-gray-50'}`}>
                    <div className={`w-12 h-12 rounded-2xl ${a.c} flex items-center justify-center text-xl`}>{a.icon}</div>
                    <span className="text-[10px] font-black uppercase opacity-70">{a.label}</span>
                  </button>
                ))}
              </div>

              {/* Recent Transactions Table */}
              <div className={`rounded-[35px] shadow-xl overflow-hidden border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                  <div>
                    <span className="font-black text-xs uppercase opacity-60">Recent Transactions</span>
                    <p className="text-[9px] font-bold text-gray-400 italic">Jan 2026 activity</p>
                  </div>
                  <button onClick={() => alert('Downloading Statement...')} className="bg-[#006837]/10 text-[#006837] px-4 py-2 rounded-xl text-[10px] font-black uppercase">📄 E-Statement</button>
                </div>
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase opacity-40">
                    <tr><th className="p-6">Date</th><th className="p-6">Description</th><th className="p-6 text-right">Amount</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50/50"><td className="p-6 text-xs font-bold">Jan 03</td><td className="p-6"><p className="text-sm font-black">IBFT Transfer to HBL</p></td><td className="p-6 text-right text-red-500 font-black text-lg">-25,000</td></tr>
                    <tr className="hover:bg-gray-50/50"><td className="p-6 text-xs font-bold">Jan 02</td><td className="p-6"><p className="text-sm font-black">Monthly Profit Credit</p></td><td className="p-6 text-right text-green-600 font-black text-lg">+4,200</td></tr>
                    <tr className="hover:bg-gray-50/50"><td className="p-6 text-xs font-bold">Dec 24</td><td className="p-6"><p className="text-sm font-black">Superstore POS Payment</p></td><td className="p-6 text-right text-red-500 font-black text-lg">-8,750</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'transfer' && (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-black text-[#006837] italic tracking-tighter">Secure Transfer</h2>
          <p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-1">
            {transferType === 'meezan' ? 'Meezan to Meezan Transfer' : 'Interbank Funds Transfer (IBFT)'}
          </p>
        </div>
      </div>

      <div className={`p-10 rounded-[45px] shadow-2xl border-t-8 border-[#ffd700] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-white'}`}>
        <form onSubmit={handleTransferSubmit} className="space-y-8">
          
          {/* TRANSFER TYPE TOGGLE (SHIFT LOGIC) */}
          <div className="grid grid-cols-2 gap-4 p-2 bg-gray-50 rounded-[25px]">
            <button 
              type="button" 
              onClick={() => setTransferType('meezan')}
              className={`py-4 rounded-[20px] font-black text-xs uppercase tracking-widest transition-all ${transferType === 'meezan' ? 'bg-[#006837] text-white shadow-lg' : 'text-gray-400'}`}
            >
              Meezan to Meezan
            </button>
            <button 
              type="button" 
              onClick={() => setTransferType('other')}
              className={`py-4 rounded-[20px] font-black text-xs uppercase tracking-widest transition-all ${transferType === 'other' ? 'bg-[#006837] text-white shadow-lg' : 'text-gray-400'}`}
            >
              Other Bank (IBFT)
            </button>
          </div>

          {/* DYNAMIC SECTION: BANK SELECTION (Only shows if 'other' is selected) */}
          <div className="space-y-4">
            {transferType === 'other' && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 italic">Select Destination Bank</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {['HBL', 'UBL', 'Alfalah', 'SadaPay', 'NBP', 'MCB', 'Nayapay', 'Standard Chartered'].map((bank) => (
                    <label key={bank} className="cursor-pointer">
                      <input type="radio" name="bank" className="hidden peer" />
                      <div className="p-3 text-center border-2 border-gray-100 rounded-2xl text-[10px] font-bold peer-checked:border-[#006837] peer-checked:bg-green-50 peer-checked:text-[#006837] transition-all hover:bg-gray-50">
                        {bank}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Account Details */}
            <div className="space-y-4">
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl opacity-30">💳</span>
                <input 
                  type="text" 
                  placeholder={transferType === 'meezan' ? "Meezan Account Number" : "IBAN / Other Bank Account No"} 
                  className={`w-full pl-14 pr-6 py-5 rounded-[25px] border-none outline-none focus:ring-2 focus:ring-[#006837] font-bold text-gray-700 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} 
                  required 
                />
              </div>

              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl opacity-30">💰</span>
                <input 
                  type="number" 
                  placeholder="Enter Amount (PKR)" 
                  className={`w-full pl-14 pr-6 py-5 rounded-[25px] border-none outline-none focus:ring-2 focus:ring-[#006837] font-black text-3xl text-[#006837] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className={`p-5 rounded-[25px] border-none outline-none focus:ring-2 focus:ring-[#006837] font-bold text-sm text-gray-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <option>Purpose: Family Support</option>
                  <option>Purpose: Education</option>
                  <option>Purpose: Business / Bill</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Reference / Comments" 
                  className={`p-5 rounded-[25px] border-none outline-none focus:ring-2 focus:ring-[#006837] font-bold text-sm ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} 
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            className="w-full bg-[#006837] text-white py-6 rounded-[30px] font-black text-xl uppercase tracking-widest shadow-2xl shadow-green-900/30 active:scale-[0.98] transition-all"
          >
            Proceed Securely
          </button>
        </form>
      </div>
    </div>
  )}

          {activeTab === 'loan' && ( /* No change here */
              <div className="animate-in slide-in-from-bottom-5 duration-500">
                  <h2 className="text-3xl font-bold mb-6 text-[#006837]">Islamic Financing (Ijarah)</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className={`p-8 rounded-3xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <h3 className="font-bold mb-4">New Application</h3>
                      <form onSubmit={handleLoanSubmit} className="space-y-4">
                      <select value={loanForm.type} onChange={(e) => setLoanForm({...loanForm, type: e.target.value})} className={`w-full p-4 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50'}`}>
                          <option>Car Ijarah</option><option>Easy Home</option><option>Bike Ijarah</option>
                      </select>
                      <input type="number" placeholder="Amount" value={loanForm.amount} onChange={(e) => setLoanForm({...loanForm, amount: e.target.value})} className={`w-full p-4 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50'}`} />
                      <button type="submit" className="w-full bg-[#006837] text-white py-4 rounded-xl font-bold">Apply Now</button>
                      </form>
                  </div>
                  <div className="lg:col-span-2">
                      <div className={`p-8 rounded-3xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <h3 className="font-bold mb-4">Active Financing</h3>
                      <table className="w-full text-left text-sm">
                          <thead><tr className="opacity-50 border-b"><th className="pb-2">Type</th><th className="pb-2">Remaining</th><th className="pb-2">Status</th></tr></thead>
                          <tbody>
                          {loans.map(loan => (
                              <tr key={loan.id} className="border-b">
                              <td className="py-3 font-bold">{loan.type}</td>
                              <td className="py-3 font-mono">PKR {loan.remaining.toLocaleString()}</td>
                              <td className="py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-black">{loan.status}</span></td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                      </div>
                  </div>
                  </div>
              </div>
          )}

          {/* TAB 4: ZAKAT */}
  {activeTab === 'zakat' && (
    <div className="max-w-2xl mx-auto animate-in zoom-in duration-300">
      <div className={`p-10 rounded-[50px] shadow-2xl border-t-[15px] border-[#006837] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Zakat Portal</h2>
          <p className="text-xs opacity-60 mt-2 font-medium italic">"Establish prayer and give zakat..." (2:110)</p>
        </div>

        {/* Nisab Info Card */}
        <div className={`mb-8 p-4 rounded-2xl border-2 border-dashed flex items-center justify-between ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-green-100 bg-green-50/50'}`}>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase opacity-50">Current Nisab (Silver)</p>
            <p className="text-sm font-bold text-green-700">PKR 155,000 approx.</p>
          </div>
          <span className="text-2xl">🌙</span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase opacity-50 ml-4 mb-1 block">Total Zakatable Wealth</label>
            <input 
              type="number" 
              value={wealth} 
              onChange={(e) => setWealth(e.target.value)} 
              placeholder="Cash, Gold, Silver, Shares..." 
              className={`w-full p-5 rounded-3xl text-center text-2xl font-bold transition-all focus:ring-4 focus:ring-green-500/20 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-2 border-gray-100'}`} 
            />
          </div>

          <button 
            onClick={calculateZakat} 
            className="w-full bg-yellow-500 text-black py-4 rounded-3xl font-black text-lg shadow-xl shadow-yellow-500/20 hover:bg-yellow-400 active:scale-95 transition-all"
          >
            CALCULATE ZAKAT
          </button>

          {zakatResult > 0 && (
            <div className="mt-8 animate-in slide-in-from-top-4 duration-500">
              <div className={`p-6 rounded-3xl text-center border-2 ${isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'}`}>
                <p className="text-sm font-bold opacity-70">Your Zakat Obligation:</p>
                <h3 className="text-4xl font-black text-green-600 font-mono mt-1">PKR {zakatResult.toLocaleString()}</h3>
                
                <div className="mt-6 pt-6 border-t border-dashed border-green-300">
                  <p className="text-[10px] mb-3 opacity-60 uppercase font-bold tracking-widest">Donate to Verified Charities</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => alert('Redirecting to Indus Hospital...')} className="py-2 px-3 bg-white text-gray-800 text-[10px] font-bold rounded-xl shadow-sm hover:bg-gray-50 border">Indus Hospital</button>
                    <button onClick={() => alert('Redirecting to Edhi Foundation...')} className="py-2 px-3 bg-white text-gray-800 text-[10px] font-bold rounded-xl shadow-sm hover:bg-gray-50 border">Edhi Foundation</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
          {/* NEW TAB 5: BILL PAYMENTS */}
          {activeTab === 'bills' && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-10 duration-500">
              <h2 className="text-3xl font-black mb-8 text-[#006837]">Utility Bill Payments</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {['Electricity', 'Gas', 'Water', 'Internet'].map((item) => (
                  <div key={item} className={`p-6 rounded-[30px] text-center cursor-pointer hover:scale-105 transition-all shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="text-3xl mb-2">{item === 'Electricity' ? '⚡' : item === 'Gas' ? '🔥' : item === 'Water' ? '💧' : '🌐'}</div>
                    <p className="text-[10px] font-black uppercase opacity-60">{item}</p>
                  </div>
                ))}
              </div>
              <div className={`p-8 rounded-[35px] shadow-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-50'}`}>
                <form className="space-y-5">
                    <select className={`w-full p-4 rounded-2xl border-2 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                      <option>Select Company (LESCO, SNGPL, PTCL)</option>
                      <option>LESCO - Electricity</option>
                      <option>SNGPL - Gas</option>
                      <option>K-Electric</option>
                    </select>
                    <input type="text" placeholder="Consumer Reference ID" className={`w-full p-4 rounded-2xl border-2 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}  />
                    <button type="button" onClick={() => alert('Fetching Bill Details...')} className="w-full bg-[#006837] text-white py-4 rounded-2xl font-black shadow-xl">FETCH BILL</button>
                </form>
              </div>
            </div>
          )}

          {/* NEW TAB 6: CARDS MANAGEMENT (With 4-5 Card Types) */}
          {activeTab === 'cards' && (
            <div className="max-w-5xl mx-auto animate-in zoom-in duration-500">
              <h2 className="text-3xl font-black mb-8 text-[#006837]">My Islamic Cards</h2>
              
              {/* Horizontal Scrollable Cards */}
              <div className="flex space-x-6 overflow-x-auto pb-8 snap-x">
                {myCards.map((card) => (
                  <div key={card.id} className={`flex-shrink-0 w-80 h-48 rounded-[30px] p-6 text-white shadow-2xl bg-gradient-to-br ${card.color} snap-center transition-transform hover:scale-105`}>
                    <div className="flex justify-between items-start">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{card.type}</p>
                      <div className="text-lg italic font-bold">MEEZAN</div>
                    </div>
                    <div className="mt-8 font-mono text-xl tracking-[3px]">{card.number}</div>
                    <div className="mt-8 flex justify-between items-end">
                      <div>
                        <p className="text-[8px] opacity-60 uppercase">Card Holder</p>
                        <p className="text-xs font-bold tracking-widest">AHMAD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] opacity-60 uppercase">Expires</p>
                        <p className="text-xs font-bold">{card.expiry}</p>
                      </div>
                    </div>
                  </div>
                  
                ))}
              </div>

              {/* Card Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className={`p-6 rounded-[30px] shadow-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white border'}`}>
                    <div><p className="font-bold">E-Commerce</p><p className="text-[10px] opacity-50">Online shopping & Netflix</p></div>
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full ml-auto"></div></div>
                </div>
                <div className={`p-6 rounded-[30px] shadow-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white border'}`}>
                    <div><p className="font-bold">Contactless Payment</p><p className="text-[10px] opacity-50">NFC & POS Tap</p></div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <div className={`p-6 rounded-[30px] shadow-lg flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white border'}`}>
                    <div><p className="font-bold">Daily Limit</p><p className="text-[10px] opacity-50">Current: PKR 100,000</p></div>
                    <button className="text-xs font-bold text-green-600 underline uppercase">Edit</button>
                </div>
                <button className="p-6 bg-red-100 text-red-600 rounded-[30px] font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-500/10">BLOCK CURRENT CARD</button>
              </div>
            </div>
          )}
          
          {/* TAB 7: FULL TRANSACTION HISTORY */}
        {activeTab === 'history' && (
          <div className="animate-in fade-in slide-in-from-left-5 duration-500">
          <h2 className="text-3xl font-black mb-8 text-[#006837]">Transaction History</h2>
      
      {/* FILTERS SECTION */}
      <div className={`p-6 rounded-[30px] shadow-lg mb-8 flex flex-wrap gap-4 items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Money In/Out Dropdown */}
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`p-3 rounded-xl border-2 outline-none font-bold ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}
        >
          <option value="all">All Transactions</option>
          <option value="credit">Money In (+)</option>
          <option value="debit">Money Out (-)</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by description..."
          className={`flex-1 p-3 rounded-xl border-2 outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* DATA TABLE */}
      <div className={`rounded-[35px] shadow-2xl overflow-hidden border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <table className="w-full text-left">
          <thead className={`text-[10px] uppercase font-black tracking-widest ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
            <tr>
              <th className="p-6">Date</th>
              <th className="p-6">Description</th>
              <th className="p-6 text-right">Amount (PKR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Filtering Logic applied here */}
            {[
              // Sample Data for History (Combination of Credits and Debits)
              { id: 101, type: "Salary Credit", amount: 150000, date: "Jan 01, 2026", category: "credit" },
              { id: 102, type: "Electricity Bill", amount: -12000, date: "Jan 02, 2026", category: "debit" },
              { id: 103, type: "Profit Payout", amount: 4500, date: "Jan 02, 2026", category: "credit" },
              { id: 104, type: "Superstore POS", amount: -3200, date: "Jan 03, 2026", category: "debit" },
              
              ...loans.map(l => ({ id: l.id, type: l.type, amount: -l.amount, date: "Recent", category: "debit" }))
            ]
              .filter((t) => {
                // 1. Filter by Type (Money In/Out)
                const matchType = filterType === "all" 
                  ? true 
                  : filterType === "credit" ? t.amount > 0 : t.amount < 0;
                
                // 2. Filter by Search Text
                const matchSearch = t.type.toLowerCase().includes(search.toLowerCase());
                
                return matchType && matchSearch;
              })
              .map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 text-sm opacity-70">{t.date}</td>
                  <td className="p-6 font-bold">{t.type}</td>
                  <td className={`p-6 text-right font-black text-lg ${t.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                    {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
    

        </main>
      </div>
    );
  };

  export default Dashboard;