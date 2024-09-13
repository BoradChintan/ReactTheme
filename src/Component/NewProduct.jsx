import React, { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Rating from '@mui/material/Rating';

function NewProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setimage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [rating, setRating] = useState({ rate: 1, count: 1 }); // Default rating to 1

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file); // Create a URL for the uploaded image
            setimage(url); // Set the image URL to state
            setImageFile(file); // Optionally store the file object
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Collect form data
        const formData = {
            title,
            price,
            description,
            category,
            image,
            rating
        };

        console.log(formData);

        fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify(
                formData
            )
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)

                setRating({ rate: 1, count: 1 })
                setImageFile('')
                setimage('')
                setCategory('')
                setDescription('')
                setPrice('')
                setTitle('')
                setImageFile(null)
            }
            )
            .catch(error => alert("Something went wrong for adding product"))
    }
    useEffect(() => {
        console.log('page re-render')
    }, [])

    return (

        <div className="container mt-5 row">

            <h4>Create New Product</h4>
            <form onSubmit={handleFormSubmit}>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter product price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className="form-select"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Product Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </div>

                {image && (
                    <div className="mb-3">
                        <img
                            src={image}
                            alt="Product Preview"
                            className="img-fluid mt-3"
                            style={{ maxWidth: '200px' }}
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <div>
                        <Rating
                            name="simple-controlled"
                            value={rating.rate}
                            onChange={(event, newValue) => {
                                setRating({ ...rating, rate: newValue });
                            }}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
        </div>
    );
}

export default NewProduct
