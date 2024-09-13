import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css'; // Import external CSS for styling

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => {
                setProduct(json);
            });
    }, [id]);

    return (
        <div className="product-container">
            <div className="product-image">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
                <h1>{product.title}</h1>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
            </div>
        </div>
    );
}

export default Product;
