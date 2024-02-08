const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = "./data.json";

const cors = require("cors");

app.use(cors());

// Middleware
app.use(express.json());

// GET API - Read all data from file
app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading data file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET API - Read single data by ID
app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("id=", id);
    // Read data from the file
    const rawData = await fs.readFile(dataFilePath, "utf-8");
    // console.log("raw data", rawData);
    const data = JSON.parse(rawData);
    // console.log("converted data", data);
    // Find the object with the matching ID
    const singleData = data.find((item) => item.id == parseInt(id));
    // console.log("single data", singleData);
    if (singleData) {
      res.json(singleData);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error reading single data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST API - Create data and store in file
app.post("/", async (req, res) => {
  try {
    const newData = req.body;
    const data = JSON.parse(await fs.readFile(dataFilePath, "utf-8"));
    data.push(newData);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Data created successfully" });
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT API - Update data in file
app.put("/:id/edit", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // console.log("id:", id)
    const updatedData = req.body;
    // console.log('body:', updatedData);
    const data = JSON.parse(await fs.readFile(dataFilePath, "utf-8"));
    console.log("old dta:", data);
    const dataIndex = data.findIndex((item) => item.id == parseInt(id));
    if (dataIndex !== -1) {
      data[dataIndex] = { id, ...updatedData };
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
      res.json({ message: "Data updated successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE API - Delete data from file
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("delting id:", id);
    const data = JSON.parse(await fs.readFile(dataFilePath, "utf-8"));
    // console.log("old data:", data);
    const newData = data.filter((item) => item.id != parseInt(id));
    // console.log("new data:", newData);

    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2));
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
