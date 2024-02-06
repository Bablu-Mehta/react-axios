import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./FetchingData.module.css";

const url = "https://react-http-a309a-default-rtdb.firebaseio.com/user.json";

const FetchingData = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(fetchedData);

  const fetchingData = async () => {
    setIsLoading(true);
    try {
      const response = await axios(url);
      // console.log("reponse data " + JSON.stringify(response.data));
      // const resdata = JSON.stringify(response.data);
      // const userObject = JSON.parse(resdata);
      const userData = Object.values(response.data);
      // console.log(userData);
      setFetchedData(userData);
    } catch (error) {
      throw new Error("somthing wrong!!!");
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchingData();
  }, []);

  // const handleDeleteUser = async (email) => {
  //   console.log(email);
  //   console.log(fetchedData);
  //   const updatedData = fetchedData.filter((user) => user.email !== email);
  //   setFetchedData(updatedData);
  //   console.log("for deletion", updatedData);
  //   try {
  //     const deleteUrl = `https://react-http-a309a-default-rtdb.firebaseio.com/user/${email}.json`;
  //       const response = await axios.delete(deleteUrl);
  //   } catch (error) {}
  // };

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}

      {!isLoading &&
        fetchedData.map((user) => {
          return (
            <div key={user.email} className={classes.container}>
              <ul>
                <li>{user.fullname}</li>
                <li>{user.username}</li>
                <li>{user.email}</li>
              </ul>
              <button
                onClick={() => handleDeleteUser(user.email)}
                className={classes.button}
              >
                Delete User
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default FetchingData;
