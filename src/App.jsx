import React, { useEffect, useMemo, useState } from 'react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell
} from 'recharts';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Building2,
  Check, CheckCircle2, ChevronDown, CircleDollarSign, ClipboardList,
  Clock3, CreditCard, FileText, Filter, IndianRupee, Leaf, Loader2, LogOut, Menu, MessageSquare, Package,
  Plus, Recycle, Search, Send, Settings, ShieldCheck, ShoppingBag,
  Smartphone, Truck, Users, Wallet, X
} from 'lucide-react';

const KEY = 'w2v-platform-v2';
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n || 0));
const today = () => new Date().toISOString().slice(0, 10);
const now = () => new Date().toISOString();
const uid = prefix => `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
const seed = {
  users: [
    { id: 'seller-demo', name: 'Aarav Sharma', company: 'GreenCycle Industries', email: 'seller@demo.com', password: 'demo123', role: 'seller', location: 'Ludhiana, Punjab', gstin: '03ABCDE1234F1Z5' },
    { id: 'buyer-demo', name: 'Meera Kapoor', company: 'EcoPolymer Works', email: 'buyer@demo.com', password: 'demo123', role: 'buyer', location: 'Chandigarh, India', gstin: '04PQRSX5678K1Z2' }
  ],
  buyers: [
    // Plastic buyers
    { id: 'b1', company: 'EcoPolymer Works', type: 'Plastic Recycler', location: 'Chandigarh', accepts: ['Plastic'], materials: ['PET', 'HDPE', 'LDPE'], min: 100, max: 10000, price: '₹18,000–₹24,000 / ton', rating: 4.8, verified: true, email: 'buyer@demo.com' },
    { id: 'b7', company: 'GreenCycle Polymers', type: 'Plastic Processor', location: 'Mohali', accepts: ['Plastic'], materials: ['PET', 'PP', 'PS'], min: 200, max: 15000, price: '₹17,000–₹25,000 / ton', rating: 4.6, verified: true, email: 'greencycle@example.com' },
    { id: 'b8', company: 'PlastiCycle India', type: 'Recycling Plant', location: 'Ludhiana', accepts: ['Plastic'], materials: ['HDPE', 'LDPE', 'PVC'], min: 500, max: 20000, price: '₹16,500–₹23,000 / ton', rating: 4.5, verified: true, email: 'plastic@example.com' },
    { id: 'b9', company: 'ReForm Plastics', type: 'Circular Economy', location: 'Delhi NCR', accepts: ['Plastic'], materials: ['PET', 'HDPE', 'Mixed Plastics'], min: 1000, max: 50000, price: '₹19,000–₹26,000 / ton', rating: 4.7, verified: true, email: 'reform@example.com' },

    // Metal Scraps buyers
    { id: 'b2', company: 'MetalLoop Foundry', type: 'Foundry', location: 'Mandi Gobindgarh', accepts: ['Metal Scraps'], materials: ['Aluminium', 'Copper', 'Iron'], min: 250, max: 20000, price: '₹32,000–₹48,000 / ton', rating: 4.7, verified: true, email: 'metal@example.com' },
    { id: 'b10', company: 'SteelStrong Metals', type: 'Steel Mill', location: 'Jalandhar', accepts: ['Metal Scraps'], materials: ['Iron', 'Steel', 'Stainless Steel'], min: 1000, max: 100000, price: '₹28,000–₹38,000 / ton', rating: 4.6, verified: true, email: 'steelstrong@example.com' },
    { id: 'b11', company: 'Alumix Alloys', type: 'Aluminium Smelter', location: 'Baddi', accepts: ['Metal Scraps'], materials: ['Aluminium', 'Aluminium Alloys'], min: 500, max: 25000, price: '₹1,40,000–₹1,80,000 / ton', rating: 4.8, verified: true, email: 'alumix@example.com' },
    { id: 'b12', company: 'CopperCraft Industries', type: 'Copper Refiner', location: 'Panipat', accepts: ['Metal Scraps'], materials: ['Copper', 'Brass', 'Bronze'], min: 100, max: 10000, price: '₹5,50,000–₹7,00,000 / ton', rating: 4.9, verified: true, email: 'coppercraft@example.com' },

    // Food Waste buyers
    { id: 'b3', company: 'Punjab BioEnergy', type: 'Biogas Plant', location: 'Patiala', accepts: ['Food Waste'], materials: ['Food waste', 'Organic residue'], min: 500, max: 50000, price: '₹2,000–₹5,000 / ton', rating: 4.6, verified: true, email: 'bio@example.com' },
    { id: 'b13', company: 'OrganicLoop Fertilizers', type: 'Composting Facility', location: 'Sangrur', accepts: ['Food Waste'], materials: ['Food waste', 'Agricultural residue', 'Garden waste'], min: 200, max: 30000, price: '₹1,500–₹4,000 / ton', rating: 4.4, verified: true, email: 'organicloop@example.com' },
    { id: 'b14', company: 'BioGas Punjab', type: 'Energy Recovery', location: 'Barnala', accepts: ['Food Waste'], materials: ['Food waste', 'Dairy waste', 'Poultry waste'], min: 1000, max: 80000, price: '₹2,500–₹5,500 / ton', rating: 4.5, verified: true, email: 'biogas@example.com' },
    { id: 'b15', company: 'GreenEarth Organics', type: 'Vermicomposting', location: 'Ropar', accepts: ['Food Waste'], materials: ['Vegetable waste', 'Fruit waste', 'Market waste'], min: 100, max: 15000, price: '₹3,000–₹6,000 / ton', rating: 4.3, verified: true, email: 'greenearth@example.com' },

    // Paper/Cardboard buyers
    { id: 'b4', company: 'RePaper Mills', type: 'Pulp Mill', location: 'Panipat', accepts: ['Paper/Cardboard'], materials: ['Cardboard', 'Kraft paper'], min: 200, max: 30000, price: '₹6,000–₹10,000 / ton', rating: 4.5, verified: true, email: 'paper@example.com' },
    { id: 'b16', company: 'EcoPaper Solutions', type: 'Paper Recycler', location: 'Yamunanagar', accepts: ['Paper/Cardboard'], materials: ['Newspaper', 'Magazine', 'Office paper', 'Cardboard'], min: 500, max: 40000, price: '₹5,500–₹9,500 / ton', rating: 4.6, verified: true, email: 'ecopaper@example.com' },
    { id: 'b17', company: 'FiberBoard Industries', type: 'Board Manufacturer', location: 'Karnal', accepts: ['Paper/Cardboard'], materials: ['Corrugated boxes', 'Kraft paper', 'Mixed paper'], min: 1000, max: 50000, price: '₹7,000–₹12,000 / ton', rating: 4.4, verified: true, email: 'fiberboard@example.com' },
    { id: 'b18', company: 'PaperCycle Ltd', type: 'Tissue Manufacturer', location: 'Ambala', accepts: ['Paper/Cardboard'], materials: ['White paper', 'Printing waste', 'Cardboard'], min: 300, max: 25000, price: '₹8,000–₹14,000 / ton', rating: 4.7, verified: true, email: 'papercycle@example.com' },

    // Textile buyers
    { id: 'b5', company: 'FiberLoop Textiles', type: 'Fiber Recycler', location: 'Amritsar', accepts: ['Textile'], materials: ['Cotton', 'Polyester'], min: 100, max: 8000, price: '₹8,000–₹16,000 / ton', rating: 4.4, verified: true, email: 'fiber@example.com' },
    { id: 'b19', company: 'ReThread India', type: 'Textile Upcycler', location: 'Ludhiana', accepts: ['Textile'], materials: ['Cotton', 'Wool', 'Mixed fibers', 'Denim'], min: 200, max: 15000, price: '₹10,000–₹20,000 / ton', rating: 4.5, verified: true, email: 'rethread@example.com' },
    { id: 'b20', company: 'EcoWeave Fabrics', type: 'Fabric Manufacturer', location: 'Jalandhar', accepts: ['Textile'], materials: ['Polyester', 'Nylon', 'Blended fabrics'], min: 500, max: 30000, price: '₹12,000–₹25,000 / ton', rating: 4.3, verified: true, email: 'ecoweave@example.com' },
    { id: 'b21', company: 'GreenStitch Recycling', type: 'Circular Fashion', location: 'Delhi NCR', accepts: ['Textile'], materials: ['Post-consumer textiles', 'Factory offcuts', 'Cotton', 'Polyester'], min: 1000, max: 40000, price: '₹9,000–₹18,000 / ton', rating: 4.6, verified: true, email: 'greenstitch@example.com' },

    // Chemical Byproducts buyers
    { id: 'b6', company: 'SolvPure Chemicals', type: 'Solvent Recovery', location: 'Baddi', accepts: ['Chemical Byproducts'], materials: ['Spent solvent', 'Process residue'], min: 50, max: 5000, price: 'Case dependent', rating: 4.9, verified: true, email: 'solv@example.com' },
    { id: 'b22', company: 'ChemCycle Recovery', type: 'Chemical Recycler', location: 'Derabassi', accepts: ['Chemical Byproducts'], materials: ['Spent acids', 'Catalyst residues', 'Process liquids'], min: 100, max: 10000, price: 'Case dependent', rating: 4.7, verified: true, email: 'chemcycle@example.com' },
    { id: 'b23', company: 'EcoChem Solutions', type: 'Waste Treatment', location: 'Panchkula', accepts: ['Chemical Byproducts'], materials: ['Organic solvents', 'Inorganic salts', 'Process waste'], min: 200, max: 15000, price: 'Case dependent', rating: 4.5, verified: true, email: 'ecochem@example.com' },
    { id: 'b24', company: 'PureStream Industries', type: 'Resource Recovery', location: 'Mohali', accepts: ['Chemical Byproducts'], materials: ['Recovered solvents', 'Byproduct streams', 'Off-spec materials'], min: 500, max: 20000, price: 'Case dependent', rating: 4.8, verified: true, email: 'purestream@example.com' }
  ],
  rfqs: [
    { id: 'RFQ-1047', sellerId: 'seller-demo', sellerCompany: 'GreenCycle Industries', category: 'Plastic', material: 'PET Plastic', quantity: 500, unit: 'kg', packaging: 'Baled', description: 'Clean PET flakes, no contamination.', buyerId: 'b1', buyerCompany: 'EcoPolymer Works', status: 'Quoted', createdAt: '2026-10-28', quote: 21000, quoteNote: 'Subject to quality inspection', quoteUnit: 'ton' },
    { id: 'RFQ-1046', sellerId: 'seller-demo', sellerCompany: 'GreenCycle Industries', category: 'Metal Scraps', material: 'Aluminium Scrap', quantity: 1, unit: 'ton', packaging: 'Loose', description: 'Sorted aluminium offcuts.', buyerId: 'b2', buyerCompany: 'MetalLoop Foundry', status: 'Accepted', createdAt: '2026-10-26', quote: 42000, quoteUnit: 'ton' },
    { id: 'RFQ-1045', sellerId: 'seller-demo', sellerCompany: 'GreenCycle Industries', category: 'Paper/Cardboard', material: 'Corrugated Cardboard', quantity: 2, unit: 'ton', packaging: 'Baled', description: 'Dry and sorted cardboard.', buyerId: 'b4', buyerCompany: 'RePaper Mills', status: 'Pending', createdAt: '2026-10-24' },
    { id: 'RFQ-1044', sellerId: 'seller-demo', sellerCompany: 'GreenCycle Industries', category: 'Food Waste', material: 'Food Waste', quantity: 800, unit: 'kg', packaging: 'Bins', description: 'Pre-consumer vegetable waste.', buyerId: 'b3', buyerCompany: 'Punjab BioEnergy', status: 'Rejected', createdAt: '2026-10-21' },
    { id: 'RFQ-1043', sellerId: 'seller-demo', sellerCompany: 'GreenCycle Industries', category: 'Plastic', material: 'HDPE Scrap', quantity: 1.2, unit: 'ton', packaging: 'Baled', description: 'Mixed colour HDPE, washed.', buyerId: 'b1', buyerCompany: 'EcoPolymer Works', status: 'Completed', createdAt: '2026-10-15', quote: 19500, finalValue: 23400, actualQuantity: 1.2, quoteUnit: 'ton' }
  ],
  transactions: [
    { id: 'TXN-201', rfqId: 'RFQ-1043', sellerId: 'seller-demo', buyerId: 'b1', sellerCompany: 'GreenCycle Industries', buyerCompany: 'EcoPolymer Works', material: 'HDPE Scrap', quantity: 1.2, value: 23400, status: 'Completed', date: '2026-10-20' }
  ],
  notifications: [
    { id: 'N-001', userId: 'seller-demo', type: 'rfq', text: 'Your RFQ RFQ-1047 was sent to EcoPolymer Works', date: '2026-10-28', read: false, rfqId: 'RFQ-1047' },
    { id: 'N-002', userId: 'buyer-demo', type: 'rfq', text: 'New RFQ RFQ-1047 available from GreenCycle Industries', date: '2026-10-28', read: false, rfqId: 'RFQ-1047' }
  ]
};

function loadDB() { try { const d = JSON.parse(localStorage.getItem(KEY)); return d?.users ? d : seed; } catch { return seed; } }

// Notification helper functions
const createNotification = (db, userId, type, text, rfqId = null) => ({
  id: uid('N'),
  userId,
  type,
  text,
  date: today(),
  read: false,
  rfqId,
  createdAt: now()
});

const addNotifications = (db, notifications) => {
  const newDb = structuredClone(db);
  newDb.notifications = [...notifications, ...(newDb.notifications || [])];
  return newDb;
};

const getUserNotifications = (db, userId) => {
  return (db.notifications || []).filter(n => n.userId === userId);
};

const getUnreadCount = (db, userId) => {
  return (db.notifications || []).filter(n => n.userId === userId && !n.read).length;
};

function App() {
  const [db, setDb] = useState(loadDB);
  const [user, setUser] = useState(() => { const id = localStorage.getItem('w2v-session'); return loadDB().users.find(u => u.id === id) || null; });
  const [page, setPage] = useState('Dashboard');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(db)), [db]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 3200); return () => clearTimeout(t); } }, [toast]);

  // Random interval notifications for buyers - more intelligent matching
  useEffect(() => {
    if (!user || user.role !== 'buyer') return;

    const createBuyerNotification = () => {
      const buyer = db.buyers.find(b => b.id === user.id || b.company === user.company);

      const allRFQs = db.rfqs.filter(r =>
        r.status === 'Pending' &&
        r.buyerId !== user.id &&
        r.sellerId !== user.id
      );

      // Check for new RFQs matching buyer interests
      const relevantRFQs = allRFQs.filter(rfq => {
        if (!buyer || !buyer.accepts || buyer.accepts.length === 0) return true;

        // Match by category
        if (buyer.accepts.includes(rfq.category)) return true;

        // Match by material keywords
        const materialLower = rfq.material.toLowerCase();
        return buyer.accepts.some(accepted =>
          materialLower.includes(accepted.toLowerCase()) ||
          accepted.toLowerCase().includes(materialLower)
        );
      });

      if (relevantRFQs.length > 0) {
        // Pick a random relevant RFQ, but weight by recency and match quality
        const scoredRFQs = relevantRFQs.map(rfq => {
          let score = 1;
          // Higher score for exact category match
          if (buyer?.accepts?.includes(rfq.category)) score += 2;
          // Higher score for newer RFQs
          const daysOld = (Date.now() - new Date(rfq.createdAt + 'T00:00:00').getTime()) / (1000 * 60 * 60 * 24);
          if (daysOld < 2) score += 1;
          // Higher score for RFQs in preferred quantity range
          if (buyer?.min && buyer?.max) {
            const qtyInKg = rfq.unit === 'kg' ? rfq.quantity : rfq.quantity * 1000;
            if (qtyInKg >= buyer.min && qtyInKg <= buyer.max) score += 1;
          }
          return { rfq, score };
        });

        // Weighted random selection
        const totalScore = scoredRFQs.reduce((sum, item) => sum + item.score, 0);
        let random = Math.random() * totalScore;
        let selectedRFQ = scoredRFQs[0].rfq;

        for (const item of scoredRFQs) {
          random -= item.score;
          if (random <= 0) {
            selectedRFQ = item.rfq;
            break;
          }
        }

        // Only notify if we haven't already notified about this RFQ
        const alreadyNotified = db.notifications.some(n =>
          n.userId === user.id && n.rfqId === selectedRFQ.id && n.type === 'new_rfq'
        );

        if (!alreadyNotified) {
          const buyerName = buyer?.company || 'Your company';
          update(d => addNotifications(d, [createNotification(d, user.id, 'new_rfq',
            `New RFQ matching your interests: ${selectedRFQ.material} (${selectedRFQ.quantity} ${selectedRFQ.unit}) from ${selectedRFQ.sellerCompany}`,
            selectedRFQ.id)]));
        }
      }
    };

    // Initial check
    createBuyerNotification();

    // Random interval between 60-180 seconds (less aggressive)
    const scheduleNext = () => {
      const interval = 60000 + Math.random() * 120000; // 60-180 seconds
      const timeout = setTimeout(() => {
        createBuyerNotification();
        scheduleNext();
      }, interval);
      return timeout;
    };

    const timeoutId = scheduleNext();

    return () => clearTimeout(timeoutId);
  }, [user, db.rfqs.length]);

  const update = fn => setDb(old => fn(structuredClone(old)));
  const notify = message => setToast(message);

  // Enhanced notify function that also creates in-app notifications
  const notifyWithInApp = (userId, type, text, rfqId = null) => {
    setToast(text);
    update(d => addNotifications(d, [createNotification(d, userId, type, text, rfqId)]));
  };

  const markNotificationRead = (notificationId) => {
    update(d => {
      const notif = d.notifications.find(n => n.id === notificationId);
      if (notif) notif.read = true;
      return d;
    });
  };

  const markAllNotificationsRead = () => {
    if (!user) return;
    update(d => {
      d.notifications.forEach(n => {
        if (n.userId === user.id) n.read = true;
      });
      return d;
    });
  };

  const logout = () => { localStorage.removeItem('w2v-session'); setUser(null); setPage('Dashboard'); };
  const login = u => { setUser(u); localStorage.setItem('w2v-session', u.id); setPage('Dashboard'); };
  if (!user) return <Auth db={db} update={update} onLogin={login} notify={notify} />;
  const nav = user.role === 'seller'
    ? [{ name: 'Dashboard', icon: Activity }, { name: 'New RFQ', icon: Plus }, { name: 'My RFQs', icon: ClipboardList }, { name: 'Buyers Directory', icon: Users }, { name: 'Transactions', icon: Truck }, { name: 'Messages', icon: MessageSquare }, { name: 'Company Profile', icon: Building2 }, { name: 'Settings', icon: Settings }]
    : [{ name: 'Dashboard', icon: Activity }, { name: 'RFQ Inbox', icon: ClipboardList }, { name: 'My Quotes', icon: FileText }, { name: 'Transactions', icon: Truck }, { name: 'Messages', icon: MessageSquare }, { name: 'Company Profile', icon: Building2 }, { name: 'Settings', icon: Settings }];
  const go = p => { setPage(p); setMobileNav(false); };
  const unreadCount = getUnreadCount(db, user.id);
  const userNotifications = getUserNotifications(db, user.id).slice(0, 5);

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Leaf size={23}/></span><span>Waste to<br/>Value</span></div>
      <div className="workspace"><span className="workspace-dot"/>{user.role === 'seller' ? 'Seller workspace' : 'Buyer workspace'}<ChevronDown size={14}/></div>
      <nav>{nav.map(n => <button key={n.name} className={`nav-item ${page === n.name ? 'active' : ''}`} onClick={() => go(n.name)}><n.icon size={18}/><span>{n.name}</span>{n.name === 'Messages' && <i className="nav-count">2</i>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="eco-card"><Leaf size={22}/><b>Waste less.<br/>Create more value.</b><small>Every material has a next life.</small></div><div className="user-mini"><div className="avatar">{initials(user.name)}</div><div><b>{user.name}</b><small>{user.company}</small></div><button title="Log out" onClick={logout}><LogOut size={17}/></button></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <button className="icon-btn mobile-menu" onClick={() => setMobileNav(!mobileNav)}><Menu/></button>
        <div className="crumb">Workspace <span>/</span> <b>{page}</b></div>
        <div className="top-actions">
          <div className="search-global"><Search size={16}/><input placeholder="Search RFQs, materials, companies..." onKeyDown={e => { if (e.key === 'Enter') { setPage(user.role === 'seller' ? 'My RFQs' : 'RFQ Inbox'); } }}/></div>
          {/* Notification Bell with Dropdown */}
          <div className="notification-wrapper">
            <button className="icon-btn notification" onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}>
              <Bell size={19}/>
              {unreadCount > 0 && <i className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</i>}
            </button>
            {notifOpen && <NotificationDropdown notifications={userNotifications} unreadCount={unreadCount} onMarkRead={markNotificationRead} onMarkAllRead={markAllNotificationsRead} onClose={() => setNotifOpen(false)} onOpenRfq={rfqId => setModal({ type: 'detail', rfq: db.rfqs.find(r => r.id === rfqId) })} onViewAll={() => go('Notifications')} />}
          </div>
          {/* User Profile Dropdown */}
          <div className="profile-wrapper">
            <button className="top-profile" onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}>
              <div className="avatar small">{initials(user.name)}</div>
              <span>{user.name.split(' ')[0]}</span>
              <ChevronDown size={14}/>
            </button>
            {profileOpen && <ProfileDropdown user={user} onClose={() => setProfileOpen(false)} onNavigate={go} />}
          </div>
        </div>
      </header>
      <section className="page-content">
        {page === 'Dashboard' && <Dashboard user={user} db={db} onNavigate={go} setModal={setModal} />}
        {page === 'My RFQs' && user.role === 'seller' && <RFQList user={user} db={db} onNew={() => go('New RFQ')} onOpen={r => setModal({ type: 'detail', rfq: r })} />}
        {page === 'New RFQ' && user.role === 'seller' && <NewRFQ user={user} db={db} update={update} notify={notify} onNavigate={go} />}
        {page === 'RFQ Inbox' && user.role === 'buyer' && <BuyerInbox user={user} db={db} onOpen={r => setModal({ type: 'detail', rfq: r })} setModal={setModal} update={update} notify={notify} />}
        {page === 'My Quotes' && user.role === 'buyer' && <BuyerQuotes user={user} db={db} onOpen={r => setModal({ type: 'detail', rfq: r })} />}
        {page === 'Buyers Directory' && <BuyersDirectory db={db} onSend={b => setModal({ type: 'rfq', buyer: b })} />}
        {page === 'Transactions' && <Transactions user={user} db={db} update={update} notify={notify} />}
        {page === 'Messages' && <Messages user={user} db={db} />}
        {page === 'Notifications' && <NotificationsPage user={user} db={db} update={update} />}
        {page === 'Company Profile' && <CompanyProfile user={user} db={db} update={update} notify={notify} />}
        {page === 'Settings' && <SettingsPage user={user} onLogout={logout} />}
      </section>
    </main>
    {modal && <Modal modal={modal} close={() => setModal(null)} user={user} db={db} update={update} notify={notify} />}
    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>;
}

function initials(s='') { return s.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase(); }

// Notification Dropdown Component
function NotificationDropdown({ notifications, unreadCount, onMarkRead, onMarkAllRead, onClose, onOpenRfq, onViewAll }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_rfq': return <ClipboardList size={16} />;
      case 'quote': return <FileText size={16} />;
      case 'payment': return <IndianRupee size={16} />;
      case 'rfq': return <Send size={16} />;
      case 'accepted': return <CheckCircle2 size={16} />;
      case 'completed': return <Truck size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'new_rfq': return '#2f6f52';
      case 'quote': return '#559b78';
      case 'payment': return '#d4a843';
      case 'rfq': return '#1b4332';
      case 'accepted': return '#34794d';
      case 'completed': return '#6990bd';
      default: return '#7b8981';
    }
  };

  if (!notifications.length) {
    return (
      <div className="notif-dropdown">
        <div className="notif-header">
          <span>Notifications</span>
          {unreadCount > 0 && <button className="text-btn" onClick={onMarkAllRead}>Mark all read</button>}
        </div>
        <div className="notif-empty">
          <Bell size={28} />
          <p>No notifications yet</p>
          <small>You'll see updates about RFQs here</small>
        </div>
      </div>
    );
  }

  return (
    <div className="notif-dropdown">
      <div className="notif-header">
        <span>Notifications</span>
        {unreadCount > 0 && <button className="text-btn" onClick={onMarkAllRead}>Mark all read</button>}
      </div>
      <div className="notif-list">
        {notifications.map(n => (
          <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`} onClick={() => {
            onMarkRead(n.id);
            if (n.rfqId) {
              onOpenRfq(n.rfqId);
              onClose();
            }
          }}>
            <div className="notif-icon" style={{ background: `${getNotificationColor(n.type)}1a`, color: getNotificationColor(n.type) }}>
              {getNotificationIcon(n.type)}
            </div>
            <div className="notif-content">
              <p>{n.text}</p>
              <small>{new Date(n.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</small>
            </div>
            {!n.read && <div className="notif-dot" />}
          </div>
        ))}
      </div>
      <div className="notif-footer">
        <button className="text-btn" onClick={() => { onViewAll(); onClose(); }}>View all notifications</button>
      </div>
    </div>
  );
}

// Profile Dropdown Component
function ProfileDropdown({ user, onClose, onNavigate }) {
  return (
    <div className="profile-dropdown">
      <div className="profile-dropdown-header">
        <div className="avatar">{initials(user.name)}</div>
        <div>
          <b>{user.name}</b>
          <small>{user.email}</small>
        </div>
      </div>
      <div className="profile-dropdown-divider" />
      <button className="profile-dropdown-item" onClick={() => { onNavigate('Company Profile'); onClose(); }}>Company Profile</button>
      <button className="profile-dropdown-item" onClick={() => { onNavigate('Settings'); onClose(); }}>Settings</button>
    </div>
  );
}

function Auth({ db, update, onLogin, notify }) {
  const [mode, setMode] = useState('login'); const [role, setRole] = useState('seller');
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '', location: '' });
  const [error, setError] = useState('');
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); setError('');
    if (mode === 'login') { const u = db.users.find(x => x.email.toLowerCase() === form.email.toLowerCase() && x.password === form.password); if (!u) return setError('Email or password is incorrect. Try the demo account below.'); onLogin(u); return; }
    if (db.users.some(x => x.email.toLowerCase() === form.email.toLowerCase())) return setError('An account with this email already exists.');
    const u = { ...form, id: uid(role), role, gstin: '', createdAt: today() }; update(d => { d.users.push(u); if (role === 'buyer') d.buyers.push({ id: u.id, company: u.company, type: 'Registered Buyer', location: u.location, accepts: ['Food Waste','Metal Scraps','Plastic','Paper/Cardboard','Textile','Chemical Byproducts'], materials: ['To be confirmed'], min: 1, max: 100000, price: 'Request quotation', rating: 0, verified: false, email: u.email }); return d; }); onLogin(u);
  };
  return <div className="auth-screen"><div className="auth-left"><div className="auth-brand"><span className="brand-mark"><Leaf/></span><b>Waste to Value</b></div><div className="auth-copy"><span className="eyebrow light">THE CIRCULAR ECONOMY, CONNECTED</span><h1>Give waste a<br/><em>second life.</em></h1><p>A smarter way for businesses to exchange industrial byproducts, find value in unused materials, and build a more circular supply chain.</p><div className="auth-points"><span><CheckCircle2/> Verified business network</span><span><CheckCircle2/> Transparent RFQ workflow</span><span><CheckCircle2/> Track value and impact</span></div></div><div className="auth-foot">© 2026 Waste to Value <span>Built for a circular future</span></div></div><div className="auth-right"><div className="auth-form-wrap"><div className="mobile-auth-brand"><span className="brand-mark"><Leaf/></span><b>Waste to Value</b></div><span className="eyebrow">WELCOME TO THE NETWORK</span><h2>{mode === 'login' ? 'Sign in to your workspace' : 'Create your business account'}</h2><p className="muted">{mode === 'login' ? 'Pick up where your business left off.' : 'Join businesses turning byproducts into resources.'}</p>
    {mode === 'signup' && <div className="role-switch"><button className={role === 'seller' ? 'selected' : ''} onClick={() => setRole('seller')}><Package size={17}/> I sell waste</button><button className={role === 'buyer' ? 'selected' : ''} onClick={() => setRole('buyer')}><ShoppingBag size={17}/> I buy materials</button></div>}
    <form onSubmit={submit} className="auth-form">{mode === 'signup' && <><label>Full name<input name="name" required value={form.name} onChange={change} placeholder="e.g. Aarav Sharma"/></label><label>Company name<input name="company" required value={form.company} onChange={change} placeholder="Your registered business"/></label><label>Business location<input name="location" required value={form.location} onChange={change} placeholder="City, State"/></label></>}<label>Work email<input type="email" name="email" required value={form.email} onChange={change} placeholder="you@company.com"/></label><label>Password<input type="password" name="password" required minLength="6" value={form.password} onChange={change} placeholder="At least 6 characters"/></label>{error && <div className="form-error">{error}</div>}<button className="btn primary full" type="submit">{mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={17}/></button></form>
    <div className="auth-toggle">{mode === 'login' ? <>New to the network? <button onClick={() => setMode('signup')}>Create an account</button></> : <>Already registered? <button onClick={() => setMode('login')}>Sign in</button></>}</div>
    {mode === 'login' && <div className="demo-box"><b>Explore with demo accounts</b><div><button onClick={() => setForm({ ...form, email: 'seller@demo.com', password: 'demo123' })}><span className="demo-dot seller-dot"/> Seller demo <small>seller@demo.com</small></button><button onClick={() => setForm({ ...form, email: 'buyer@demo.com', password: 'demo123' })}><span className="demo-dot buyer-dot"/> Buyer demo <small>buyer@demo.com</small></button></div><small>Password for both: <b>demo123</b></small></div>}
    <div className="auth-legal">By continuing, you agree to our <a>Terms</a> and <a>Privacy Policy</a>.</div></div></div></div>;
}

function Dashboard({ user, db, onNavigate, setModal }) {
  const seller = user.role === 'seller';
  const rfqs = db.rfqs.filter(r => seller ? r.sellerId === user.id : r.buyerId === user.id || r.buyerCompany === user.company);
  const txns = db.transactions.filter(t => seller ? t.sellerId === user.id || t.sellerCompany === user.company : t.buyerId === user.id || t.buyerCompany === user.company);
  const completed = txns.filter(t => t.status === 'Completed');
  const revenue = completed.reduce((s, t) => s + Number(t.value || 0), 0);
  const pending = rfqs.filter(r => ['Pending', 'Quoted'].includes(r.status)).length;
  const diverted = completed.reduce((s, t) => s + Number(t.quantity || 0), 0);
  const trend = useMemo(() => { const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']; const year = new Date().getFullYear(); return months.map((month, i) => { const monthIndex = 4 + i; const value = completed.filter(t => { const d = new Date(`${t.date}T00:00:00`); return d.getFullYear() === year && d.getMonth() === monthIndex; }).reduce((sum, t) => sum + Number(t.value || 0), 0); return { month, revenue: value }; }); }, [completed]);
  const statusData = ['Pending', 'Quoted', 'Accepted', 'Completed', 'Rejected'].map((name, i) => ({ name, value: rfqs.filter(r => r.status === name).length }));
  const pieColors = ['#e9b44c', '#559b78', '#2f6f52', '#8eb9a2', '#d98778'];
  const cards = seller ? [
    { label: 'Total revenue', value: money(revenue), sub: 'From completed deals', icon: Wallet, tone: 'green', delta: '+12.8%' },
    { label: 'Active RFQs', value: rfqs.filter(r => ['Pending','Quoted'].includes(r.status)).length, sub: 'Awaiting next step', icon: ClipboardList, tone: 'blue', delta: `${pending} open` },
    { label: 'Waste diverted', value: `${diverted.toFixed(1)} ton`, sub: 'Verified transactions', icon: Recycle, tone: 'amber', delta: '+8.4%' },
    { label: 'Completed deals', value: completed.length, sub: 'Successful transactions', icon: CheckCircle2, tone: 'purple', delta: 'This period' }
  ] : [
    { label: 'Purchase value', value: money(revenue), sub: 'Completed purchases', icon: Wallet, tone: 'green', delta: '+9.2%' },
    { label: 'Open RFQs', value: rfqs.filter(r => ['Pending','Quoted'].includes(r.status)).length, sub: 'In your inbox', icon: ClipboardList, tone: 'blue', delta: 'Needs review' },
    { label: 'Materials received', value: `${diverted.toFixed(1)} ton`, sub: 'Across transactions', icon: Package, tone: 'amber', delta: '+6.1%' },
    { label: 'Completed deals', value: completed.length, sub: 'Successful purchases', icon: CheckCircle2, tone: 'purple', delta: 'This period' }
  ];
  return <><div className="page-heading"><div><span className="eyebrow">{seller ? 'SELLER OVERVIEW' : 'BUYER OVERVIEW'}</span><h1>Good morning, {user.name.split(' ')[0]} <span className="wave">✦</span></h1><p className="muted">Here's what's happening with your circular supply chain today.</p></div><div className="heading-actions"><span className="date-chip"><Clock3 size={15}/> {new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>{seller && <button className="btn primary" onClick={() => onNavigate('New RFQ')}><Plus size={17}/> Create RFQ</button>}</div></div>
    <div className="impact-banner"><div className="impact-icon"><Leaf size={28}/></div><div><small>YOUR CIRCULAR IMPACT</small><b>{diverted.toFixed(1)} tonnes <span>of material kept in circulation</span></b></div><div className="impact-right"><span>Estimated CO₂ avoided</span><b>{(diverted * 1.8).toFixed(1)} t <Leaf size={15}/></b></div></div>
    <div className="stats-grid">{cards.map((c,i) => <div className="stat-card" key={c.label}><div className={`stat-icon ${c.tone}`}><c.icon size={20}/></div><div className="stat-content"><span>{c.label}</span><b>{c.value}</b><small>{c.sub}</small></div><span className="stat-delta"><ArrowUpRight size={14}/>{c.delta}</span></div>)}</div>
    <div className="charts-grid"><div className="panel chart-panel"><div className="panel-head"><div><h3>{seller ? 'Revenue overview' : 'Purchase spend overview'}</h3><p>Financial performance over time</p></div><select defaultValue="7 months"><option>7 months</option><option>30 days</option><option>12 months</option></select></div><div className="chart-legend"><span><i className="legend-dot green-dot"/>{seller ? 'Revenue' : 'Purchase value'}</span><b>{money(revenue)}</b><small>Recorded total</small></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{top:10,right:8,left:0,bottom:0}}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b8060" stopOpacity={0.22}/><stop offset="100%" stopColor="#3b8060" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid stroke="#edf1ed" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'#8a9690',fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:'#8a9690',fontSize:11}} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} width={36}/><Tooltip formatter={v => money(v)} contentStyle={{border:'1px solid #e6ece7',borderRadius:12,fontSize:12}}/><Area type="monotone" dataKey="revenue" stroke="#2f6f52" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{r:5}}/></AreaChart></ResponsiveContainer></div></div>
    <div className="panel status-panel"><div className="panel-head"><div><h3>RFQ status</h3><p>Your request pipeline</p></div><button className="text-btn" onClick={() => onNavigate(seller ? 'My RFQs' : 'RFQ Inbox')}>View all <ArrowRight size={14}/></button></div><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData.filter(x => x.value > 0)} dataKey="value" nameKey="name" innerRadius={61} outerRadius={83} paddingAngle={4} stroke="none">{statusData.filter(x => x.value > 0).map((entry) => <Cell key={entry.name} fill={pieColors[['Pending','Quoted','Accepted','Completed','Rejected'].indexOf(entry.name)]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donut-center"><b>{rfqs.length}</b><small>Total RFQs</small></div></div><div className="status-legend">{statusData.map((s,i) => <div key={s.name}><span><i style={{background:pieColors[i]}}/>{s.name}</span><b>{s.value}</b></div>)}</div></div></div>
    <div className="bottom-grid">
      <div className="panel table-panel"><div className="panel-head"><div><h3>{seller ? 'Recent RFQs' : 'Latest opportunities'}</h3><p>{seller ? 'Keep an eye on your latest requests' : 'New materials waiting for your quote'}</p></div><button className="text-btn" onClick={() => onNavigate(seller ? 'My RFQs' : 'RFQ Inbox')}>See all <ArrowRight size={14}/></button></div><RFQTable rows={rfqs.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,5)} seller={seller} onOpen={r => setModal({ type: 'detail', rfq: r })} onAction={null}/></div>
      {seller && <div className="panel table-panel"><div className="panel-head"><div><h3>Buyers & Expected Prices</h3><p>Verified buyers and their typical price ranges</p></div></div><div className="table-scroll"><table><thead><tr><th>BUYER</th><th>TYPE</th><th>LOCATION</th><th>ACCEPTS</th><th>TYPICAL PRICE</th><th>MIN/MAX</th><th>ACTION</th></tr></thead><tbody>{db.buyers.filter(b => b.verified).slice(0, 6).map(b => <tr key={b.id}><td><b>{b.company}</b><small>{b.type}</small></td><td>{b.type}</td><td>{b.location}</td><td><span className="tag-list">{b.accepts.slice(0, 3).map(a => <i key={a}>{a}</i>)}</span></td><td><b style={{color: '#d4a843', fontSize: '12px'}}>{b.price}</b></td><td><small>Min {b.min.toLocaleString()}kg / Max {b.max.toLocaleString()}kg</small></td><td><button className="btn primary small-btn" onClick={() => onNavigate('New RFQ')}>Send RFQ</button></td></tr>)}</tbody></table></div></div>}
      <div className="panel quick-panel"><div className="panel-head"><div><h3>Quick actions</h3><p>Make your next move</p></div></div><div className="quick-actions">{seller ? <><button onClick={() => onNavigate('New RFQ')}><span className="quick-icon q-green"><Plus/></span><span><b>Create a new RFQ</b><small>Find a buyer for your byproduct</small></span><ArrowRight/></button><button onClick={() => onNavigate('Buyers Directory')}><span className="quick-icon q-blue"><Users/></span><span><b>Explore buyers</b><small>Browse verified recycling partners</small></span><ArrowRight/></button></> : <><button onClick={() => onNavigate('RFQ Inbox')}><span className="quick-icon q-green"><ClipboardList/></span><span><b>Review RFQ inbox</b><small>Respond to material requests</small></span><ArrowRight/></button><button onClick={() => onNavigate('Transactions')}><span className="quick-icon q-blue"><Truck/></span><span><b>Track deliveries</b><small>Follow active transactions</small></span><ArrowRight/></button></>}</div><div className="tip-card"><Leaf size={19}/><div><b>Small actions, big impact</b><p>Every successful exchange keeps useful material out of landfill.</p></div></div></div></div>
  </>;
}

function Status({ value }) { const cls = value?.toLowerCase().replaceAll(' ','-') || 'pending'; return <span className={`status ${cls}`}><i/>{value || 'Pending'}</span>; }

function RFQTable({ rows, seller, onOpen, onAction }) {
  return <div className="table-scroll"><table><thead><tr>
    <th>RFQ / MATERIAL</th>
    <th>{seller ? 'BUYER' : 'SELLER'}</th>
    <th>QUANTITY</th>
    <th>QUOTE / EST. VALUE</th>
    <th>STATUS</th>
    <th>DATE</th>
    <th>ACTIONS</th>
  </tr></thead><tbody>
    {rows.length ? rows.map(r => {
      const estimatedValue = r.quote ? money(r.quote * (r.quantity / (r.unit === 'kg' ? 1000 : 1))) : '—';
      const quoteDisplay = r.quote ? `${money(r.quote)}/ton` : 'Awaiting quote';
      return (
        <tr key={r.id} onClick={() => onOpen(r)} className="click-row">
          <td><b>{r.material}</b><small>{r.id} · {r.category}</small></td>
          <td>{seller ? r.buyerCompany : r.sellerCompany}</td>
          <td>{r.quantity} {r.unit}</td>
          <td><small>{quoteDisplay}</small><br/><b>{estimatedValue}</b></td>
          <td><Status value={r.status}/></td>
          <td>{new Date(r.createdAt+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</td>
          <td>
            {onAction && onAction(r)}
            {onOpen && <ArrowRight size={15}/>}
          </td>
        </tr>
      );
    }) : <tr><td colSpan="7" className="empty-cell">No RFQs yet. Your next opportunity is one click away.</td></tr>}
  </tbody></table></div>;
}

function RFQList({ user, db, onNew, onOpen }) { const [query,setQuery]=useState(''); const [status,setStatus]=useState('All statuses'); const rows=db.rfqs.filter(r=>r.sellerId===user.id && (status==='All statuses'||r.status===status) && `${r.id} ${r.material} ${r.buyerCompany}`.toLowerCase().includes(query.toLowerCase())); return <><div className="page-heading"><div><span className="eyebrow">SELLER WORKSPACE</span><h1>My RFQs</h1><p className="muted">Manage every request from sent to settled.</p></div><button className="btn primary" onClick={onNew}><Plus size={17}/> Create RFQ</button></div><div className="panel list-panel"><div className="list-toolbar"><div className="search-field"><Search size={16}/><input placeholder="Search material, buyer or RFQ ID" value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option>{['Pending','Quoted','Accepted','Rejected','Completed'].map(s=><option key={s}>{s}</option>)}</select><span className="result-count">{rows.length} requests</span></div><RFQTable rows={rows} seller onOpen={onOpen}/></div></>; }
function BuyerInbox({ user, db, onOpen, setModal, update, notify }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const allRows = db.rfqs.filter(r => r.buyerId === user.id || r.buyerCompany === user.company);
  const rows = allRows.filter(r => statusFilter === 'All' || r.status === statusFilter);

  const handleAcceptAndPay = (rfq) => {
    setModal({ type: 'payment', rfq });
  };

  const pendingCount = allRows.filter(r => r.status === 'Pending').length;
  const quotedCount = allRows.filter(r => r.status === 'Quoted').length;
  const completedCount = allRows.filter(r => r.status === 'Accepted' || r.status === 'Paid' || r.status === 'Completed').length;

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">BUYER WORKSPACE</span>
          <h1>RFQ Inbox</h1>
          <p className="muted">Private requests sent directly to your business.</p>
        </div>
        <span className="date-chip"><ShieldCheck size={15}/> Private buyer access</span>
      </div>

      <div className="inbox-intro">
        <div className="inbox-symbol"><ClipboardList/></div>
        <div>
          <b>{pendingCount + quotedCount} requests need your attention</b>
          <p>Review material details, send quotations, or accept quoted RFQs to proceed with payment.</p>
        </div>
      </div>

      <div className="list-toolbar" style={{ marginBottom: '16px' }}>
        <div className="search-field">
          <Search size={16}/>
          <input placeholder="Search RFQs, materials, sellers..." onChange={e => setStatusFilter(e.target.value)} style={{ display: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Pending', 'Quoted', 'Accepted', 'Paid', 'Completed', 'Rejected'].map(s => (
            <button
              key={s}
              className={`text-btn ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: statusFilter === s ? '#eaf4ec' : 'transparent',
                color: statusFilter === s ? '#2f6f52' : '#5e7165',
                fontWeight: 600,
                fontSize: '9px',
                border: '1px solid ' + (statusFilter === s ? '#2f6f52' : 'transparent')
              }}
            >
              {s} {s !== 'All' && allRows.filter(r => r.status === s).length > 0 && (
                <span style={{ background: statusFilter === s ? '#2f6f52' : '#eaf4ec', color: statusFilter === s ? 'white' : '#2f6f52', borderRadius: '10px', padding: '0 6px', fontSize: '8px', marginLeft: '4px' }}>
                  {allRows.filter(r => r.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="panel list-panel">
        {rows.length === 0 ? (
          <div className="inbox-intro" style={{ textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="inbox-symbol" style={{ background: '#f0f3f0', color: '#9aa59e' }}><ClipboardList size={28} /></div>
            <b>No RFQs found</b>
            <p style={{ color: '#9aa59e' }}>
              {statusFilter === 'All'
                ? 'You haven\'t received any RFQs yet. Check back soon for new material requests.'
                : `No RFQs with status "${statusFilter}". Try a different filter.`}
            </p>
          </div>
        ) : (
          <RFQTable rows={rows} seller={false} onOpen={onOpen} onAction={(rfq) => {
            if (rfq.status === 'Quoted' && rfq.quote) {
              return <button className="btn primary small-btn" onClick={(e) => { e.stopPropagation(); handleAcceptAndPay(rfq); }}>Accept & Pay</button>;
            }
            if (rfq.status === 'Pending') {
              return <button className="btn secondary small-btn" onClick={(e) => { e.stopPropagation(); onOpen(rfq); }}>View Details</button>;
            }
            return null;
          }} />
        )}
      </div>
    </>
  );
}
function NewRFQ({ user, db, update, notify, onNavigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ category: 'Plastic', material: '', quantity: '', unit: 'kg', packaging: 'Baled', description: '', buyerId: '', notes: '', expiry: '7' });
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const eligible = db.buyers.filter(b => b.accepts.includes(form.category));
  const selectedBuyer = db.buyers.find(b => b.id === form.buyerId);

  const create = () => {
    if (!selectedBuyer) return notify('Please select a buyer.');
    const r = { id: uid('RFQ'), sellerId: user.id, sellerCompany: user.company, category: form.category, material: form.material, quantity: Number(form.quantity), unit: form.unit, packaging: form.packaging, description: form.description, buyerId: selectedBuyer.id, buyerCompany: selectedBuyer.company, status: 'Pending', createdAt: today(), notes: form.notes, expiresIn: Number(form.expiry) };

    const interestedBuyers = db.buyers.filter(b =>
      b.id !== selectedBuyer.id &&
      b.accepts.includes(form.category)
    );

    update(d => {
      d.rfqs.unshift(r);

      d.notifications.unshift(createNotification(d, user.id, 'rfq', `Your RFQ ${r.id} for ${r.material} has been created and sent to ${selectedBuyer.company}`, r.id));

      d.notifications.unshift(createNotification(d, selectedBuyer.email, 'rfq', `New RFQ ${r.id} from ${user.company}: ${r.material} (${r.quantity} ${r.unit})`, r.id));

      interestedBuyers.forEach(buyer => {
        d.notifications.unshift(createNotification(d, buyer.email, 'rfq', `New RFQ available: ${r.material} from ${user.company} (${r.quantity} ${r.unit})`, r.id));
      });

      return d;
    });

    notify(`RFQ ${r.id} sent to ${selectedBuyer.company}. ${interestedBuyers.length} other interested buyers notified.`);
    onNavigate('My RFQs');
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">SELLER WORKSPACE</span>
          <h1>Create New RFQ</h1>
          <p className="muted">Request quotations from verified buyers for your material.</p>
        </div>
      </div>

      <div className="panel">
        <div className="stepper" style={{ marginBottom: '24px' }}>
          <div className={step >= 1 ? 'current' : ''}><i>{step > 1 ? <Check size={14} /> : 1}</i><span>Waste details</span></div>
          <b />
          <div className={step >= 2 ? 'current' : ''}><i>2</i><span>Select buyer</span></div>
          <b />
          <div className={step >= 3 ? 'current' : ''}><i>3</i><span>Review & send</span></div>
        </div>

        {step === 1 && (
          <div className="wizard-body" style={{ gridTemplateColumns: '1fr', minHeight: 'auto' }}>
            <div className="wizard-form">
              <h3>Tell us about your material</h3>
              <p className="muted">Clear specifications help buyers quote accurately.</p>
              <div className="form-grid">
                <label>Waste category *<select name="category" value={form.category} onChange={change}>{['Food Waste', 'Metal Scraps', 'Plastic', 'Paper/Cardboard', 'Textile', 'Chemical Byproducts'].map(x => <option key={x}>{x}</option>)}</select></label>
                <label>Material name *<input name="material" value={form.material} onChange={change} placeholder="e.g. PET flakes, aluminium..." /></label>
                <label>Quantity *<div className="input-pair"><input name="quantity" type="number" min="0.01" value={form.quantity} onChange={change} placeholder="e.g. 500" /><select name="unit" value={form.unit} onChange={change}><option>kg</option><option>ton</option></select></div></label>
                <label>Packaging<select name="packaging" value={form.packaging} onChange={change}><option>Baled</option><option>Loose</option><option>Big bags</option><option>Drums</option><option>Bins</option><option>Other</option></select></label>
                <label className="full-span">Material description<textarea name="description" rows="3" value={form.description} onChange={change} placeholder="Condition, grade, contamination, moisture, pickup details..." /></label>
              </div>
            </div>
            <div className="upload-placeholder">
              <div className="upload-icon"><Package /></div>
              <b>Material documentation</b>
              <p>In a production build, attach photos, quality reports and safety documents here.</p>
              <span className="upload-note">File upload UI placeholder · Backend storage not connected</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-body buyer-step" style={{ gridTemplateColumns: '1fr', minHeight: 'auto' }}>
            <div>
              <h3>Choose a verified buyer</h3>
              <p className="muted">Showing buyers who accept {form.category.toLowerCase()}.</p>
            </div>
            {eligible.length ? eligible.map(b => (
              <button className={`buyer-choice ${form.buyerId === b.id ? 'chosen' : ''}`} key={b.id} onClick={() => setForm({ ...form, buyerId: b.id })}>
                <span className="company-avatar">{initials(b.company)}</span>
                <span className="buyer-choice-info">
                  <b>{b.company} <ShieldCheck size={13} /></b>
                  <small>{b.type} · {b.location}</small>
                  <small style={{color: '#d4a843', fontWeight: 600}}>{b.price}</small>
                </span>
                <span className="radio-mark">{form.buyerId === b.id && <Check size={13} />}</span>
              </button>
            )) : (
              <div className="empty-state">No registered buyers currently accept this category.</div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="review-body" style={{ gridColumn: '1/-1' }}>
            <h3>Review your request</h3>
            <div className="review-grid">
              <div><small>MATERIAL</small><b>{form.material}</b><span>{form.category} · {form.packaging}</span></div>
              <div><small>QUANTITY</small><b>{form.quantity} {form.unit}</b><span>Requested amount</span></div>
              <div><small>BUYER</small><b>{selectedBuyer?.company}</b><span>{selectedBuyer?.location}</span></div>
              <div><small>RESPONSE WINDOW</small><b>{form.expiry} days</b><span>Requested quote deadline</span></div>
            </div>
            <label>Additional note to buyer<textarea name="notes" value={form.notes} onChange={change} rows="3" placeholder="Any pickup preferences or commercial terms..." /></label>
            <div className="review-notice"><ShieldCheck size={17} /> This RFQ will only be visible to the selected buyer.</div>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn secondary" onClick={() => step === 1 ? go('My RFQs') : setStep(step - 1)}>{step === 1 ? 'Cancel' : 'Back'}</button>
          {step < 3 ? (
            <button className="btn primary" disabled={step === 1 && (!form.material.trim() || !form.quantity || Number(form.quantity) <= 0)} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></button>
          ) : (
            <button className="btn primary" onClick={create}><Send size={16} /> Send RFQ</button>
          )}
        </div>
      </div>
    </>
  );
}

function BuyerQuotes({ user, db, onOpen }) { const rows=db.rfqs.filter(r=>(r.buyerId===user.id||r.buyerCompany===user.company)&&r.quote); return <><div className="page-heading"><div><span className="eyebrow">BUYER WORKSPACE</span><h1>My quotations</h1><p className="muted">Review the quotes you've submitted and their outcomes.</p></div></div><div className="panel list-panel"><RFQTable rows={rows} seller={false} onOpen={onOpen}/></div></>; }
function BuyersDirectory({ db, onSend }) { const [q,setQ]=useState(''); const [cat,setCat]=useState('All categories'); const buyers=db.buyers.filter(b=>(cat==='All categories'||b.accepts.includes(cat))&&`${b.company} ${b.type} ${b.location} ${b.accepts.join(' ')}`.toLowerCase().includes(q.toLowerCase())); return <><div className="page-heading"><div><span className="eyebrow">VERIFIED NETWORK</span><h1>Buyers directory</h1><p className="muted">Find the right recovery partner for your material.</p></div><div className="verified-pill"><ShieldCheck size={16}/> {db.buyers.length} verified buyers</div></div><div className="directory-tools"><div className="search-field"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search company, material or location..."/></div><select value={cat} onChange={e=>setCat(e.target.value)}><option>All categories</option>{['Food Waste','Metal Scraps','Plastic','Paper/Cardboard','Textile','Chemical Byproducts'].map(c=><option key={c}>{c}</option>)}</select><span>{buyers.length} results</span></div><div className="buyer-grid">{buyers.map(b=><div className="buyer-card" key={b.id}><div className="buyer-card-top"><div className="company-avatar">{initials(b.company)}</div><span className={`verified-tag ${b.verified?'':'unverified-tag'}`}><ShieldCheck size={13}/>{b.verified?'Verified':'New buyer'}</span></div><h3>{b.company}</h3><p className="muted">{b.type} · {b.location}</p><div className="buyer-meta"><span>ACCEPTED MATERIALS</span><div className="tag-list">{b.accepts.map(a=><i key={a}>{a}</i>)}</div></div><div className="buyer-bottom"><div><small>Typical price range</small><b>{b.price}</b></div><button className="btn primary small-btn" onClick={()=>onSend(b)}>Send RFQ <ArrowRight size={14}/></button></div><div className="buyer-rating">★ {b.rating} <span>· Min. {b.min.toLocaleString()} kg / Max. {b.max.toLocaleString()} kg</span></div></div>)}</div></>; }
function Transactions({ user, db, update, notify }) { const [filter,setFilter]=useState('All'); const rows=db.transactions.filter(t=>user.role==='seller'?(t.sellerId===user.id||t.sellerCompany===user.company):(t.buyerId===user.id||t.buyerCompany===user.company)).filter(t=>filter==='All'||t.status===filter); const complete=rows.filter(t=>t.status==='Completed').reduce((s,t)=>s+t.value,0); const totalPaid=rows.filter(t=>t.status==='Completed').reduce((s,t)=>s+(t.totalPaid||t.value),0); const totalFees=rows.filter(t=>t.status==='Completed').reduce((s,t)=>s+(t.platformFee||0),0); return <><div className="page-heading"><div><span className="eyebrow">ORDER MANAGEMENT</span><h1>Transactions</h1><p className="muted">Follow accepted deals through pickup and completion.</p></div></div><div className="transaction-summary"><div><small>Total transaction value</small><b>{money(complete)}</b></div><div><small>All transactions</small><b>{rows.length}</b></div><div><small>Completed</small><b>{rows.filter(t=>t.status==='Completed').length}</b></div>{user.role==='buyer' && <div><small>Total paid</small><b>{money(totalPaid)}</b></div>}{user.role==='seller' && <div><small>Platform fees paid</small><b>{money(totalFees)}</b></div>}</div><div className="panel list-panel"><div className="list-toolbar"><b>Transaction history</b><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>In progress</option><option>Completed</option></select></div><div className="table-scroll"><table><thead><tr><th>TRANSACTION</th><th>MATERIAL</th><th>PARTNER</th><th>QUANTITY</th><th>VALUE</th><th>PAYMENT METHOD</th><th>PLATFORM FEE</th><th>TOTAL PAID</th><th>STATUS</th><th/></tr></thead><tbody>{rows.length?rows.map(t=><tr key={t.id}><td><b>{t.id}</b><small>{t.rfqId} · {t.date}</small></td><td>{t.material}</td><td>{user.role==='seller'?t.buyerCompany:t.sellerCompany}</td><td>{t.quantity} ton</td><td><b>{money(t.value)}</b></td><td>{t.paymentMethod ? t.paymentMethod.toUpperCase() : '-'}</td><td>{t.platformFee ? money(t.platformFee) : '-'}</td><td>{t.totalPaid ? money(t.totalPaid) : money(t.value)}</td><td><Status value={t.status}/></td><td>{t.status!=='Completed'&&<button className="text-btn" onClick={()=>{update(d=>{const x=d.transactions.find(z=>z.id===t.id);x.status='Completed';return d;});notify('Transaction marked as completed.');}}>Complete</button>}</td></tr>):<tr><td colSpan="10" className="empty-cell">No transactions yet. Accepted RFQs will appear here.</td></tr>}</tbody></table></div></div></>; }
function Messages({ user, db }) { const [selected,setSelected]=useState('RFQ-1047'); const [draft,setDraft]=useState(''); const [messages,setMessages]=useState([{id:1,rfq:'RFQ-1047',from:'buyer',text:'Could you share the latest material quality report?',time:'10:24 AM'},{id:2,rfq:'RFQ-1047',from:'seller',text:'Absolutely. I have attached the latest inspection details to the RFQ.',time:'10:31 AM'},{id:3,rfq:'RFQ-1047',from:'buyer',text:'Thanks! We can proceed with the quoted rate, subject to pickup confirmation.',time:'10:42 AM'}]); const send=()=>{if(!draft.trim())return;setMessages(m=>[...m,{id:Date.now(),rfq:selected,from:user.role,text:draft,time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}]);setDraft('');}; return <><div className="page-heading"><div><span className="eyebrow">COMMUNICATION</span><h1>Messages</h1><p className="muted">Keep RFQ conversations in one place.</p></div></div><div className="panel chat-layout"><div className="chat-list"><div className="chat-list-head">Conversations <span>2</span></div>{['RFQ-1047','RFQ-1046'].map((id,i)=><button className={selected===id?'selected':''} onClick={()=>setSelected(id)} key={id}><div className="avatar">{i?'ML':'EP'}</div><span><b>{i?'MetalLoop Foundry':'EcoPolymer Works'}</b><small>{i?'RFQ-1046 · Aluminium Scrap':'RFQ-1047 · PET Plastic'}</small></span><i/></button>)}</div><div className="chat-main"><div className="chat-head"><div className="avatar">{selected==='RFQ-1047'?'EP':'ML'}</div><div><b>{selected==='RFQ-1047'?'EcoPolymer Works':'MetalLoop Foundry'}</b><small>{selected} · RFQ conversation</small></div><span className="online-label">● Active</span></div><div className="chat-messages">{messages.filter(m=>m.rfq===selected).map(m=><div className={`message ${m.from===user.role?'mine':''}`} key={m.id}><p>{m.text}</p><small>{m.time}</small></div>)}</div><div className="chat-compose"><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Write a message..."/><button className="btn primary" onClick={send}><Send size={16}/></button></div></div></div></>; }
function CompanyProfile({ user, db, update, notify }) { const [form,setForm]=useState({name:user.name,company:user.company,location:user.location||'',gstin:user.gstin||'',email:user.email}); const save=e=>{e.preventDefault();update(d=>{const u=d.users.find(x=>x.id===user.id);Object.assign(u,form);return d;});Object.assign(user,form);notify('Company profile updated.');}; return <><div className="page-heading"><div><span className="eyebrow">BUSINESS SETTINGS</span><h1>Company profile</h1><p className="muted">Manage the details other businesses see about you.</p></div><span className="verified-pill"><ShieldCheck size={16}/> Business account</span></div><div className="panel profile-panel"><div className="profile-cover"><div className="profile-company-avatar">{initials(user.company)}</div><div><h2>{user.company}</h2><span>{user.role==='seller'?'Material supplier':'Material buyer'} · {user.location}</span></div></div><form className="profile-form" onSubmit={save}><div className="form-grid"><label>Contact person<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Company name<input value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></label><label>Work email<input value={form.email} disabled/></label><label>Business location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label><label>GSTIN <span className="optional">Optional</span><input value={form.gstin} onChange={e=>setForm({...form,gstin:e.target.value})} placeholder="Enter GSTIN"/></label><label>Account type<input value={user.role==='seller'?'Waste seller':'Material buyer'} disabled/></label></div><button className="btn primary" type="submit">Save changes <Check size={16}/></button></form></div></>; }
function SettingsPage({ user, onLogout }) { return <><div className="page-heading"><div><span className="eyebrow">PREFERENCES</span><h1>Settings</h1><p className="muted">Your workspace and account preferences.</p></div></div><div className="settings-grid"><div className="panel setting-card"><div className="setting-icon"><Bell/></div><div><h3>Notifications</h3><p>Get updates when RFQs receive quotes or change status.</p><label className="toggle-line"><span>Email notifications</span><input type="checkbox" defaultChecked/></label><label className="toggle-line"><span>In-app notifications</span><input type="checkbox" defaultChecked/></label></div></div><div className="panel setting-card"><div className="setting-icon"><ShieldCheck/></div><div><h3>Account & security</h3><p>Signed in as <b>{user.email}</b>. Your demo data is stored in this browser.</p><button className="btn secondary" onClick={onLogout}>Sign out <LogOut size={16}/></button></div></div></div><div className="storage-note"><Activity size={17}/> Demo mode: data persists in localStorage on this device. Connect a backend before using real company or transaction data.</div></>; }

// Notifications Page Component
function NotificationsPage({ user, db, update }) {
  const notifications = getUserNotifications(db, user.id);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const handleMarkAllRead = () => {
    update(d => {
      d.notifications.forEach(n => {
        if (n.userId === user.id) n.read = true;
      });
      return d;
    });
  };

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">NOTIFICATIONS</span>
          <h1>All Notifications</h1>
          <p className="muted">Stay updated on your RFQ activity and marketplace updates.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <button className="btn secondary" onClick={handleMarkAllRead}>
            <Check size={16} /> Mark all read
          </button>
        )}
      </div>
      <div className="panel list-panel">
        <div className="list-toolbar" style={{ justifyContent: 'flex-end', marginBottom: '16px' }}>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: '140px' }}>
            <option value="all">All</option>
            <option value="unread">Unread only</option>
          </select>
          <span className="result-count">{filteredNotifications.length} notifications</span>
        </div>
        {filteredNotifications.length === 0 ? (
          <div className="inbox-intro">
            <div className="inbox-symbol"><Bell size={24} /></div>
            <div>
              <b>No notifications yet</b>
              <p>When you create or receive RFQs, or when quotes are submitted, you'll see them here.</p>
            </div>
          </div>
        ) : (
          <div className="notif-list-full">
            {filteredNotifications.map(n => (
              <div key={n.id} className={`notif-item-full ${!n.read ? 'unread' : ''}`} onClick={() => {
                if (!n.read) {
                  update(d => { const notif = d.notifications.find(x => x.id === n.id); if (notif) notif.read = true; return d; });
                }
                if (n.rfqId) setPage(n.rfqId.startsWith('RFQ') ? (user.role === 'seller' ? 'My RFQs' : 'RFQ Inbox') : 'Dashboard');
              }}>
                <div className="notif-icon-full">
                  {n.type === 'rfq' ? <ClipboardList size={18} /> : <Bell size={18} />}
                </div>
                <div className="notif-content-full">
                  <p>{n.text}</p>
                  <small>{new Date(n.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                </div>
                {!n.read && <div className="notif-dot" />}
                <ChevronRight size={16} style={{ color: '#9aa59e', flex: 'none' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// Payment Modal Component - UPI/Razorpay style payment portal
function PaymentModal({ rfq, user, db, update, notify, close }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [netBankingBank, setNetBankingBank] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const totalAmount = rfq.quote * (rfq.quantity / (rfq.unit === 'kg' ? 1000 : 1));
  const platformFee = Math.round(totalAmount * 0.02); // 2% platform fee
  const finalAmount = totalAmount + platformFee;

  // Validation helpers
  const validateUpi = (upi) => /^[\w.-]+@[\w.-]+$/.test(upi);
  const validateCardNumber = (num) => {
    const digits = num.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(digits)) return false;
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };
  const validateExpiry = (exp) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) && new Date('20' + exp.split('/')[1], exp.split('/')[0] - 1) > new Date();
  const validateCvv = (cvv) => /^\d{3,4}$/.test(cvv);

  // Input formatters
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').slice(0, 19);
  };
  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    return digits;
  };

  const handlePayment = async () => {
    // Validate before processing
    if (paymentMethod === 'upi' && !validateUpi(upiId)) {
      setPaymentError('Please enter a valid UPI ID (e.g., name@upi)');
      return;
    }
    if (paymentMethod === 'card') {
      if (!validateCardNumber(cardDetails.number)) {
        setPaymentError('Please enter a valid card number');
        return;
      }
      if (!validateExpiry(cardDetails.expiry)) {
        setPaymentError('Please enter a valid expiry date (MM/YY)');
        return;
      }
      if (!validateCvv(cardDetails.cvv)) {
        setPaymentError('Please enter a valid CVV');
        return;
      }
      if (!cardDetails.name.trim()) {
        setPaymentError('Please enter the name on card');
        return;
      }
    }
    if (paymentMethod === 'netbanking' && !netBankingBank) {
      setPaymentError('Please select a bank');
      return;
    }

    setProcessing(true);
    setPaymentError('');

    // Simulate payment processing with progress
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulate 95% success rate
    if (Math.random() > 0.05) {
      const txnId = uid('TXN');
      setTransactionId(txnId);
      setPaymentSuccess(true);

      // Create transaction
      update(d => {
        // Update RFQ status
        const r = d.rfqs.find(x => x.id === rfq.id);
        if (r) {
          r.status = 'Paid';
          r.paidAt = today();
          r.paymentMethod = paymentMethod;
          r.paymentId = uid('PAY');
        }

        // Create transaction
        d.transactions.unshift({
          id: txnId,
          rfqId: rfq.id,
          sellerId: rfq.sellerId,
          buyerId: rfq.buyerId,
          sellerCompany: rfq.sellerCompany,
          buyerCompany: rfq.buyerCompany,
          material: rfq.material,
          quantity: rfq.quantity / (rfq.unit === 'kg' ? 1000 : 1),
          value: totalAmount,
          platformFee: platformFee,
          totalPaid: finalAmount,
          status: 'Paid',
          date: today(),
          paymentMethod: paymentMethod,
          paymentId: uid('PAY')
        });

        // Notifications
        d.notifications.unshift(createNotification(d, rfq.sellerId, 'payment', `Payment received for ${rfq.material} (RFQ ${rfq.id}): ${money(finalAmount)}`, rfq.id));
        d.notifications.unshift(createNotification(d, rfq.buyerId, 'payment', `Payment sent for ${rfq.material} (RFQ ${rfq.id}): ${money(finalAmount)}`, rfq.id));

        return d;
      });

      notify(`Payment of ${money(finalAmount)} processed successfully! Transaction ${txnId} created.`);

      setTimeout(() => {
        close();
        setPaymentSuccess(false);
      }, 3000);
    } else {
      setPaymentError('Payment failed. Please try again or use a different payment method.');
      setProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <div className="success-icon"><CheckCircle2 size={48} /></div>
        <h3>Payment Successful!</h3>
        <p className="txn-id">Transaction ID: <b>{transactionId}</b></p>
        <p>Amount paid: <b>{money(finalAmount)}</b></p>
        <div className="success-details">
          <div><span>Material</span><span>{rfq.material}</span></div>
          <div><span>Quantity</span><span>{rfq.quantity} {rfq.unit}</span></div>
          <div><span>Rate</span><span>{money(rfq.quote)}/ton</span></div>
          <div><span>Platform Fee</span><span>{money(platformFee)}</span></div>
        </div>
        <small>Closing automatically...</small>
      </div>
    );
  }

  const banks = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra', 'PNB', 'Bank of Baroda', 'Canara Bank'];

  const isUpiValid = upiId && validateUpi(upiId);
  const isCardValid = cardDetails.number && validateCardNumber(cardDetails.number) && validateExpiry(cardDetails.expiry) && validateCvv(cardDetails.cvv) && cardDetails.name.trim();
  const isNetBankingValid = netBankingBank;

  return (
    <div className="payment-modal">
      <div className="payment-header">
        <div>
          <span className="eyebrow">SECURE PAYMENT</span>
          <h2>Pay for {rfq.material}</h2>
          <p className="muted">RFQ {rfq.id} · {rfq.sellerCompany}</p>
        </div>
        <button className="icon-btn" onClick={close} disabled={processing}><X /></button>
      </div>

      <div className="payment-summary">
        <div className="summary-row"><span>Material</span><span>{rfq.material} ({rfq.quantity} {rfq.unit})</span></div>
        <div className="summary-row"><span>Rate</span><span>{money(rfq.quote)}/ton</span></div>
        <div className="summary-row"><span>Subtotal</span><span>{money(totalAmount)}</span></div>
        <div className="summary-row fee"><span>Platform Fee (2%)</span><span>{money(platformFee)}</span></div>
        <div className="summary-row total"><span>Total Payable</span><span>{money(finalAmount)}</span></div>
      </div>

      <div className="payment-methods">
        <h3>Choose Payment Method</h3>
        <div className="method-tabs">
          <button className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>
            <Smartphone size={18} /> UPI
          </button>
          <button className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
            <CreditCard size={18} /> Card
          </button>
          <button className={`method-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
            <Building2 size={18} /> Net Banking
          </button>
        </div>

        {paymentMethod === 'upi' && (
          <div className="method-content">
            <label className="form-label">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={e => setUpiId(e.target.value.toLowerCase())}
              placeholder="yourname@upi"
              className={`form-input ${upiId && !validateUpi(upiId) ? 'error' : ''}`}
              autoComplete="off"
            />
            {upiId && !validateUpi(upiId) && <p className="form-error">Invalid UPI ID format</p>}
            <p className="upi-hint">Enter your UPI ID (e.g., name@paytm, name@gpay, name@phonepe)</p>
            <div className="upi-apps">
              <span className="upi-app">Google Pay</span>
              <span className="upi-app">PhonePe</span>
              <span className="upi-app">Paytm</span>
              <span className="upi-app">BHIM</span>
              <span className="upi-app">Any UPI App</span>
            </div>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="method-content">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              value={cardDetails.number}
              onChange={e => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
              placeholder="1234 5678 9012 3456"
              className={`form-input ${cardDetails.number && !validateCardNumber(cardDetails.number) ? 'error' : ''}`}
              autoComplete="cc-number"
              maxLength={19}
            />
            {cardDetails.number && !validateCardNumber(cardDetails.number) && <p className="form-error">Invalid card number</p>}
            <div className="card-row">
              <div>
                <label className="form-label">Expiry (MM/YY)</label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={e => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                  placeholder="12/28"
                  className={`form-input ${cardDetails.expiry && !validateExpiry(cardDetails.expiry) ? 'error' : ''}`}
                  autoComplete="cc-exp"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={e => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                  placeholder="123"
                  className={`form-input ${cardDetails.cvv && !validateCvv(cardDetails.cvv) ? 'error' : ''}`}
                  autoComplete="cc-csc"
                  maxLength={4}
                />
              </div>
            </div>
            <label className="form-label">Name on Card</label>
            <input
              type="text"
              value={cardDetails.name}
              onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
              placeholder="John Doe"
              className="form-input"
              autoComplete="cc-name"
            />
            <p className="card-hint">We accept Visa, Mastercard, RuPay, American Express</p>
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div className="method-content">
            <label className="form-label">Select Your Bank</label>
            <select value={netBankingBank} onChange={e => setNetBankingBank(e.target.value)} className="form-input">
              <option value="">Choose a bank</option>
              {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
            </select>
            <p className="nb-hint">You will be redirected to your bank's secure payment page</p>
          </div>
        )}
      </div>

      {paymentError && <div className="payment-error">{paymentError}</div>}

      <div className="payment-footer">
        <button className="btn secondary" onClick={close} disabled={processing}>Cancel</button>
        <button
          className="btn primary"
          onClick={handlePayment}
          disabled={processing ||
            (paymentMethod === 'upi' && !isUpiValid) ||
            (paymentMethod === 'card' && !isCardValid) ||
            (paymentMethod === 'netbanking' && !isNetBankingValid)}
        >
          {processing ? <><Loader2 size={16} className="spin" /> Processing...</> : <><IndianRupee size={16} /> Pay {money(finalAmount)}</>}
        </button>
      </div>
    </div>
  );
}

function Modal({ modal, close, user, db, update, notify }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ category: modal.buyer?.accepts?.[0] || 'Plastic', material: '', quantity: '', unit: 'kg', packaging: 'Baled', description: '', buyerId: modal.buyer?.id || '', notes: '', expiry: '7' });
  const [quote, setQuote] = useState({ price: '', note: '' });
  const [actual, setActual] = useState('');
  const rfq = modal.rfq;
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const eligible = db.buyers.filter(b => b.accepts.includes(form.category));
  const selectedBuyer = db.buyers.find(b => b.id === form.buyerId);

  const create = () => {
    if (!selectedBuyer) return notify('Please select a buyer.');
    const r = { id: uid('RFQ'), sellerId: user.id, sellerCompany: user.company, category: form.category, material: form.material, quantity: Number(form.quantity), unit: form.unit, packaging: form.packaging, description: form.description, buyerId: selectedBuyer.id, buyerCompany: selectedBuyer.company, status: 'Pending', createdAt: today(), notes: form.notes, expiresIn: Number(form.expiry) };

    // Find buyers interested in this category (similar waste interest)
    const interestedBuyers = db.buyers.filter(b =>
      b.id !== selectedBuyer.id &&
      b.accepts.includes(form.category)
    );

    update(d => {
      d.rfqs.unshift(r);

      // Notification for the seller
      d.notifications.unshift(createNotification(d, user.id, 'rfq', `Your RFQ ${r.id} for ${r.material} has been created and sent to ${selectedBuyer.company}`, r.id));

      // Notification for the selected buyer
      d.notifications.unshift(createNotification(d, selectedBuyer.email, 'rfq', `New RFQ ${r.id} from ${user.company}: ${r.material} (${r.quantity} ${r.unit})`, r.id));

      // Notifications for other interested buyers
      interestedBuyers.forEach(buyer => {
        d.notifications.unshift(createNotification(d, buyer.email, 'rfq', `New RFQ available: ${r.material} from ${user.company} (${r.quantity} ${r.unit})`, r.id));
      });

      return d;
    });

    notify(`RFQ ${r.id} sent to ${selectedBuyer.company}. ${interestedBuyers.length} other interested buyers notified.`);
    close();
  };

  const submitQuote = () => {
    if (!quote.price || Number(quote.price) <= 0) return notify('Enter a valid quotation price.');
    update(d => {
      const r = d.rfqs.find(x => x.id === rfq.id);
      r.quote = Number(quote.price);
      r.quoteUnit = 'ton';
      r.quoteNote = quote.note;
      r.status = 'Quoted';
      // Notify seller about new quote
      d.notifications.unshift(createNotification(d, r.sellerId, 'rfq', `New quotation received for ${r.material} (RFQ ${r.id}) from ${r.buyerCompany}: ${money(quote.price)}/ton`, r.id));
      return d;
    });
    notify('Quotation submitted to the seller.');
    close();
  };

  const action = (status) => {
    update(d => {
      const r = d.rfqs.find(x => x.id === rfq.id);
      r.status = status;
      if (status === 'Accepted') {
        d.transactions.unshift({ id: uid('TXN'), rfqId: r.id, sellerId: r.sellerId, buyerId: r.buyerId, sellerCompany: r.sellerCompany, buyerCompany: r.buyerCompany, material: r.material, quantity: r.quantity / (r.unit === 'kg' ? 1000 : 1), value: Number(r.quote || 0) * (r.quantity / (r.unit === 'kg' ? 1000 : 1)), status: 'In progress', date: today() });
        // Notify buyer that quote was accepted
        d.notifications.unshift(createNotification(d, r.buyerId, 'rfq', `Your quote for ${r.material} (RFQ ${r.id}) was accepted by ${r.sellerCompany}`, r.id));
      } else if (status === 'Rejected') {
        // Notify buyer that quote was rejected
        d.notifications.unshift(createNotification(d, r.buyerId, 'rfq', `Your quote for ${r.material} (RFQ ${r.id}) was declined by ${r.sellerCompany}`, r.id));
      }
      return d;
    });
    notify(`RFQ ${status.toLowerCase()}.`);
    close();
  };

  return (
    <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && close()}>
      <div className={`modal ${modal.type === 'rfq' ? 'wide-modal' : ''}`}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">{modal.type === 'rfq' ? 'NEW OPPORTUNITY' : 'REQUEST DETAILS'}</span>
            <h2>{modal.type === 'rfq' ? 'Create a new RFQ' : rfq.id}</h2>
          </div>
          <button className="icon-btn" onClick={close}><X /></button>
        </div>
        {modal.type === 'rfq' ? (
          <>
            <div className="stepper">
              <div className={step >= 1 ? 'current' : ''}><i>{step > 1 ? <Check size={14} /> : 1}</i><span>Waste details</span></div>
              <b />
              <div className={step >= 2 ? 'current' : ''}><i>2</i><span>Select buyer</span></div>
              <b />
              <div className={step >= 3 ? 'current' : ''}><i>3</i><span>Review & send</span></div>
            </div>
            {step === 1 && (
              <div className="wizard-body">
                <div className="wizard-form">
                  <h3>Tell us about your material</h3>
                  <p className="muted">Clear specifications help buyers quote accurately.</p>
                  <div className="form-grid">
                    <label>Waste category *<select name="category" value={form.category} onChange={change}>{['Food Waste', 'Metal Scraps', 'Plastic', 'Paper/Cardboard', 'Textile', 'Chemical Byproducts'].map(x => <option key={x}>{x}</option>)}</select></label>
                    <label>Material name *<input name="material" value={form.material} onChange={change} placeholder="e.g. PET flakes, aluminium..." /></label>
                    <label>Quantity *<div className="input-pair"><input name="quantity" type="number" min="0.01" value={form.quantity} onChange={change} placeholder="e.g. 500" /><select name="unit" value={form.unit} onChange={change}><option>kg</option><option>ton</option></select></div></label>
                    <label>Packaging<select name="packaging" value={form.packaging} onChange={change}><option>Baled</option><option>Loose</option><option>Big bags</option><option>Drums</option><option>Bins</option><option>Other</option></select></label>
                    <label className="full-span">Material description<textarea name="description" rows="3" value={form.description} onChange={change} placeholder="Condition, grade, contamination, moisture, pickup details..." /></label>
                  </div>
                </div>
                <div className="upload-placeholder">
                  <div className="upload-icon"><Package /></div>
                  <b>Material documentation</b>
                  <p>In a production build, attach photos, quality reports and safety documents here.</p>
                  <span className="upload-note">File upload UI placeholder · Backend storage not connected</span>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="wizard-body buyer-step">
                <div>
                  <h3>Choose a verified buyer</h3>
                  <p className="muted">Showing buyers who accept {form.category.toLowerCase()}.</p>
                </div>
                {eligible.length ? eligible.map(b => (
                  <button className={`buyer-choice ${form.buyerId === b.id ? 'chosen' : ''}`} key={b.id} onClick={() => setForm({ ...form, buyerId: b.id })}>
                    <span className="company-avatar">{initials(b.company)}</span>
                    <span className="buyer-choice-info">
                      <b>{b.company} <ShieldCheck size={13} /></b>
                      <small>{b.type} · {b.location}</small>
                      <small>{b.price}</small>
                    </span>
                    <span className="radio-mark">{form.buyerId === b.id && <Check size={13} />}</span>
                  </button>
                )) : (
                  <div className="empty-state">No registered buyers currently accept this category.</div>
                )}
              </div>
            )}
            {step === 3 && (
              <div className="review-body">
                <h3>Review your request</h3>
                <div className="review-grid">
                  <div><small>MATERIAL</small><b>{form.material}</b><span>{form.category} · {form.packaging}</span></div>
                  <div><small>QUANTITY</small><b>{form.quantity} {form.unit}</b><span>Requested amount</span></div>
                  <div><small>BUYER</small><b>{selectedBuyer?.company}</b><span>{selectedBuyer?.location}</span></div>
                  <div><small>RESPONSE WINDOW</small><b>{form.expiry} days</b><span>Requested quote deadline</span></div>
                </div>
                <label>Additional note to buyer<textarea name="notes" value={form.notes} onChange={change} rows="3" placeholder="Any pickup preferences or commercial terms..." /></label>
                <div className="review-notice"><ShieldCheck size={17} /> This RFQ will only be visible to the selected buyer.</div>
              </div>
            )}
            <div className="modal-footer">
              <button className="btn secondary" onClick={() => step === 1 ? close() : setStep(step - 1)}>{step === 1 ? 'Cancel' : 'Back'}</button>
              {step < 3 ? (
                <button className="btn primary" disabled={step === 1 && (!form.material.trim() || !form.quantity || Number(form.quantity) <= 0)} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></button>
              ) : (
                <button className="btn primary" onClick={create}><Send size={16} /> Send RFQ</button>
              )}
            </div>
          </>
        ) : modal.type === 'payment' ? (
          <PaymentModal rfq={rfq} user={user} db={db} update={update} notify={notify} close={close} />
        ) : (
          <>
            <div className="detail-top">
              <div>
                <span className="detail-category">{rfq.category}</span>
                <h3>{rfq.material}</h3>
                <p className="muted">Sent by {rfq.sellerCompany} · {rfq.createdAt}</p>
              </div>
              <Status value={rfq.status} />
            </div>
            <div className="detail-grid">
              <div><small>QUANTITY</small><b>{rfq.quantity} {rfq.unit}</b></div>
              <div><small>PACKAGING</small><b>{rfq.packaging}</b></div>
              <div><small>{user.role === 'seller' ? 'BUYER' : 'SELLER'}</small><b>{user.role === 'seller' ? rfq.buyerCompany : rfq.sellerCompany}</b></div>
              <div><small>RFQ ID</small><b>{rfq.id}</b></div>
              <div><small>EXPIRES IN</small><b>{rfq.expiresIn ? `${rfq.expiresIn} days` : 'No expiry set'}</b></div>
              <div><small>CREATED</small><b>{rfq.createdAt}</b></div>
            </div>
            <div className="detail-description">
              <small>MATERIAL DESCRIPTION</small>
              <p>{rfq.description || 'No additional description provided.'}</p>
              <p><b>Seller note:</b> {rfq.notes || 'No additional notes provided.'}</p>
            </div>
            {rfq.quote && (
              <div className="quote-box">
                <div>
                  <small>BUYER QUOTATION</small>
                  <b>{money(rfq.quote)} <span>/{rfq.quoteUnit || 'ton'}</span></b>
                  <p>{rfq.quoteNote || 'No additional terms provided.'}</p>
                </div>
                {user.role === 'seller' && rfq.status === 'Quoted' && (
                  <div className="quote-actions">
                    <button className="btn secondary" onClick={() => action('Rejected')}>Decline</button>
                    <button className="btn primary" onClick={() => action('Accepted')}><Check size={15} /> Accept quote</button>
                  </div>
                )}
              </div>
            )}
            {user.role === 'buyer' && rfq.status === 'Pending' && (
              <div className="quote-form">
                <h3>Submit your quotation</h3>
                <label>Offer price per ton (₹)<input type="number" min="1" value={quote.price} onChange={e => setQuote({ ...quote, price: e.target.value })} placeholder="e.g. 21000" /></label>
                <label>Commercial terms<textarea rows="2" value={quote.note} onChange={e => setQuote({ ...quote, note: e.target.value })} placeholder="Pickup terms, quality conditions, validity..." /></label>
                <button className="btn primary" onClick={submitQuote}>Send quotation <Send size={15} /></button>
              </div>
            )}
            {user.role === 'seller' && rfq.status === 'Pending' && (
              <div className="review-notice"><Clock3 size={17} /> Waiting for the buyer to review this request and submit a quote.</div>
            )}
            {rfq.status === 'Accepted' && (
              <div className="review-notice success-notice"><CheckCircle2 size={17} /> Quote accepted. A transaction has been created in your Transactions workspace.</div>
            )}
            <div className="modal-footer">
              <button className="btn secondary" onClick={close}>Close</button>
            </div>
          </>
        )
      }
      </div>
    </div>
  );
}

export default App;
