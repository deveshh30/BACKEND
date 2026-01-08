import express from "express";

const app = express();
app.use(express.json());

const PORT = 4000;

const items = [];

app.post("/items", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newItem = {
        id: Date.now(),
        name,
    };

    items.push(newItem);

    res.status(201).json(newItem);
});

app.get("/items", (req,res)=>{
    res.json(items);
});

app.delete("/items/:id" , (req,res)=>{
    const id = Number(req.params.id);
    
    const index = items.findIndex(item => item.id === id);

     if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
