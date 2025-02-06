import axios from "axios";
import { useEffect, useState } from "react";

// Define the type for a product
interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

// Define the types for product props
interface ProductProps {
  title: string;
  image: string;  // Assuming it's a string URL for the image
}

const Products: React.FC<ProductProps> = ({ title, image }) => {
  return (
    <div className="product-item">
      <img src={image} alt={title} className="product-item__image" />
      <h1 className="product-item__title">{title}</h1>
    </div>

  );
};

// Main App Component
function App() {
  const [products, setProducts] = useState<Product[]>([]);  // Set the type of products state

  // Fetch Products
  const getProducts = async () => {
    try {
      const res = await axios("https://dummyjson.com/products?limit=500");
      setProducts(res.data?.products || []); // Ensure we handle empty data gracefully
      console.log(res.data?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="product-list-container">
        <h1 className="product-list-container__title">Pagination</h1>

        <div className="product-list-container__body">
          {products.length === 0 ? (
            <div className="product-list-container__empty-message">Products not found</div>
          ) : (
            <div className="product-list-container__grid">
              {products.map((product) => (
                <div className="product-list-item" key={product.id}>
                  <Products
                    title={product.title}
                    image={product.thumbnail} // Assuming thumbnail is the image URL
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default App;
