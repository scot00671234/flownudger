import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import FlowDashboard from "@/components/FlowDashboard";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Podcast, 
  Rocket, 
  Bolt, 
  Handshake, 
  Bot, 
  TrendingUp, 
  Shield, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Users,
  Gift,
  Mail,
  Menu,
  X
} from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function Home() {
  const { toast } = useToast();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: waitlistData } = useQuery<{ count: number }>({
    queryKey: ["/api/waitlist/count"],
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: EmailForm) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Flow! 🎉",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/waitlist/count"] });
    },
    onError: (error: any) => {
      toast({
        title: "Oops!",
        description: error.message.includes("already registered") 
          ? "You're already on our waitlist! We'll be in touch soon."
          : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const heroForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const ctaForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const handleHeroSubmit = (data: EmailForm) => {
    waitlistMutation.mutate(data);
    heroForm.reset();
  };

  const handleCTASubmit = (data: EmailForm) => {
    waitlistMutation.mutate(data);
    ctaForm.reset();
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const faqs = [
    {
      question: "How does Flow integrate with my existing invoicing software?",
      answer: "Flow connects seamlessly with popular invoicing platforms like QuickBooks, FreshBooks, Xero, and more through secure API integrations. Setup takes less than 2 minutes."
    },
    {
      question: "Will my clients know I'm using Flow?",
      answer: "No, all communications appear to come directly from you. Flow works behind the scenes to maintain your professional brand and client relationships."
    },
    {
      question: "What happens if a client doesn't respond to the automated nudges?",
      answer: "Flow includes smart escalation sequences. After a set number of automated attempts, you'll be notified to handle the situation personally, ensuring nothing falls through the cracks."
    },
    {
      question: "How much does Flow cost?",
      answer: "We're still finalizing our pricing, but it will be affordable for businesses of all sizes. Waitlist members will get early bird pricing with significant discounts."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Podcast className="h-4 w-4 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">Flow</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                FAQ
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => scrollToSection('hero')}
                className="bg-primary text-white hover:bg-secondary hidden sm:inline-flex"
                data-testid="button-join-waitlist-header"
              >
                Join Waitlist
              </Button>
              
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="text-slate-600 hover:text-primary transition-colors text-left"
                >
                  Benefits
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-slate-600 hover:text-primary transition-colors text-left"
                >
                  How it Works
                </button>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-slate-600 hover:text-primary transition-colors text-left"
                >
                  FAQ
                </button>
                <Button 
                  onClick={() => scrollToSection('hero')}
                  className="bg-primary text-white hover:bg-secondary w-full"
                  data-testid="button-join-waitlist-mobile"
                >
                  Join Waitlist
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-primary">
              <Rocket className="w-4 h-4 mr-2" />
              Coming Soon
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Never chase invoices{" "}
            <span className="text-primary">again</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Flow automates your invoice follow-ups with intelligent nudges, helping you get paid faster while maintaining professional relationships with your clients.
          </p>

          <Card className="p-6 shadow-lg border border-slate-200 max-w-lg mx-auto">
            <CardContent className="p-0">
              <Form {...heroForm}>
                <form onSubmit={heroForm.handleSubmit(handleHeroSubmit)} className="flex flex-col sm:flex-row gap-3">
                  <FormField
                    control={heroForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your email address"
                            className="px-4 py-3 border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
                            data-testid="input-email-hero"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="bg-primary text-white px-6 py-3 hover:bg-secondary font-semibold whitespace-nowrap"
                    data-testid="button-submit-hero"
                  >
                    {waitlistMutation.isPending ? (
                      "Joining..."
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              <p className="text-sm text-slate-500 mt-3 flex items-center justify-center">
                <Shield className="w-4 h-4 mr-1" />
                No spam. Unsubscribe anytime. Get early access when we launch.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 flex items-center justify-center text-sm text-slate-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-accent mr-2" />
              <span>
                <strong data-testid="text-waitlist-count">
                  {waitlistData?.count || 0}
                </strong> people waiting
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Why join our waitlist?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Flow transforms how you manage invoices, turning a stressful process into an automated, professional experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-50 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-5">
                  <Bolt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Get Paid 3x Faster</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our intelligent nudging system follows up on overdue invoices automatically, reducing payment time from 45 days to just 15 days on average.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-5">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Maintain Relationships</h3>
                <p className="text-slate-600 leading-relaxed">
                  Professional, personalized communication that preserves client relationships while ensuring timely payments. No more awkward phone calls.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-5">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">100% Automated</h3>
                <p className="text-slate-600 leading-relaxed">
                  Set it once and forget it. Flow handles everything from gentle reminders to escalation sequences based on your preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Improve Cash Flow</h3>
                <p className="text-slate-600 leading-relaxed">
                  Reduce outstanding receivables by up to 60% and improve your cash flow predictability with detailed payment tracking and analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-5">
                  <Bolt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Save 5+ Hours Weekly</h3>
                <p className="text-slate-600 leading-relaxed">
                  Stop manually tracking invoices and writing follow-up emails. Flow gives you back precious time to focus on growing your business.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-5">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Reduce Bad Debt</h3>
                <p className="text-slate-600 leading-relaxed">
                  Early intervention prevents invoices from aging too long. Our data shows 40% reduction in write-offs for businesses using Flow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              How Flow works for you
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple setup, powerful automation. Get started in minutes and see results immediately.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Connect Your Invoicing</h3>
              <p className="text-slate-600 leading-relaxed">
                Integrate with your existing invoicing software (QuickBooks, FreshBooks, Xero) in under 2 minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Set Your Preferences</h3>
              <p className="text-slate-600 leading-relaxed">
                Customize your nudging schedule, tone, and escalation rules. We provide smart defaults that work for 90% of businesses.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Paid Faster</h3>
              <p className="text-slate-600 leading-relaxed">
                Flow automatically sends professional reminders and tracks responses. Watch your payment times improve immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              See Flow in Action
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A glimpse into your future dashboard - automated nudging, real-time tracking, and professional invoice management.
            </p>
          </div>
          
          <div className="w-full">
            <FlowDashboard />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about Flow
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-slate-200">
                <CardContent className="p-0">
                  <button 
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                    data-testid={`button-faq-${index}`}
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    {openFAQ === index ? 
                      <ChevronUp className="w-5 h-5 text-slate-400" /> : 
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    }
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4 text-slate-600" data-testid={`text-faq-answer-${index}`}>
                      {faq.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to transform your invoice management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already on the waitlist. Get early access and exclusive launch pricing.
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <Form {...ctaForm}>
                <form onSubmit={ctaForm.handleSubmit(handleCTASubmit)} className="space-y-4">
                  <FormField
                    control={ctaForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your email address"
                            className="border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary"
                            data-testid="input-email-cta"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="w-full bg-primary text-white hover:bg-secondary font-semibold"
                    data-testid="button-submit-cta"
                  >
                    {waitlistMutation.isPending ? "Getting Early Access..." : "Get Early Access"}
                  </Button>
                </form>
              </Form>
              <p className="text-sm text-slate-500 mt-3 flex items-center justify-center">
                <Gift className="w-4 h-4 mr-1" />
                Waitlist members get 50% off for the first 6 months
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Podcast className="h-4 w-4 text-white" />
                </div>
                <span className="text-2xl font-bold">Flow</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Smart invoice management that helps you get paid faster while maintaining professional client relationships.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button 
                    onClick={() => scrollToSection('benefits')}
                    className="hover:text-white transition-colors"
                  >
                    Benefits
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className="hover:text-white transition-colors"
                  >
                    How it Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a 
                    href="mailto:hello@flow.com" 
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    hello@flow.com
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Flow. All rights reserved. Built with ❤️ for businesses everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
