import { useState } from 'react';
import { Card } from '@/components/ui/card';
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

  return (
    <Card className="w-full rounded-[20px] shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-background text-foreground px-6 py-3 rounded-[18px] shadow-lg">
            <h2 className="text-lg font-semibold font-accent" data-testid="text-gallery-title">
              Gallery
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddImage}
              data-testid="button-add-image"
              className="bg-background text-foreground px-5 py-2.5 rounded-[18px] text-sm font-medium shadow-lg hover-elevate transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              ADD IMAGE
            </button>

            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              data-testid="button-gallery-previous"
              className="h-11 w-11 rounded-full bg-background text-foreground shadow-lg hover-elevate transition-all duration-300 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              data-testid="button-gallery-next"
              className="h-11 w-11 rounded-full bg-background text-foreground shadow-lg hover-elevate transition-all duration-300 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={currentIndex + index}
              className="aspect-square rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-105"
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
      </div>
    </Card>
  );
}
