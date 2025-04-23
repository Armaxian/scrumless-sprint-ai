
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Features = () => {
  const [viewMode, setViewMode] = useState<'developer' | 'executive'>('developer');
  
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Features</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Tools built to make your engineering team more productive.
          </p>
          
          {/* Toggle switch */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Label 
              htmlFor="view-mode" 
              className={viewMode === 'developer' ? 'text-foreground' : 'text-muted-foreground'}
            >
              For Developers
            </Label>
            <Switch 
              id="view-mode" 
              checked={viewMode === 'executive'} 
              onCheckedChange={() => setViewMode(viewMode === 'developer' ? 'executive' : 'developer')}
              className="bg-muted data-[state=checked]:bg-teal-500"
            />
            <Label 
              htmlFor="view-mode" 
              className={viewMode === 'executive' ? 'text-foreground' : 'text-muted-foreground'}
            >
              For Executives
            </Label>
          </div>
        </div>

        {/* Feature sections */}
        <div className="space-y-24">
          {/* agent_standup */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <code className="code-header bg-muted px-4 py-2 rounded-lg inline-block mb-2">agent_standup()</code>
                <h2 className="text-3xl font-bold mb-4">AI Stand-Up Conductor</h2>
              </div>
              
              {viewMode === 'developer' ? (
                <div className="space-y-4">
                  <p>Automated status polling directly from your commit messages, Jira tickets, and PRs - no more time-wasting stand-ups.</p>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    <li>Smart blocker detection and automatic escalation</li>
                    <li>Asynchronous updates - respond on your own schedule</li>
                    <li>Integration with Git, Jira, Linear, GitHub, and more</li>
                    <li>Code-level progress tracking without manual updates</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Daily progress reports without disrupting your team's workflow. Get the insights without the meetings.</p>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    <li>Morning email summaries of team progress</li>
                    <li>Automated risk detection and early warning system</li>
                    <li>Track velocity without developer context-switching</li>
                    <li>Reclaim 10+ hours per week of engineering time</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="order-1 lg:order-2 bg-muted p-6 rounded-2xl">
              <div className="glass-card aspect-video flex items-center justify-center text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16.5 12"></polyline></svg>
              </div>
            </div>
          </motion.section>

          {/* agent_plan */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="bg-muted p-6 rounded-2xl">
              <div className="glass-card aspect-video flex items-center justify-center text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <code className="code-header bg-muted px-4 py-2 rounded-lg inline-block mb-2">agent_plan()</code>
                <h2 className="text-3xl font-bold mb-4">Sprint-Planner & Story-Splitter</h2>
              </div>
              
              {viewMode === 'developer' ? (
                <div className="space-y-4">
                  <p>Intelligent story breakdown and complexity estimation based on your codebase context and historical team velocity.</p>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    <li>AI-powered Fibonacci estimation aligned with your team's history</li>
                    <li>Automatic subtask generation with dependency graphs</li>
                    <li>Edge case detection before sprint planning</li>
                    <li>Contextual code references for faster implementation</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Clear sprint planning with realistic timelines based on your team's actual velocity and capacity.</p>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    <li>Resource-aware timeline forecasting</li>
                    <li>Automatic critical path analysis</li>
                    <li>Milestone tracking and early warning signals</li>
                    <li>Project timeline simulation based on multiple scenarios</li>
                  </ul>
                </div>
              )}
            </div>
          </motion.section>

          {/* agent_retro */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <code className="code-header bg-muted px-4 py-2 rounded-lg inline-block mb-2">agent_retro()</code>
                <h2 className="text-3xl font-bold mb-4">Retro Synthesiser & Action-Tracker</h2>
              </div>
              
              {viewMode === 'developer' ? (
                <div className="space-y-4">
                  <p>Data-driven retrospectives that focus on actionable improvements, not vague feelings.</p>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    <li>Sentiment analysis of commit messages, PRs and comments</li>
                    <li>Automatic identification of process bottlenecks</li>
                    <li>Concrete action items with assigned ownership</li>
                    <li>Progress tracking on improvement metrics</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Process optimization based on real data, not anecdotes. See what's actually slowing your team down.</p>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    <li>Team health metrics and leading indicators</li>
                    <li>Process efficiency scoring and improvement tracking</li>
                    <li>Cross-team performance benchmarking</li>
                    <li>ROI calculation on process improvements</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="order-1 lg:order-2 bg-muted p-6 rounded-2xl">
              <div className="glass-card aspect-video flex items-center justify-center text-teal-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Features;
