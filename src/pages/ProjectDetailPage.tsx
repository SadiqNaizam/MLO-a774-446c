import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Components
import InteractiveImageGallery from '@/components/InteractiveImageGallery';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

// Icons
import { Github, ExternalLink, Briefcase, Home, User, Mail } from 'lucide-react';

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  type?: 'image' | 'video';
}

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  date: string;
  longDescription: string;
  images: ProjectImage[];
  technologies: string[];
  challenges: { title: string; content: string }[];
  solutions: { title: string; content: string }[];
  liveLink?: string;
  sourceLink?: string;
}

// Mock project data - in a real app, this would come from an API or CMS
const mockProjects: ProjectData[] = [
  {
    slug: "eco-tracker-app",
    title: "EcoTracker: Sustainability App",
    category: "Mobile App Development",
    date: "March 2024",
    longDescription: "EcoTracker is a comprehensive mobile application designed to empower users to monitor their daily activities, understand their environmental impact, and adopt more sustainable habits. It features intuitive tracking for various metrics, personalized insights based on user data, and engaging community challenges to foster collective action. The primary goal was to make sustainability accessible, understandable, and engaging for a broad audience, encouraging long-term behavioral changes.",
    images: [
      { src: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=1200&h=675&fit=crop", alt: "EcoTracker App Dashboard", caption: "Main dashboard showcasing user's carbon footprint." },
      { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&h=675&fit=crop", alt: "EcoTracker Activity Logging", caption: "Interface for logging daily activities." },
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=675&fit=crop", alt: "EcoTracker Progress Charts", caption: "Charts showing progress and impact over time." },
      { src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&h=675&fit=crop", alt: "Community Feature", caption: "Community challenges and leaderboards." }
    ],
    technologies: ["React Native", "Firebase", "Node.js", "GraphQL", "TypeScript", "Jest", "CI/CD"],
    challenges: [
        { title: "Real-time Data Synchronization", content: "Ensuring seamless real-time synchronization of user data across multiple devices was a significant hurdle, especially considering potential intermittent network connectivity. This required careful state management and conflict resolution strategies." },
        { title: "User Engagement & Habit Formation", content: "Designing a UI/UX that is not only informative but also genuinely motivating for users to consistently track their habits and engage with sustainability goals required multiple iterations, user testing, and incorporation of behavioral psychology principles." },
        { title: "Complex Data Visualization", content: "Presenting complex environmental data in an easily understandable and actionable way for non-expert users was a key challenge. This involved simplifying metrics and using intuitive visual aids."}
    ],
    solutions: [
        { title: "Optimized Firestore & Offline First", content: "Leveraged Firestore's robust real-time capabilities and offline persistence. Data structures were optimized for efficient querying and synchronization, and an 'offline-first' approach was prioritized for core functionalities." },
        { title: "Gamification & Personalized Feedback", content: "Implemented gamification elements such as streaks, badges, points, and personalized feedback loops based on user data. Regular notifications and tailored suggestions helped maintain user engagement." },
        { title: "Interactive & Clear Visuals", content: "Developed custom, interactive charts and infographics using D3.js (via a wrapper) to clearly communicate impact. User testing guided the design of these visuals to ensure clarity and effectiveness."}
    ],
    liveLink: "#", // Placeholder link
    sourceLink: "#", // Placeholder link
  },
  {
    slug: "portfolio-architect",
    title: "Portfolio Architect Platform",
    category: "Web Development",
    date: "January 2023",
    longDescription: "A dynamic platform for creatives to build and manage their online portfolios with ease. Features customizable templates, drag-and-drop interface, and analytics.",
    images: [
      { src: "https://images.unsplash.com/photo-1559028006-4466a420ca94?q=80&w=1200&h=675&fit=crop", alt: "Portfolio Architect Dashboard", caption: "Admin dashboard for managing multiple portfolios." },
      { src: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=1200&h=675&fit=crop", alt: "Template Customization Interface", caption: "Template editor with live preview." },
    ],
    technologies: ["React", "Next.js", "Supabase", "Tailwind CSS", "Stripe"],
    challenges: [{ title: "Template Engine Design", content: "Creating a flexible and powerful template engine." }],
    solutions: [{ title: "Component-Based Architecture", content: "Developed a modular component system for templates." }],
    liveLink: "#",
    sourceLink: "#",
  }
];

const DEFAULT_PROJECT_SLUG = mockProjects[0].slug;

const ProjectDetailPage = () => {
  const location = useLocation();
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    console.log('ProjectDetailPage loaded');
    const projectSlugFromState = location.state?.projectSlug;
    const foundProject = mockProjects.find(p => p.slug === projectSlugFromState) || mockProjects.find(p => p.slug === DEFAULT_PROJECT_SLUG) || mockProjects[0];
    setProject(foundProject);

    if (foundProject) {
      document.title = `${foundProject.title} | Portfolio`;
    }
  }, [location.state]);

  if (!project) {
    // Basic loading state or redirect to a 404 page if project is truly not found
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>Loading project details...</p>
      </div>
    );
  }

  // AppHeader (Conceptual - Implemented as part of the page structure)
  const AppHeader = () => (
    <header className="bg-background/95 backdrop-blur border-b sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="font-bold text-lg hover:text-primary transition-colors flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          John Doe
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}><Home className="mr-1 h-4 w-4 sm:hidden md:inline-block" />Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/portfolio">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}><Briefcase className="mr-1 h-4 w-4 sm:hidden md:inline-block" />Portfolio</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}><User className="mr-1 h-4 w-4 sm:hidden md:inline-block" />About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}><Mail className="mr-1 h-4 w-4 sm:hidden md:inline-block" />Contact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );

  // AppFooter (Conceptual - Implemented as part of the page structure)
  const AppFooter = () => (
    <footer className="py-8 border-t bg-muted/50">
      <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        <p className="mt-1">Crafted with React, Tailwind CSS, and shadcn/ui.</p>
      </div>
    </footer>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="container mx-auto py-6 sm:py-8 px-4 md:px-6 flex-grow">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/portfolio">Portfolio</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="max-w-4xl mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-2">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.category} - {project.date}</p>
          </header>
          
          {project.images && project.images.length > 0 && (
            <section id="project-gallery" className="mb-8 sm:mb-10 rounded-lg overflow-hidden shadow-lg">
              <InteractiveImageGallery images={project.images} />
            </section>
          )}

          <section id="project-description" className="mb-8 sm:mb-10 prose dark:prose-invert max-w-none">
             <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">About This Project</h2>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
              {project.longDescription}
            </p>
          </section>

          <section id="technologies-used" className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.technologies.map(tech => (
                <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">{tech}</Badge>
              ))}
            </div>
          </section>

          {(project.challenges.length > 0 || project.solutions.length > 0) && (
            <section id="project-details-accordion" className="mb-8 sm:mb-10">
               <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">Project Insights</h2>
              <Accordion type="multiple" collapsible className="w-full space-y-1" defaultValue={['challenges', 'solutions']}>
                {project.challenges.length > 0 && (
                    <AccordionItem value="challenges">
                    <AccordionTrigger className="text-xl font-medium hover:no-underline">Key Challenges</AccordionTrigger>
                    <AccordionContent className="pt-2 prose dark:prose-invert max-w-none">
                        <ul className="list-disc pl-5 space-y-2">
                        {project.challenges.map((challenge, idx) => (
                            <li key={`challenge-${idx}`}>
                            <strong>{challenge.title}:</strong> {challenge.content}
                            </li>
                        ))}
                        </ul>
                    </AccordionContent>
                    </AccordionItem>
                )}
                {project.solutions.length > 0 && (
                    <AccordionItem value="solutions">
                    <AccordionTrigger className="text-xl font-medium hover:no-underline">Solutions & Approach</AccordionTrigger>
                    <AccordionContent className="pt-2 prose dark:prose-invert max-w-none">
                        <ul className="list-disc pl-5 space-y-2">
                        {project.solutions.map((solution, idx) => (
                            <li key={`solution-${idx}`}>
                            <strong>{solution.title}:</strong> {solution.content}
                            </li>
                        ))}
                        </ul>
                    </AccordionContent>
                    </AccordionItem>
                )}
              </Accordion>
            </section>
          )}

          {(project.liveLink || project.sourceLink) && (
            <section id="project-links" className="mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b pb-2">Project Links</h2>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {project.liveLink && (
                  <Button asChild size="lg">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.sourceLink && (
                  <Button asChild variant="outline" size="lg">
                    <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" /> Source Code
                    </a>
                  </Button>
                )}
              </div>
            </section>
          )}
        </article>
      </main>
      <AppFooter />
    </div>
  );
};

export default ProjectDetailPage;