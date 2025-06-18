import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { Download, Send, Github, Linkedin, UserCircle } from 'lucide-react';

// Placeholder data
const userProfile = {
  name: "Alex Johnson",
  role: "Full-Stack Developer & UI/UX Enthusiast",
  avatarUrl: "https://source.unsplash.com/random/150x150/?portrait,person", // Placeholder image
  bio: "Hello! I'm Alex, a passionate Full-Stack Developer with a keen eye for UI/UX design. I specialize in creating intuitive, efficient, and visually appealing web applications. My journey in tech started with a fascination for how software can solve real-world problems, and I've been honing my skills ever since. I thrive in collaborative environments and am always eager to learn new technologies and methodologies.",
  philosophy: "I believe that the best software is born from a deep understanding of user needs, coupled with clean, scalable code and thoughtful design. My approach is to blend technical proficiency with creative problem-solving to deliver solutions that are not only functional but also delightful to use.",
  skills: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS", "Tailwind CSS", "Figma", "Next.js", "GraphQL"],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description: "Led development of key features for a flagship SaaS product. Mentored junior developers and contributed to architectural decisions. Improved application performance by 20% through code optimization and database tuning."
    },
    {
      title: "Software Developer",
      company: "Web Innovations Co.",
      period: "2018 - 2021",
      description: "Developed and maintained full-stack web applications for various clients. Worked closely with designers and project managers to deliver high-quality software on schedule."
    }
  ],
  resumeUrl: "/placeholder-resume.pdf" // Placeholder link
};

const AppHeader = () => (
  <header className="bg-background border-b sticky top-0 z-50">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
        <UserCircle className="h-6 w-6 text-primary" />
        <span>{userProfile.name.split(' ')[0]}'s Portfolio</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/portfolio">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Portfolio</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/contact">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </header>
);

const AppFooter = () => (
  <footer className="bg-muted py-8 mt-16 border-t">
    <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
      <div className="flex justify-center space-x-4 mb-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-primary">
          <Github className="h-6 w-6" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-primary">
          <Linkedin className="h-6 w-6" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} {userProfile.name}. All rights reserved.</p>
      <p className="text-xs mt-1">Crafted with React & Tailwind CSS.</p>
    </div>
  </footer>
);

const AboutPage = () => {
  console.log('AboutPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <section id="intro" className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-lg">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{userProfile.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{userProfile.role}</p>
              <div className="flex justify-center md:justify-start space-x-3">
                <Button asChild>
                  <a href={userProfile.resumeUrl} download>
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    <Send className="mr-2 h-4 w-4" /> Contact Me
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about-me" className="mb-12 md:mb-16">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">About Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{userProfile.bio}</p>
              <h3 className="text-lg font-semibold text-foreground pt-2">My Philosophy</h3>
              <p className="leading-relaxed">{userProfile.philosophy}</p>
            </CardContent>
          </Card>
        </section>

        <section id="skills" className="mb-12 md:mb-16">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Skills & Technologies</CardTitle>
              <CardDescription>A selection of technologies and tools I'm proficient with.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="experience" className="mb-12 md:mb-16">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {userProfile.experience.map((job, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2 relative">
                  <div className="absolute -left-[9px] top-3 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                  <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                  <p className="text-md font-medium text-primary">{job.company}</p>
                  <p className="text-sm text-muted-foreground mb-1">{job.period}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <AppFooter />
    </div>
  );
};

export default AboutPage;