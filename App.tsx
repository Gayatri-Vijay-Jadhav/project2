
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Search, 
  BarChart3,
  FileCode,
  HelpCircle,
  Menu,
  Cpu
} from 'lucide-react';
import { User, UserRole, Course } from './types';
import { MOCK_COURSES, MOCK_USER } from './constants';
import Dashboard from './components/Dashboard';
import CourseCatalog from './components/CourseCatalog';
import AdminPortal from './components/AdminPortal';
import DocsView from './components/DocsView';
import VivaSection from './components/VivaSection';
import Login from './components/Login';
import VideoPlayer from './components/VideoPlayer';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'admin' | 'docs' | 'viva' | 'player'>('dashboard');
  const [user, setUser] = useState<User>(MOCK_USER);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    // In a real app, fetch user from DB based on email
    setUser({ ...MOCK_USER, email });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('player');
  };

  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === UserRole.STUDENT ? UserRole.ADMIN : UserRole.STUDENT
    }));
    setActiveTab(user.role === UserRole.STUDENT ? 'admin' : 'dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const NavItem = ({ icon: Icon, label, id, active }: { icon: any, label: string, id: any, active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 sticky top-0 h-screen z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <Cpu size={24} />
          </div>
          <h1 className={`font-bold text-xl tracking-tight ${!isSidebarOpen && 'hidden'}`}>EduAI</h1>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {user.role === UserRole.STUDENT ? (
            <>
              <NavItem icon={LayoutDashboard} label="Dashboard" id="dashboard" active={activeTab === 'dashboard'} />
              <NavItem icon={BookOpen} label="Courses" id="courses" active={activeTab === 'courses'} />
            </>
          ) : (
            <NavItem icon={BarChart3} label="Admin Portal" id="admin" active={activeTab === 'admin'} />
          )}
          <div className="h-px bg-slate-100 my-4" />
          <NavItem icon={FileCode} label="Project Docs" id="docs" active={activeTab === 'docs'} />
          <NavItem icon={HelpCircle} label="Viva Prep" id="viva" active={activeTab === 'viva'} />
        </nav>

        <div className="p-3 mt-auto space-y-2">
          <button 
            onClick={toggleRole}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
          >
            <Settings size={20} />
            <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>Mode: {user.role}</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
            <Menu size={20} />
          </button>
          
          <div className="flex-1 max-w-xl mx-8 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search for courses..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'courses' && activeTab !== 'dashboard' && activeTab !== 'player') {
                  setActiveTab('courses');
                }
              }}
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-semibold">{user.name}</span>
              <span className="text-xs text-slate-500">{user.role}</span>
            </div>
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`} 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              alt="Avatar" 
            />
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && <Dashboard user={user} onStartCourse={handleStartCourse} />}
          {activeTab === 'courses' && <CourseCatalog searchQuery={searchQuery} onStartCourse={handleStartCourse} />}
          {activeTab === 'admin' && <AdminPortal />}
          {activeTab === 'docs' && <DocsView />}
          {activeTab === 'viva' && <VivaSection />}
          {activeTab === 'player' && selectedCourse && <VideoPlayer course={selectedCourse} />}
        </div>
      </main>
    </div>
  );
};

export default App;
