import React, { useState, useEffect } from 'react';
import { test_backend } from 'declarations/test_backend';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [numProductsToGenerate, setNumProductsToGenerate] = useState(1);
  const [baseProductName, setBaseProductName] = useState('');

  useEffect(() => {
    test_backend.getAllProductEntries().then((products) => {
      setProducts(products);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleAddProduct = async () => {
    const newProduct = {
      id: newProductName,
      caseIds: []
    };
    await test_backend.createProductEntry(newProduct);
    setProducts([...products, newProduct]);
    setNewProductName('');
  };

  const handleGenerateProducts = async () => {
    const newProducts = [];
    for (let i = 0; i < numProductsToGenerate; i++) {
      const newProduct = {
        id: `${baseProductName} ${i + 1}`,
        caseIds: []
      };
      await test_backend.createProductEntry(newProduct);
      newProducts.push(newProduct);
    }
    setProducts([...products, ...newProducts]);
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <input 
        type="text" 
        value={newProductName} 
        onChange={(e) => setNewProductName(e.target.value)} 
        placeholder="Enter product name" 
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <input 
        type="text" 
        value={baseProductName} 
        onChange={(e) => setBaseProductName(e.target.value)} 
        placeholder="Enter base product name" 
      />
      <input 
        type="number" 
        value={numProductsToGenerate} 
        onChange={(e) => setNumProductsToGenerate(parseInt(e.target.value))} 
        placeholder="Enter number of products to generate" 
      />
      <button onClick={handleGenerateProducts}>Generate Products</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div>
              <span>{product.id}</span>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
