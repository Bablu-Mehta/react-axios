import axios from "axios";
import React, { useEffect, useState } from "react";

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
      setFetchedData(userData);
    } catch (error) {
      throw new Error("somthing wrong!!!");
    }

    setIsLoading(false);
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}

      {!isLoading &&
        fetchedData.map((user) => {
          return (
            <div key={user.email}>
              <ul>
                <li>{user.fullname}</li>
                <li>{user.username}</li>
                <li>{user.email}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default FetchingData;
