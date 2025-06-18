import React from 'react';
import { Link } from 'react-router-dom';

// Assuming AppHeader and AppFooter are custom components in src/components/
// If these are not custom components, their imports would need to be adjusted
// or they would be implemented directly here or using shadcn/ui primitives.
import AppHeader from '@/components/AppHeader'; // Placeholder: Assume this custom component exists
import AppFooter from '@/components/AppFooter'; // Placeholder: Assume this custom component exists

import ProjectCard from '@/components/ProjectCard'; // Custom component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui
import { ArrowRight, User, Briefcase, Code } from 'lucide-react';

// Placeholder data for featured projects
const featuredProjects = [
  {
    title: "AI-Powered Task Manager",
    shortDescription: "A smart task management application leveraging AI to optimize productivity and workflow for individuals and teams.",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1lcnxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=500&q=60", // Placeholder image
    tags: ["React", "AI", "Node.js", "Productivity"],
    projectSlug: "ai-task-manager"
  },
  {
    title: "E-commerce Platform Redesign",
    shortDescription: "Led the UX/UI redesign for a major e-commerce platform, focusing on enhancing user experience and conversion rates.",
    imageUrl: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=500&q=60", // Placeholder image
    tags: ["UX/UI", "Figma", "Next.js", "E-commerce"],
    projectSlug: "ecommerce-redesign"
  },
  {
    title: "Interactive Data Visualization Tool",
    shortDescription: "Developed a web-based tool for visualizing complex datasets, enabling users to gain insights through interactive charts and graphs.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHZpc3VhbGl6YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", // Placeholder image
    tags: ["D3.js", "React", "Data Analysis", "Web App"],
    projectSlug: "data-visualization-tool"
  }
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 text-slate-900 dark:text-slate-50">
      {/* Assume AppHeader handles its own content, possibly navigation */}
      <AppHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Card className="max-w-3xl mx-auto bg-white dark:bg-slate-800/50 shadow-2xl rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="p-6 sm:p-10">
              <User className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-primary mb-4" />
              <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-sky-400">
                Hello, I'm [Your Name]
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-10 space-y-6">
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                A passionate and creative [Your Profession/Role, e.g., Full-Stack Developer, UX Designer] based in [Your City/Region]. I specialize in building modern, responsive, and user-centric web applications.
              </p>
              <p className="text-md text-slate-500 dark:text-slate-400">
                My goal is to transform ideas into reality through clean code and thoughtful design.
              </p>
              <Button asChild size="lg" className="mt-4 group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <Link to="/portfolio"> {/* Path from App.tsx */}
                  Explore My Work
                  <Briefcase className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Featured Projects Section */}
        <section className="py-12 sm:py-16 bg-slate-100 dark:bg-slate-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <Code className="h-10 w-10 mx-auto text-primary mb-2" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Featured Projects
              </h2>
              <p className="mt-2 text-md text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Here's a glimpse of some projects I'm proud of. Check out my portfolio for more.
              </p>
            </div>
            
            {featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={project.projectSlug}
                    title={project.title}
                    shortDescription={project.shortDescription}
                    imageUrl={project.imageUrl}
                    tags={project.tags}
                    projectSlug={project.projectSlug}
                    className="transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400">No featured projects to display at the moment. Please check back later!</p>
            )}

            <div className="text-center mt-10 sm:mt-12">
              <Button variant="outline" asChild className="group transition-all duration-300 ease-in-out">
                <Link to="/portfolio"> {/* Path from App.tsx */}
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Optional: Mini About/Skills Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <Card className="max-w-2xl mx-auto p-6 sm:p-8 shadow-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100">A Bit About Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                        I thrive on challenges and am constantly learning new technologies to enhance my skillset. My experience spans across [mention 2-3 key areas like 'front-end development', 'back-end systems', 'UI/UX design', 'cloud infrastructure'].
                    </p>
                    <Button asChild variant="secondary">
                        <Link to="/about"> {/* Path from App.tsx */}
                            Learn More About Me
                        </Link>
                    </Button>
                </CardContent>
             </Card>
          </div>
        </section>
      </main>

      {/* Assume AppFooter handles its own content, possibly social links or copyright */}
      <AppFooter />
    </div>
  );
};

export default Homepage;