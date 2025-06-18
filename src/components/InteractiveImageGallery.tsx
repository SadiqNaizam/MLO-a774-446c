import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, X, Maximize, PlayCircle } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
  type?: 'image' | 'video';
}

interface InteractiveImageGalleryProps {
  images: ImageItem[];
}

const InteractiveImageGallery: React.FC<InteractiveImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  console.log('InteractiveImageGallery loaded');

  useEffect(() => {
    // Reset index if images array changes and current index is out of bounds
    if (images && images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    } else if ((!images || images.length === 0) && currentIndex !== 0) {
        setCurrentIndex(0); // Reset if images become empty
    }
  }, [images, currentIndex]);


  if (!images || images.length === 0) {
    return <div className="text-center text-muted-foreground p-4">No images or videos to display.</div>;
  }

  const selectedItem = images[currentIndex];
  if (!selectedItem) {
     // This case should ideally be covered by the previous check, but as a fallback:
    return <div className="text-center text-muted-foreground p-4">Selected media item not found.</div>;
  }


  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    setCurrentIndex(prevIndex => {
      if (direction === 'next') {
        return (prevIndex + 1) % images.length;
      } else {
        return (prevIndex - 1 + images.length) % images.length;
      }
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Display Area */}
      <div 
        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md"
        onClick={() => handleOpenLightbox(currentIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleOpenLightbox(currentIndex)}
        aria-label={`View ${selectedItem.type || 'image'} ${currentIndex + 1} of ${images.length} in lightbox. ${selectedItem.caption || ''}`}
      >
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {(selectedItem.type === 'video') ? (
            <video src={selectedItem.src} className="w-full h-full object-contain" controls preload="metadata">
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={selectedItem.src} alt={selectedItem.alt} className="w-full h-full object-contain" />
          )}
        </AspectRatio>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Maximize className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
        </div>
      </div>
      {selectedItem.caption && (
        <p className="text-sm text-muted-foreground mt-1 text-center">{selectedItem.caption}</p>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex space-x-2 p-2">
            {images.map((item, index) => (
              <div
                key={index}
                className={`relative w-20 h-14 sm:w-24 sm:h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all
                            ${currentIndex === index ? 'border-primary shadow-md' : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'}`}
                onClick={() => handleThumbnailClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleThumbnailClick(index)}
                aria-label={`View ${item.type || 'image'} ${index + 1}. ${item.caption || item.alt}`}
              >
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  {(item.type === 'video') ? (
                     <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                       <PlayCircle className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                     </div>
                  ) : (
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                  )}
                </AspectRatio>
                {currentIndex === index && <div className="absolute inset-0 border-2 border-primary rounded-md pointer-events-none"></div>}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-screen-lg w-[95vw] h-auto sm:h-[90vh] p-0 flex flex-col bg-background shadow-2xl rounded-lg">
          <div className="relative flex-grow flex items-center justify-center bg-black overflow-hidden">
            {(images[currentIndex]?.type === 'video') ? (
              <video 
                key={images[currentIndex]?.src} // Key to force re-render on src change
                src={images[currentIndex]?.src} 
                className="max-w-full max-h-[calc(90vh-60px)] object-contain" // Adjusted max-h for caption space
                controls 
                autoPlay
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                key={images[currentIndex]?.src}
                src={images[currentIndex]?.src} 
                alt={images[currentIndex]?.alt} 
                className="max-w-full max-h-[calc(90vh-60px)] object-contain"
              />
            )}

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white hover:text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 z-10"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white hover:text-white rounded-full h-10 w-10 sm:h-12 sm:w-12 z-10"
                  aria-label="Next item"
                >
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                </Button>
              </>
            )}
            <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/40 hover:bg-black/70 text-white hover:text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 z-10"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
            </DialogClose>
          </div>
          {images[currentIndex]?.caption && (
            <div className="p-3 sm:p-4 border-t bg-muted/50 text-center">
              <p className="text-sm text-foreground">{images[currentIndex]?.caption}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InteractiveImageGallery;