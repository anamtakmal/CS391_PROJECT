import ProductCard from '../ProductCard';
import hoodieImage from '@assets/generated_images/black_hoodie_product_shot.png';

export default function ProductCardExample() {
  return (
    <div className="max-w-xs">
      <ProductCard
        id="1"
        name="Void Essentials Hoodie"
        price={189.00}
        image={hoodieImage}
        category="Hoodie"
        isNew
      />
    </div>
  );
}
