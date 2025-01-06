import { Outlet, useNavigate } from 'react-router-dom';
import { MainNav } from '../navigation/MainNav';
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react';

export function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <div className="absolute -inset-3 bg-pink-100 rounded-[24px] blur-xl"></div>
          <Button
            onClick={() => navigate('/ai-chat')}
            className="relative bg-white h-14 w-14 rounded-[24px] flex items-center justify-center"
          >
            <MessageSquare className="h-7 w-7 text-teal-600" />
          </Button>
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
        <Outlet />
      </main>
    </div>
  );
}