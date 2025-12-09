import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Footer from '@/components/Footer';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@voidstudio.com',
    description: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Los Angeles, CA',
    description: 'Design Studio HQ',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: 'Mon - Fri, 9am - 6pm PST',
    description: 'Support available',
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // todo: remove mock functionality - replace with actual form submission
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Form submitted');
    }, 1500);
  };

  return (
    <main className="pt-16">
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase mb-4">
              Get in <span className="text-primary neon-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Have a question about your order, custom design, or just want to say hello? 
              We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="bg-card/50 backdrop-blur-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" data-testid="input-contact-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" data-testid="input-contact-email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger data-testid="select-subject">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Inquiry</SelectItem>
                          <SelectItem value="custom">Custom Design Help</SelectItem>
                          <SelectItem value="returns">Returns & Exchanges</SelectItem>
                          <SelectItem value="collab">Collaboration</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us what's on your mind..."
                        className="min-h-[160px] resize-none"
                        data-testid="input-contact-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full sm:w-auto uppercase tracking-wider gap-2 neon-glow"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={info.title} className="bg-card/30">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-foreground">{info.value}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <div className="p-6 rounded-md bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20">
                <h3 className="font-semibold mb-2">Need immediate help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For urgent design assistance or order issues, our support team is ready to help.
                </p>
                <Button variant="outline" className="w-full" data-testid="button-live-chat">
                  Start Live Chat
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
