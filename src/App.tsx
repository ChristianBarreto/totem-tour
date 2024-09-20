import React, { useEffect, useState } from 'react';
import './App.css';
import { Products, Product } from './api';

function App() {
  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    console.log("app")

    // getProducts().then((res) => {
    //   setProducts(res)
    // })

  }, [])

  return (
    <div>


    </div>
  );
}

export default App;
