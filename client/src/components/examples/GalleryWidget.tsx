import GalleryWidget from '../GalleryWidget';
import image1 from '@assets/generated_images/Purple_teal_gradient_abstract_art_b249467c.png';
import image2 from '@assets/generated_images/Amber_geometric_abstract_composition_3c0d8ecf.png';
import image3 from '@assets/generated_images/Purple_cyan_cosmic_nebula_404760e5.png';

export default function GalleryWidgetExample() {
  const images = [image1, image2, image3, image1, image2, image3];

  return (
    <GalleryWidget 
      images={images}
      onAddImage={() => console.log('Add image clicked')}
    />
  );
}
