import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader'; // Assumed custom component
import AppFooter from '@/components/AppFooter'; // Assumed custom component
import ProjectCard from '@/components/ProjectCard'; // Custom component from input
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // shadcn/ui component

// Sample project data
const allProjects = [
  {
    projectSlug: 'project-alpha',
    title: 'E-commerce Platform',
    shortDescription: 'A full-featured e-commerce platform with modern UI and robust backend, built with React and Node.js.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=1&ecommerce,webdevelopment',
    tags: ['React', 'Node.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
  },
  {
    projectSlug: 'project-beta',
    title: 'Task Management App',
    shortDescription: 'A collaborative task management application designed to boost team productivity. Features drag-and-drop interface.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=2&taskmanagement,saas',
    tags: ['Vue.js', 'Firebase', 'Productivity', 'RealtimeDB'],
  },
  {
    projectSlug: 'project-gamma',
    title: 'Personal Portfolio Template',
    shortDescription: 'A sleek and modern portfolio website template for creatives, built with Next.js and Tailwind CSS.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=3&portfolio,webdesign',
    tags: ['Next.js', 'Tailwind CSS', 'Vercel', 'Responsive Design'],
  },
  {
    projectSlug: 'project-delta',
    title: 'Mobile Banking App UI',
    shortDescription: 'UI/UX design for a next-generation mobile banking application focusing on intuitive user experience and security.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=4&mobilebanking,uidesign',
    tags: ['Figma', 'UX Design', 'Mobile App', 'Fintech'],
  },
  {
    projectSlug: 'project-epsilon',
    title: 'AI Powered Blog Generator',
    shortDescription: 'A content creation tool that uses AI to generate blog posts from simple prompts, integrated with various CMS.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=5&artificialintelligence,nlp',
    tags: ['Python', 'OpenAI API', 'NLP', 'Machine Learning', 'Flask'],
  },
  {
    projectSlug: 'project-zeta',
    title: 'Fitness Tracking Application',
    shortDescription: 'Track your workouts, nutrition, and progress with this comprehensive fitness application for iOS and Android.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=6&fitnessapp,healthtech',
    tags: ['React Native', 'GraphQL', 'Health', 'Mobile Development'],
  },
  {
    projectSlug: 'project-eta',
    title: 'Data Visualization Dashboard',
    shortDescription: 'An interactive dashboard for visualizing complex datasets, helping businesses make data-driven decisions.',
    imageUrl: 'https://source.unsplash.com/random/600x400?sig=7&datavisualization,dashboard',
    tags: ['D3.js', 'React', 'Big Data', 'Analytics'],
  },
];

const ITEMS_PER_PAGE = 6; // Number of projects per page

const PortfolioPage = () => {
  console.log('PortfolioPage loaded');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);
  const currentProjects = allProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader /> {/* Assumed custom component for navigation */}
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section aria-labelledby="portfolio-heading">
          <h1 
            id="portfolio-heading" 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-10 sm:mb-16 text-primary"
          >
            My Work & Projects
          </h1>
          
          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProjects.map((project, index) => (
                <ProjectCard
                  key={project.projectSlug}
                  title={project.title}
                  shortDescription={project.shortDescription}
                  imageUrl={project.imageUrl || `https://source.unsplash.com/random/600x400?sig=${index}&abstract`}
                  tags={project.tags}
                  projectSlug={project.projectSlug}
                  className="h-full" // Ensure cards in a row have same height if content varies
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg">No projects to display at the moment. Please check back later!</p>
          )}
        </section>

        {totalPages > 1 && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-60" : undefined}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={`page-${index + 1}`}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handlePageChange(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                      aria-current={currentPage === index + 1 ? "page" : undefined}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentPage < totalPages) handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-60" : undefined}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
      
      <AppFooter /> {/* Assumed custom component for footer */}
    </div>
  );
};

export default PortfolioPage;