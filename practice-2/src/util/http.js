import axios from "axios";

export async function fetchData() {
  try {
    const response = await axios("http://localhost:3000/");
    return response.data;
  } catch (error) {
    throw new Error("Something Went Wrong While Fetching the users Data.");
  }
}

// export async function createData(userData){

// }