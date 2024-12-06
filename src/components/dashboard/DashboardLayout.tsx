import { Outlet } from 'react-router-dom';
import { MainNav } from '../navigation/MainNav';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}