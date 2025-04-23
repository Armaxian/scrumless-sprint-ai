
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from '../widgets/ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  simple?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, simple = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!simple && <ChatWidget />}
      <Footer />
    </div>
  );
};

export default Layout;
