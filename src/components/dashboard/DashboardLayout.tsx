import { Outlet, useLocation } from 'react-router-dom';
import { MainNav } from '../navigation/MainNav';

export function DashboardLayout() {
  const location = useLocation();
  const isAIChat = location.pathname === '/ai-chat';

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className={`${isAIChat ? '' : 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'} mt-16`}>
        <Outlet />
      </main>
    </div>
  );
}