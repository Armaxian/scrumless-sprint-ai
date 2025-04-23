
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Ask me why Scrum Masters won't be missed.", isBot: true }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    setMessages([...messages, { id: Date.now(), text: userInput, isBot: false }]);
    setUserInput('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Scrum Masters spend 90% of their time asking what you did yesterday and what you're doing today. We just check your Git commits.",
        "Because our AI can run a standup in 3 minutes instead of derailing into a 30-minute discussion about weekend plans.",
        "We identify blockers automatically without needing to hear about them in a daily meeting.",
        "No more awkward silence when the Scrum Master asks 'Any blockers?' and everyone stares at their shoes.",
        "Because code doesn't lie, but developers to Scrum Masters absolutely do."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(currentMessages => [...currentMessages, { 
        id: Date.now(), 
        text: randomResponse, 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-teal-500 hover:bg-teal-400 text-black shadow-lg neon-glow z-10"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>
        )}
      </Button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-card border border-border rounded-2xl shadow-lg overflow-hidden flex flex-col z-10"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
                <h3 className="font-medium">Scrumless AI Assistant</h3>
              </div>
              <button 
                onClick={toggleChat}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.isBot
                      ? 'self-start bg-secondary rounded-tr-2xl rounded-bl-2xl rounded-br-2xl max-w-[85%]'
                      : 'self-end bg-teal-500 text-black rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl max-w-[85%]'
                  } p-3 animate-fade-in`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex rounded-full bg-muted">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-2 px-4"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-teal-500 text-black focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
