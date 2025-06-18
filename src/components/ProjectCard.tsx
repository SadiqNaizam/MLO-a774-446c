import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn function

interface ProjectCardProps {
  title: string;
  shortDescription?: string;
  imageUrl: string;
  tags: string[];
  projectSlug: string; // Unique identifier for the project
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  shortDescription,
  imageUrl,
  tags,
  projectSlug,
  className,
}) => {
  console.log(`ProjectCard loaded for: ${title}`);

  return (
    <Card className={cn("w-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col group", className)}>
      <CardHeader className="p-0 relative border-b">
        <AspectRatio ratio={16 / 9}>
          <Link to="/project-detail" state={{ projectSlug: projectSlug }} aria-label={`View details for ${title}`}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Project+Image'}
              alt={`Thumbnail for ${title}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4 space-y-3 flex-grow">
        <CardTitle className="text-xl font-semibold leading-tight">
          <Link to="/project-detail" state={{ projectSlug: projectSlug }} className="hover:text-primary/90 transition-colors">
            {title}
          </Link>
        </CardTitle>
        
        {shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {shortDescription}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 mt-auto"> {/* mt-auto pushes footer to bottom if flex-grow is on content */}
        <Button asChild className="w-full">
          <Link to="/project-detail" state={{ projectSlug: projectSlug }}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;