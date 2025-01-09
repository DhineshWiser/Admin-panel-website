"use strict";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Update = () => {
    let { id } = useParams();

    const giturl = "https://raw.githubusercontent.com/DhineshWiser/User-panel-website/refs/heads/main/src/assets/"

    useEffect(() => {
        axios
            .get('https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts')
            .then((getData) => {
                let data = getData.data;
                let filter = data.filter((items) => items.id == id);

                if (filter.length > 0) {
                    setName(filter[0].name);
                    setPrice(filter[0].price);
                    setImage(filter[0].image);
                    setListingType(filter[0].listingType);
                } else {
                    console.log("Product with this id not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [imageData, setImageData] = useState("");
    const [listingType, setListingType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submit button clicked");

        try {
            axios.put(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts/${id}`, {
                name,
                price,
                image,
                listingType,
            });
        } catch (error) {
            console.log(error);
        }

        setName("");
        setPrice("");
        setImage("");
        setImageData("");
        setListingType("");
        navigate("/products");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageData(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
            setImage(file.name);
        }
    };

    return (
        <div className="container w-50 m-auto vh-100 d-flex flex-column justify-content-center">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <h2 className="mt-3 mb-4 ">Update Products</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {image && (
                    <img
                        src={giturl + image}
                        alt="Selected"
                        className="img-fluid mb-3"
                        style={{ maxWidth: "200px" }}
                    />
                )}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Categories
                    </label>
                    <select
                        className="form-control"
                        id="category"
                        value={listingType}
                        onChange={(e) => setListingType(e.target.value)}
                        required
                    >
                        <option value="watch">Watch</option>
                        <option value="shoes">Shoes</option>
                        <option value="bags">Bags</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success text-white">
                    Add Listing
                </button>
            </form>
        </div>
    );
};

export default Update;