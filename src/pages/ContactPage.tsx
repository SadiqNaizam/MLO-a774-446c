import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Github, Linkedin, Mail, Send } from 'lucide-react';

// Form schema definition
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Simple AppHeader component for navigation
const AppHeader: React.FC = () => {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-xl font-bold text-primary">
          MyPortfolio
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/portfolio">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Portfolio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

// Simple AppFooter component
const AppFooter: React.FC = () => {
  return (
    <footer className="bg-muted py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p className="text-sm mt-1">Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  );
};


const ContactPage: React.FC = () => {
  console.log('ContactPage loaded');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    // Simulate API call
    toast.success("Message sent successfully!", {
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset(); // Reset form after submission
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">Get in Touch</h1>
          <p className="text-muted-foreground text-center mb-8 md:mb-12">
            Have a question, a project idea, or just want to say hello? I'd love to hear from you!
          </p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <FormControl>
                          <Input id="name" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="message">Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="message"
                            placeholder="Tell me about your project or inquiry..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information & Social Links */}
            <div className="space-y-8 md:pt-12"> {/* pt-12 to align roughly with form title */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Contact Details</h3>
                <div className="space-y-2 text-muted-foreground">
                  <a href="mailto:your.email@example.com" className="flex items-center hover:text-primary transition-colors">
                    <Mail className="mr-3 h-5 w-5" />
                    your.email@example.com
                  </a>
                  {/* Add phone number if desired */}
                  {/* <p className="flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    +1 (555) 123-4567
                  </p> */}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub Profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-7 w-7" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn Profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-7 w-7" />
                  </a>
                  {/* Add more social links as needed */}
                </div>
              </div>

              <div>
                 <h3 className="text-xl font-semibold mb-3">Availability</h3>
                 <p className="text-muted-foreground text-sm">
                   I'm currently available for new projects and collaborations.
                 </p>
                 <p className="text-muted-foreground text-sm mt-1">
                   Office hours: Mon - Fri, 9 AM - 5 PM (Your Timezone).
                 </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
};

export default ContactPage;