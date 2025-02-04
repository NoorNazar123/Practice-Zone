import axios from "axios";
import { useEffect, useState } from "react";

// Products Component
const Products = ({ title, image }) => {
  return (
    <div>
      <img src={image} alt={title} />
      <h1>{title}</h1>
    </div>
  );
};

// Main App Component
function App() {
  const [products, setProducts] = useState([]);

  // Fetch Products
  const getProducts = async () => {
    try {
      const res = await axios("https://dummyjson.com/products?limit=500");
      setProducts(res.data?.products);
      console.log(res.data?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Pagination</h1>

      <div>
        {products.length === 0 ? (
          <div>Products not found</div>
        ) : (
          <div>
            {products.map((product) => (
              <Products
                key={product.id} // Unique key for each product
                title={product.title}
                image={product.thumbnail} // Assuming thumbnail is the image URL
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;