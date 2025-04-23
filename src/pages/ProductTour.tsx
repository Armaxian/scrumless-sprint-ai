
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ProductTour = () => {
  const [activeChapter, setActiveChapter] = useState(1);
  const [sandboxInput, setSandboxInput] = useState('');

  const handleSandboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the input
    setSandboxInput('');
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Chapter 1: Integrate Tools */}
      <section className="relative">
        <div className="h-[50vh] bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-glow text-teal-500">1️⃣ Integrate Tools</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-foreground/80">
              Connect Scrumless.ai to your existing workflow in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">One-click integration</h3>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Connect with your team's existing tools without disrupting workflows. 
                No migration, no learning curve, just immediate productivity gains.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">Slack</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">MS Teams</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">Jira</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">Linear</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">GitHub</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">GitLab</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-2">
                  <span className="font-mono text-sm">Google Calendar</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-6 rounded-2xl">
            <div className="glass-card aspect-video flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="bg-background rounded-lg p-4 mb-4 border border-border">
                  <div className="flex items-center mb-4">
                    <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                    <h4 className="text-sm font-medium">Integration Setup</h4>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded border border-teal-500 bg-teal-500/20 flex items-center justify-center mr-2">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L3.5 6.5L1 4" stroke="#00EDC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-foreground/80">Connect GitHub repository</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded border border-teal-500 bg-teal-500/20 flex items-center justify-center mr-2">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L3.5 6.5L1 4" stroke="#00EDC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-foreground/80">Link Slack workspace</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded border border-teal-500 bg-teal-500/20 flex items-center justify-center mr-2">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L3.5 6.5L1 4" stroke="#00EDC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-foreground/80">Import Jira project</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded border border-border mr-2"></div>
                      <span className="text-sm text-foreground/80">Schedule calendar sync</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button className="bg-teal-500 hover:bg-teal-400 text-black neon-glow">
                    Complete Integration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 2: Talk to the Bot */}
      <section className="relative mt-16">
        <div className="h-[50vh] bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-glow text-teal-500">2️⃣ Talk to the bot</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-foreground/80">
              Natural language interface for your entire development process.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center">Interactive Sandbox</h3>
          
          <div className="bg-muted rounded-2xl p-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-6">
                <p className="text-lg font-medium mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted/70 px-3 py-1 rounded-full text-sm">What's blocking the backend team?</span>
                  <span className="bg-muted/70 px-3 py-1 rounded-full text-sm">Summarize yesterday's progress</span>
                  <span className="bg-muted/70 px-3 py-1 rounded-full text-sm">Split this user story</span>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 mb-4 bg-background">
                <div className="flex space-x-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">You</p>
                    <p className="text-foreground/80">What's blocking the backend team?</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Scrumless Bot</p>
                    <p className="text-foreground/80">Currently 3 blockers for backend team:</p>
                    <ul className="list-disc list-inside text-sm pl-2 mt-2 space-y-1 text-foreground/70">
                      <li><span className="font-medium">API rate limits</span> - Auth service hitting limits</li>
                      <li><span className="font-medium">Database migration</span> - Waiting on DevOps approval</li>
                      <li><span className="font-medium">Missing docs</span> - External API integration unclear</li>
                    </ul>
                    <p className="text-sm mt-2 text-foreground/80">I've automatically notified the DevOps team about the approval blocker.</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSandboxSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={sandboxInput}
                  onChange={(e) => setSandboxInput(e.target.value)}
                  placeholder="Ask Scrumless.ai anything..."
                  className="flex-1 bg-muted rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <Button type="submit" className="bg-teal-500 hover:bg-teal-400 text-black">
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 3: Watch Reports */}
      <section className="relative mt-16">
        <div className="h-[50vh] bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-glow text-teal-500">3️⃣ Watch Reports</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-foreground/80">
              Actionable insights without the endless meetings.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-muted p-6 rounded-2xl">
            <div className="glass-card aspect-video flex items-center justify-center">
              <div className="w-full p-4">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-medium">Sprint Progress</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-teal-500">On Track</span>
                    <span className="inline-block h-2 w-2 rounded-full bg-teal-500"></span>
                  </div>
                </div>
                
                <div className="h-40 mb-6 relative">
                  {/* Simple burndown chart visualization */}
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute bottom-0 left-0 w-full h-[20%] border-t border-border"></div>
                    <div className="absolute bottom-[25%] left-0 w-full h-[20%] border-t border-border"></div>
                    <div className="absolute bottom-[50%] left-0 w-full h-[20%] border-t border-border"></div>
                    <div className="absolute bottom-[75%] left-0 w-full h-[20%] border-t border-border"></div>
                    <div className="absolute bottom-0 left-0 w-[20%] h-full border-r border-border"></div>
                    <div className="absolute bottom-0 left-[40%] w-[20%] h-full border-r border-border"></div>
                    <div className="absolute bottom-0 left-[60%] w-[20%] h-full border-r border-border"></div>
                    <div className="absolute bottom-0 left-[80%] w-[20%] h-full border-r border-border"></div>
                  </div>
                  
                  {/* Ideal line */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="2,2" />
                    </svg>
                  </div>
                  
                  {/* Actual line */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,10 C20,15 40,30 60,45 S80,60 100,85" fill="none" stroke="#00EDC0" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Day 1</span>
                  <span>Day 5</span>
                  <span>Day 10</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-6">Actionable Insights</h3>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Daily and sprint-level reporting that highlights exactly what needs your attention
                - no more reading between the lines or digging through updates.
              </p>
              
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-teal-500/30 bg-teal-500/5">
                  <h4 className="font-medium mb-1">Blocker Heat Map</h4>
                  <p className="text-sm text-muted-foreground">
                    Visual display of where problems are clustering in your project.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-teal-500/30 bg-teal-500/5">
                  <h4 className="font-medium mb-1">Velocity Forecasting</h4>
                  <p className="text-sm text-muted-foreground">
                    ML-powered delivery date predictions based on your team's actual performance.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-teal-500/30 bg-teal-500/5">
                  <h4 className="font-medium mb-1">Team Load Balancing</h4>
                  <p className="text-sm text-muted-foreground">
                    Spot over-allocated team members before they become bottlenecks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to fire your Scrum Master?</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Start automating your agile workflow today.
          </p>
          <Button className="bg-teal-500 hover:bg-teal-400 text-black text-lg px-8 py-6 h-auto font-medium neon-glow">
            Start sprinting in 60 seconds
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTour;
