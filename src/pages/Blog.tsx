
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why Daily Stand-ups are Just 1990s Voicemail",
      description: "The practice of gathering engineers at 9:30 AM to state intentions isn't agile; it's archaic message taking wrapped in a ritual.",
      category: "Opinion",
      date: "April 15, 2025",
      readTime: "5 min read",
      image: "https://via.placeholder.com/600x400/333333/00EDC0?text=Stand-ups"
    },
    {
      id: 2,
      title: "Sprintless: Life After Post-it Notes",
      description: "How modern teams are moving beyond physical and virtual kanban boards to fully automated workflow orchestration.",
      category: "Case Study",
      date: "April 10, 2025",
      readTime: "8 min read",
      image: "https://via.placeholder.com/600x400/333333/00EDC0?text=Post-its"
    },
    {
      id: 3,
      title: "The Real Cost of Your Scrum Master",
      description: "It's not just the salary. How meeting overhead and interrupted flow state are costing your organization millions.",
      category: "Analysis",
      date: "April 3, 2025",
      readTime: "6 min read",
      image: "https://via.placeholder.com/600x400/333333/00EDC0?text=Cost+Analysis"
    },
    {
      id: 4,
      title: "AI Doesn't Get Bored in Meetings",
      description: "How machine learning models excel at the mundane tasks that drain human enthusiasm and creativity.",
      category: "Technology",
      date: "March 27, 2025",
      readTime: "4 min read", 
      image: "https://via.placeholder.com/600x400/333333/00EDC0?text=AI+Meetings"
    },
    {
      id: 5,
      title: "From Burnout to Breakthroughs",
      description: "How one team eliminated 83% of their meetings and launched three products in the time they used to ship one.",
      category: "Success Story",
      date: "March 22, 2025",
      readTime: "7 min read",
      image: "https://via.placeholder.com/600x400/333333/00EDC0?text=Burnout"
    },
    {
      id: 6,
      title: "Will AI Replace Product Managers Next?",
      description: "After automating Scrum Masters away, is product management the next role at risk from machine learning?",
      category: "Thought Leadership",
      date: "March 15, 2025",
      readTime: "9 min read",
      image: "https://via.placeholder.com/600x400/333333/00EDC0?text=Product+Managers"
    }
  ];
  
  const resources = [
    {
      title: "AI-First Project Playbook",
      description: "The complete guide to restructuring your development process around machine learning.",
      cta: "Download PDF"
    },
    {
      title: "ROI Calculator Spreadsheet",
      description: "Calculate your team's potential time and cost savings with Scrumless.ai.",
      cta: "Get Template"
    },
    {
      title: "Process Automation Guide",
      description: "Step-by-step instructions for moving your team beyond manual agile processes.",
      cta: "View Guide"
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Opinionated essays on the future of software development.
          </p>
        </div>

        {/* Blog posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden border border-border hover:border-teal-500/50 transition-all duration-300"
            >
              <a href="#" className="block">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 backdrop-blur-sm text-xs text-teal-500 font-medium px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm text-teal-500">
                    <span>Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* Lead magnets */}
        <div className="bg-muted p-8 rounded-2xl mb-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Free Resources</h2>
            <p className="text-muted-foreground">
              Tools, templates and guides to help modernize your development process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full border-teal-500/40 hover:border-teal-500/80 hover:bg-teal-500/5">
                    {resource.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold mb-4">Get The Latest Updates</h2>
              <p className="text-muted-foreground mb-6">
                Join our newsletter for hot takes on Agile, AI, and automation.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <Button className="bg-teal-500 hover:bg-teal-400 text-black">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                We'll never share your email. Unsubscribe any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
