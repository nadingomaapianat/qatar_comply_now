import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import Breadcrumb from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Handshake, Send, CheckCircle2, Users, Shield, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PARTNER_TYPES = [
  'Technology partner',
  'Reseller / Implementation partner',
  'Audit / Certification body',
  'Consulting / Advisory',
  'Payment or cloud provider',
  'Other',
];

const PartnerJoin = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    partnerType: '',
    message: '',
  });

  const breadcrumbItems = [
    { label: 'Qatar Home', href: '/' },
    { label: 'Partners', href: '/qatar/partners' },
    { label: 'Partner with us' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Application received',
      description: "We'll review your request and contact you within 2–3 business days.",
    });
    setSubmitted(true);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      partnerType: '',
      message: '',
    });
  };

  const benefits = [
    { icon: Users, title: 'Reach more clients', description: 'Get visibility with financial institutions using comply.now.' },
    { icon: Shield, title: 'Compliance-ready', description: 'Align your offerings with QCB and international standards.' },
    { icon: Briefcase, title: 'Joint opportunities', description: 'Collaborate on implementations and compliance projects.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <AnimatedBackground />
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <AnimatedSection className="pt-20 pb-16">
          <div className="section-container">
            <Breadcrumb items={breadcrumbItems} />
            <div className="text-center mt-8">
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-accent mb-6">
                Join our partner network
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Partner</span> with us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Vendors, service providers, and technology partners: apply to join the comply.now
                network and connect with institutions that need compliant third parties.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Benefits */}
        <AnimatedSection variant="light" className="py-16">
          <div className="section-container">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why join as a partner?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((item, i) => (
                <div key={i} className="card-light p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Application form */}
        <AnimatedSection className="py-20">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <div className="card-light p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Apply to join</h2>
                    <p className="text-muted-foreground text-sm">We'll review and get back to you shortly.</p>
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank you for applying</h3>
                    <p className="text-muted-foreground mb-4">
                      Your partner application has been received. Our team will review and contact you within 2–3 business days.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                      Once approved, we’ll create <strong>one partner account</strong> for your organization. You’ll log in to the <strong>same compliance platform</strong> our client companies use (with partner access). There you can complete your profile, answer compliance questionnaires, upload certificates, view your assessment status, and be visible to institutions looking for compliant partners.
                    </p>
                    <p className="text-xs text-muted-foreground mb-6 max-w-md mx-auto">
                      One approved partner = one partner account. Additional users can be added to your account if needed.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link to="/qatar/partners">Back to Partners</Link>
                      </Button>
                      <Button asChild className="rounded-xl">
                        <Link to="/auth/register">Go to Login</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company name *</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Your company or organization"
                          required
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact name *</Label>
                        <Input
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          placeholder="Full name"
                          required
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="contact@company.com"
                          required
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+974 XXX XXXX"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnerType">Type of partnership *</Label>
                      <Select
                        value={formData.partnerType}
                        onValueChange={(v) => setFormData((prev) => ({ ...prev, partnerType: v }))}
                        required
                      >
                        <SelectTrigger id="partnerType" className="rounded-xl">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {PARTNER_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Tell us about your company and why you want to partner *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Services you offer, relevant certifications (e.g. ISO 27001), and how you'd like to work with comply.now..."
                        rows={5}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button type="submit" className="rounded-xl">
                        <Send className="w-4 h-4 mr-2" />
                        Submit application
                      </Button>
                      <Button type="button" asChild variant="outline" className="rounded-xl">
                        <Link to="/qatar/partners">Cancel</Link>
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerJoin;
