import axios from "axios";
import React, { useEffect, useState } from "react";

const FetchingData = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchingData = async () => {
    setIsLoading(true);
    const response = await axios(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    // console.log(response.data);
    const resdata = response.data;
    const extractedData = {
      name: resdata.name,
      email: resdata.email,
      username: resdata.username,
    };
    setFetchedData(extractedData);
    setIsLoading(false);
  };

//   console.log(fetchedData);

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <>
          <h2>{fetchedData.name}</h2>
          <h2>{fetchedData.username}</h2>
          <h2>{fetchedData.email}</h2>
        </>
      )}
    </div>
  );
};

export default FetchingData;
