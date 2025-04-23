
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const tiers = [
    {
      name: 'Free',
      description: 'For small teams trying out Agile',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        'Daily stand-up automation',
        'Basic sprint planning',
        'Up to 5 users',
        'GitHub integration',
        '7-day data retention'
      ],
      cta: 'Start Free',
      highlight: false
    },
    {
      name: 'Pro',
      description: 'For teams serious about productivity',
      price: {
        monthly: 49,
        yearly: 39,
      },
      features: [
        'Everything in Free, plus:',
        'Advanced sprint planning & story splitting',
        'Unlimited users',
        'All integrations',
        'Retro automation',
        'Custom reporting',
        '30-day data retention'
      ],
      cta: 'Start Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'For organizations at scale',
      price: {
        monthly: 199,
        yearly: 159,
      },
      features: [
        'Everything in Pro, plus:',
        'Cross-team coordination',
        'Enterprise SSO',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited data retention',
        'Advanced security controls'
      ],
      cta: 'Contact Sales',
      highlight: false
    }
  ];
  
  const faqItems = [
    {
      question: "Will the bot fire me?",
      answer: "Only if you're a Scrum Master. Just kidding... mostly. Scrumless.ai is designed to eliminate meeting overhead, not team members. We free up your time for actual development work instead of status updates."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We maintain SOC-2 compliance, encrypt all data in transit and at rest, and never use your code or project details to train our models. You can delete your data at any time."
    },
    {
      question: "Can I still yell 'But Agile!' in meetings?",
      answer: "You can, but you'll need to find meetings first. With Scrumless.ai, there aren't many left to interrupt. Maybe try the lunch line instead?"
    },
    {
      question: "How long does implementation take?",
      answer: "Most teams are up and running in under 60 seconds with our standard integrations. Custom enterprise implementation typically takes 1-2 days."
    },
    {
      question: "What if my team has a unique workflow?",
      answer: "Scrumless.ai adapts to your process, not the other way around. Our bot learns from your team's patterns and customizes accordingly. Enterprise plans include custom workflow configuration."
    },
    {
      question: "Can we still have meetings if we want to?",
      answer: "Technically yes, but we'll judge you silently. In all seriousness, Scrumless.ai gives you back the time - what you do with it is up to you. Many teams keep a weekly sync for team bonding but eliminate daily stand-ups."
    }
  ];
  
  // Calculate fictional Scrum Master salary savings
  const calculateScrimMasterSavings = (price: number) => {
    const avgAussieSalary = 120000; // Average Scrum Master salary in AUD
    const scrumMasterEquivalent = price === 0 ? "0.1" : price === 49 ? "0.5" : "2";
    const annualSavings = price === 0 ? 12000 : price === 49 ? 60000 : 240000;
    
    return {
      equivalent: scrumMasterEquivalent,
      savings: price === 0 ? "~$12,000" : price === 49 ? "~$60,000" : "~$240,000" 
    };
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Simple, Transparent Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Cancel any time before your next retro.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8 space-x-3">
            <Label 
              htmlFor="billing-cycle" 
              className={billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}
            >
              Monthly
            </Label>
            <Switch 
              id="billing-cycle" 
              checked={billingCycle === 'yearly'} 
              onCheckedChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="bg-muted data-[state=checked]:bg-teal-500"
            />
            <div className="flex items-center space-x-1">
              <Label 
                htmlFor="billing-cycle" 
                className={billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}
              >
                Yearly
              </Label>
              <span className="text-xs bg-teal-500/20 text-teal-500 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => {
            const scrumMasterCalc = calculateScrimMasterSavings(tier.price.monthly);
            
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative rounded-2xl ${tier.highlight ? 'border-2 border-teal-500' : 'border border-border'} p-1`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-teal-500 text-black text-xs font-medium px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className={`rounded-xl h-full flex flex-col p-6 ${tier.highlight ? 'bg-teal-500/5' : 'bg-card'}`}>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-start">
                      <span className="text-3xl font-bold">$</span>
                      <span className="text-5xl font-bold">
                        {tier.price[billingCycle]}
                      </span>
                      <span className="text-muted-foreground ml-2 self-end mb-1">/mo</span>
                    </div>
                    <div 
                      className="text-xs text-muted-foreground mt-2 flex items-center cursor-help"
                      title={`Annual savings vs. Scrum Master: ${scrumMasterCalc.savings}`}
                    >
                      Equivalent to {scrumMasterCalc.equivalent} Scrum Masters
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${tier.highlight ? 'bg-teal-500 hover:bg-teal-400 text-black neon-glow' : 'bg-secondary hover:bg-secondary/80'}`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-muted/10">{item.question}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
