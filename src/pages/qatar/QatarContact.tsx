import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import GlassCard from '@/components/GlassCard';
import AnimatedBackground from '@/components/AnimatedBackground';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QatarContact = () => {
  const { toast } = useToast();
  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Contact' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info@comply.now', href: 'mailto:info@comply.now' },
    { icon: Phone, label: 'Phone', value: '+20 2 3535 XXXX', href: 'tel:+20235350000' },
    { icon: MapPin, label: 'Address', value: 'Smart Village, Cairo, Egypt', href: '#' },
    { icon: Clock, label: 'Hours', value: 'Sun-Thu: 8AM-5PM (EET)', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <AnimatedSection className="pt-20 pb-16">
          <div className="section-container">
            <Breadcrumb items={breadcrumbItems} />
            <div className="text-center mt-8">
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-6">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Let's Start a <span className="gradient-text">Conversation</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Have questions about our compliance solutions? Our Egypt office is here to help 
                you transform your regulatory processes.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Form & Info */}
        <AnimatedSection variant="light" className="py-20">
          <div className="section-container">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="card-light p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="icon-container-light w-12 h-12 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
                      <p className="text-muted-foreground text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ahmed Hassan" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ahmed@company.eg" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Institution</Label>
                        <Input 
                          id="company" 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="National Bank of Egypt" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+20 XXX XXX XXXX" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry about ISO 27001 certification" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your compliance needs..."
                        rows={5}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full btn-gradient text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-light p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <a 
                        key={index} 
                        href={item.href}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="icon-container-light w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-foreground">{item.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="card-light p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Request a Demo</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    See comply.now in action. Schedule a personalized demo with our Egypt team.
                  </p>
                  <Button variant="outline" className="w-full">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Map Placeholder */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <GlassCard className="p-0 overflow-hidden">
              <div className="h-64 md:h-80 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-lg font-medium">Smart Village</p>
                  <p className="text-muted-foreground">Cairo, Egypt</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default QatarContact;
