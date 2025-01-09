import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const [APIData, setAPIData] = useState([]);
  const [storage, setStorage] = useState("");
  useEffect(() => {
    axios
      .get(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  console.log(APIData);
  
  const getData = () => {
    axios
      .get(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://673c4fb396b8dcd5f3f964ce.mockapi.io/adminProducts/${id}`)
      .then(() => {
        getData();
      });
  };
  const handleUpdate = (id, name, price, image, listType) => {
    let datas = { id, name, price, image, listType }
    console.log(datas);

    navigate(`/update/${id}`)
  };
  useEffect(() => {
    let User = localStorage.getItem("userData");
    setStorage(User);
  }, []);
  if (!storage) {
    toast.error("Error updating");
    navigate("/");

  }

  return (
    <>
      {storage && (
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

                <Table.Body >
                  {APIData.map((data, index) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{data.name}</Table.Cell>
                        <Table.Cell>{data.price}</Table.Cell>
                        <Table.Cell>
                          <img
                            style={{ width: "100px"}}
                            src={
                              "https://raw.githubusercontent.com/DhineshWiser/User-panel-website/refs/heads/main/src/assets/" +
                              data.image
                            }
                            alt="images"
                          />
                        </Table.Cell>
                        <Table.Cell>{data.listingType}</Table.Cell>
                        <Table.Cell>
                          <Button
                            className="ui primary button"
                            onClick={() => handleUpdate(data.id, data.name, data.price, data.image, data.listingType)}
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
              <>No data</>
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
      )}
    </>
  );
};

export default Products;
