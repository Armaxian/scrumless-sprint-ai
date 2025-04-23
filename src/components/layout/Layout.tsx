import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from '../widgets/ChatWidget';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  simple?: boolean;
  dashboard?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, simple = false, dashboard = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {dashboard ? (
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      ) : (
        <main className="flex-grow">
          {children}
        </main>
      )}
      
      {!simple && !dashboard && <ChatWidget />}
      {!dashboard && <Footer />}
    </div>
  );
};

export default Layout;
