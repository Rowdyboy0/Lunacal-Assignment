import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useClickSound } from '@/hooks/useClickSound';

interface GalleryWidgetProps {
  images: string[];
  onAddImage?: () => void;
}

export default function GalleryWidget({ images: initialImages, onAddImage }: GalleryWidgetProps) {
  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playClick = useClickSound();

  const visibleImages = images.slice(currentIndex, currentIndex + 3);
  const maxIndex = Math.max(0, images.length - 3);

  const handlePrevious = () => {
    playClick();
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    playClick();
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const handleAddImage = () => {
    playClick();
    if (onAddImage) {
      onAddImage();
    }
    console.log('Add image triggered');
  };

  const scrollPercentage = images.length > 3 
    ? (currentIndex / maxIndex) * 100 
    : 0;

  return (
    <Card className="w-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold font-accent" data-testid="text-gallery-title">
            Gallery
          </h2>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              data-testid="button-gallery-previous"
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              data-testid="button-gallery-next"
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddImage}
              data-testid="button-add-image"
              className="bg-primary/15 hover:bg-primary/25"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Image
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {visibleImages.map((image, index) => (
            <div
              key={currentIndex + index}
              className="aspect-square rounded-lg overflow-hidden border border-card-border transition-all duration-300 hover:scale-105 hover:border-primary/50"
              data-testid={`image-gallery-${currentIndex + index}`}
            >
              <img
                src={image}
                alt={`Gallery image ${currentIndex + index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="w-full h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (3 / images.length) * 100)}%`, marginLeft: `${scrollPercentage}%` }}
            data-testid="scrollbar-gallery"
          />
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center" data-testid="text-gallery-count">
          {currentIndex + 1}-{Math.min(currentIndex + 3, images.length)} of {images.length}
        </p>
      </div>
    </Card>
  );
}
