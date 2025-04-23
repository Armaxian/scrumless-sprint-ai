
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [currentTypeText, setCurrentTypeText] = useState('Stand-ups');
  const [showCursor, setShowCursor] = useState(true);
  const textOptions = ['Stand-ups', 'Sprint Planning', 'Retros'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // ROI Calculator state
  const [teamSize, setTeamSize] = useState(5);
  const [moneySaved, setMoneySaved] = useState('$40,000');
  const [hoursSaved, setHoursSaved] = useState('520');

  // Refs for animations
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const roiRef = useRef<HTMLDivElement>(null);
  const roiInView = useInView(roiRef, { once: true, margin: "-100px" });

  const socialProofRef = useRef<HTMLDivElement>(null);
  const socialProofInView = useInView(socialProofRef, { once: true, margin: "-100px" });

  // Handle text typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentTextIndex + 1) % textOptions.length;
      setCurrentTypeText('');
      setTimeout(() => {
        setCurrentTextIndex(nextIndex);
        setCurrentTypeText(textOptions[nextIndex]);
      }, 500);
    }, 3000);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [currentTextIndex]);

  // Calculate ROI based on team size
  useEffect(() => {
    setMoneySaved(`$${(teamSize * 8000).toLocaleString()}`);
    setHoursSaved(`${teamSize * 104}`);
  }, [teamSize]);

  // Feature cards data
  const features = [
    {
      title: "AI Stand-Up Conductor",
      description: "Automated status polling directly from commits and tickets. No more time-wasting meetings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16.5 12"></polyline>
        </svg>
      )
    },
    {
      title: "Sprint-Planner & Story-Splitter",
      description: "Intelligent story breakdown and complexity estimation based on codebase context.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      )
    },
    {
      title: "Retro Synthesiser & Action-Tracker",
      description: "Data-driven retrospectives that focus on actionable improvements, not vague feelings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  // Company logos for social proof
  const companies = [
    { name: "TechCorp", quote: "We haven't cancelled a stand-up in months — because there aren't any." },
    { name: "DevStream", quote: "Saved 9 hours per week across our team of 12 developers." },
    { name: "CodeNexus", quote: "Our velocity increased 37% with fewer meetings and more coding time." },
    { name: "ByteWorks", quote: "Blockers get resolved faster without waiting for the next stand-up." },
    { name: "RocketApps", quote: "Engineers love it. Managers love the insights. Win-win." },
    { name: "QuantumSoft", quote: "It's like having a Scrum Master who never tells bad jokes." },
  ];

  // Pricing tiers for preview
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      features: ["Daily stand-up automation", "Basic sprint planning", "Up to 5 users"]
    },
    {
      name: "Pro",
      price: "$49",
      features: ["Everything in Free", "Advanced sprint planning", "Unlimited users", "Retro automation"]
    },
    {
      name: "Enterprise",
      price: "$199",
      features: ["Everything in Pro", "Cross-team coordination", "Enterprise SSO", "Custom integrations"]
    }
  ];

  return (
    <div className="pt-16 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Automate Agile.
                <br />
                <span className="gradient-text">Delete Bottlenecks.</span>
              </h1>

              <div className="mb-8 h-12">
                <div className="inline-flex items-center">
                  <span className="text-xl md:text-2xl mr-3">Say goodbye to</span>
                  <div className="typing-container relative">
                    <span className="text-xl md:text-2xl text-teal-500 font-mono font-bold typing-text">{currentTypeText}</span>
                    <span className={`typing-cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-teal-500 hover:bg-teal-400 text-black text-lg px-8 py-6 h-auto font-medium neon-glow">
                  See It Run
                </Button>
                <Link to="/login">
                  <Button variant="outline" className="text-lg px-8 py-6 h-auto border-teal-500/40 hover:border-teal-500 hover:bg-teal-500/5">
                    Try Free
                  </Button>
                </Link>
              </div>

              <p className="text-muted-foreground">
                Start sprinting in 60 seconds. No credit card required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Robot mascot placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-teal-500/10 flex items-center justify-center relative">
                    <div className="animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                        <circle cx="12" cy="5" r="2"></circle>
                        <path d="M12 7v4"></path>
                        <line x1="8" y1="16" x2="8" y2="16"></line>
                        <line x1="16" y1="16" x2="16" y2="16"></line>
                      </svg>
                    </div>

                    {/* Paper shredder below robot */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-muted rounded-t-lg overflow-hidden">
                      <div className="h-4 bg-teal-500/20 w-full"></div>
                      <div className="flex justify-center space-x-1 mt-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-1 h-14 bg-muted-foreground/20"></div>
                        ))}
                      </div>
                    </div>

                    {/* Falling confetti sticky notes */}
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-8 h-8 bg-yellow-200 animate-confetti"
                        style={{ 
                          top: `${-20 - (i * 10)}px`, 
                          left: `${30 + (i * 15)}px`, 
                          animationDelay: `${i * 0.5}s`,
                          transform: `rotate(${i * 15}deg)`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background glow */}
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Product Demo Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See Scrumless.ai In Action</h2>
            <p className="text-lg text-muted-foreground">
              Watch how our AI bot conducts stand-ups, splits user stories, and assigns tasks.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <Button className="bg-teal-500 hover:bg-teal-400 text-black rounded-full w-16 h-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground">
              Tools built to make your engineering team more productive.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <Card className="h-full bg-card border-border hover:border-teal-500/30 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="text-teal-500 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground flex-grow">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section ref={roiRef} className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">ROI Calculator</h2>
            <p className="text-lg text-muted-foreground">
              See how much time and money you can save by automating your agile process.
            </p>
          </div>

          <motion.div 
            className="max-w-3xl mx-auto bg-card rounded-2xl overflow-hidden border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={roiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="mb-8">
                <label htmlFor="team-size" className="block text-lg font-medium mb-2">
                  Team size
                </label>
                <input
                  type="range"
                  id="team-size"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted appearance-none rounded-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>1 developer</span>
                  <span>{teamSize} developers</span>
                  <span>50 developers</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-muted rounded-xl p-6 text-center">
                  <h4 className="text-lg font-medium mb-1">Money saved per year</h4>
                  <p className="text-3xl font-bold text-teal-500">{moneySaved}</p>
                  <p className="text-sm text-muted-foreground mt-2">Based on average meeting costs</p>
                </div>
                <div className="bg-muted rounded-xl p-6 text-center">
                  <h4 className="text-lg font-medium mb-1">Hours reclaimed per year</h4>
                  <p className="text-3xl font-bold text-teal-500">{hoursSaved}</p>
                  <p className="text-sm text-muted-foreground mt-2">More time for actual development</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section ref={socialProofRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted By Dev Teams</h2>
            <p className="text-lg text-muted-foreground">
              Companies that have embraced scrumless development.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16"
            initial="hidden"
            animate={socialProofInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                }}
                className="flex items-center justify-center"
              >
                <div className="h-12 flex items-center justify-center bg-muted/50 rounded-lg px-4 w-full">
                  <span className="font-mono font-bold">{company.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={socialProofInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {companies.map((company, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <div className="bg-muted/30 p-6 rounded-xl">
                  <p className="text-muted-foreground">"{company.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="font-mono text-sm">{company.name.substring(0, 1)}</span>
                    </div>
                    <span className="font-medium">{company.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live Dashboard GIF */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Real-time Insights</h2>
            <p className="text-lg text-muted-foreground">
              Watch your team's blockers melt away in real time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl overflow-hidden border border-border p-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                {/* Dashboard visualization placeholder */}
                <div className="h-full w-full bg-background flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-500 text-sm font-medium">
                        Live Demo
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Blocker Heat Map</h3>
                    <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
                      {[...Array(25)].map((_, i) => {
                        // Color logic: more green as index increases (red → amber → green)
                        const color = i < 8 ? 'bg-red-500/70' 
                                   : i < 16 ? 'bg-amber-500/70' 
                                   : 'bg-emerald-500/70';
                        return (
                          <div 
                            key={i} 
                            className={`aspect-square rounded-sm ${color} transition-all duration-500`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Simple, transparent pricing for teams of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="border-border hover:border-teal-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground ml-1">/mo</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full bg-teal-500 hover:bg-teal-400 text-black neon-glow"
                  >
                    Start sprinting in 60 sec
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Badges */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-xl font-medium mb-6">Works With Your Stack</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">Slack</span>
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">MS Teams</span>
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">Jira</span>
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">Linear</span>
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">GitHub</span>
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">GitLab</span>
            <span className="font-mono text-sm bg-muted/30 px-4 py-2 rounded-full">Google Calendar</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
