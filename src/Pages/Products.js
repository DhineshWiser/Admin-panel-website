import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("email");
    console.log(user);
    

    if (!user) {
      toast.error("User not logged in. Redirecting...");
      navigate("/"); // Redirect to login if user not found
      return;
    }

    // Fetch product data if user is logged in
    axios
      .get(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts`)
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching products.");
      });
  }, [navigate]); // Only run on initial render

  const getData = () => {
    axios
      .get(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts`)
      .then((getData) => {
        setAPIData(getData.data);
      })
      .catch((error) => {
        toast.error("Error fetching products.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        toast.error("Error deleting product.");
      });
  };

  const handleUpdate = (id, name, price, image, listType) => {
    let datas = { id, name, price, image, listType };
    navigate(`/update/${id}`);
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        <div className="fs-3">Product List..</div>
        <Link className="ui primary button" to="/Addproducts">
          Add New Products
        </Link>
      </div>
      <div>
        {APIData.length !== 0 ? (
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {APIData.map((data, index) => {
                return (
                  <Table.Row key={data.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.price}</Table.Cell>
                    <Table.Cell>
                      <img
                        style={{ width: "100px" }}
                        src={
                          "https://raw.githubusercontent.com/DhineshWiser/User-panel-website/refs/heads/main/src/assets/" +
                          data.image
                        }
                        alt="product"
                      />
                    </Table.Cell>
                    <Table.Cell>{data.listingType}</Table.Cell>
                    <Table.Cell>
                      <Button
                        className="ui primary button"
                        onClick={() =>
                          handleUpdate(
                            data.id,
                            data.name,
                            data.price,
                            data.image,
                            data.listingType
                          )
                        }
                      >
                        Update
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        className="ui red button"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <>No data available</>
        )}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Products;
