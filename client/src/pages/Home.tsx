import TabWidget from '@/components/TabWidget';
import GalleryWidget from '@/components/GalleryWidget';
import CursorStarTrail from '@/components/CursorStarTrail';
import { Card } from '@/components/ui/card';
import image1 from '@assets/generated_images/Purple_teal_gradient_abstract_art_b249467c.png';
import image2 from '@assets/generated_images/Amber_geometric_abstract_composition_3c0d8ecf.png';
import image3 from '@assets/generated_images/Purple_cyan_cosmic_nebula_404760e5.png';

export default function Home() {
  const tabs = [
    {
      id: 'about',
      label: 'About Me',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Content for About Me will be added here.
          </p>
        </div>
      ),
    },
    {
      id: 'experiences',
      label: 'Experiences',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Content for Experiences will be added here.
          </p>
        </div>
      ),
    },
    {
      id: 'recommended',
      label: 'Recommended',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Content for Recommended will be added here.
          </p>
        </div>
      ),
    },
  ];

  const galleryImages = [image1, image2, image3, image1, image2, image3];

  return (
    <>
      <CursorStarTrail />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 items-start">
            <div className="hidden md:flex items-start justify-center" data-testid="div-left-blank">
              <Card className="w-full max-w-md h-full" />
            </div>

            <div className="flex flex-col space-y-6 max-w-md" data-testid="div-right-widgets">
              <TabWidget tabs={tabs} />
              <GalleryWidget 
                images={galleryImages}
                onAddImage={() => console.log('Add image clicked')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
