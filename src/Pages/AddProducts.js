import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [listingType, setListingType] = useState("others");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts`, {
      name,
      price,
      image,
      listingType,
    });
    sessionStorage.setItem('name',name)
    sessionStorage.setItem('price',price)
    sessionStorage.setItem('image',image)
    sessionStorage.setItem('listingType',listingType)
    setName("");
    setPrice("");
    setImage("");
    setImageData("");
    setListingType("others");
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
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="" className="fw-bold" >Admin</Navbar.Brand>
          <Nav className="ms-auto">
          <Link to="/">
          <Button variant="btn outline-primary">Login</Button>
          </Link>
          <Link to="/signup">
          <Button variant=" btn outline-primary">Signup</Button>
          </Link>
          </Nav>
        </Container>
      </Navbar>
      
      <div className="container w-25 m-auto  d-flex flex-column justify-content-center bg-light mt-5">
        <h4 className="mt-4 text-center fw-bold">Add New Products</h4>
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
          {imageData && (
            <img
              src={imageData}
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
          <div className=" d-flex  justify-content-evenly">
            <button type="submit" className="btn btn-primary mb-4 ">
              Add Products
            </button> 
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;