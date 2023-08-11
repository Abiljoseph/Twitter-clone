const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = "mongodb+srv://abiljoseph98p:abiljoseph98p@cluster0.clk9lpe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let postCollection;
let userCollection;

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        // Access the collections once the connection is established
        const database = client.db("your_database_name"); // Replace 'your_database_name' with your actual database name
        postCollection = database.collection("posts");
        userCollection = database.collection("users");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

connectToMongoDB();

app.get("/", (req, res) => {
    res.send("Hello from Twitter");
});

app.get("/post", async (req, res) => {
    try {
        const posts = await (await postCollection.find().toArray()).reverse();
        res.json(posts);
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).json({ error: "An error occurred while fetching posts" });
    }
});
app.get("/register", async (req, res) => {
    try {
        const user = await userCollection.find().toArray();
        res.json(user);
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

app.get("/loggedInUser", async (req, res) => {
    const email = req.query.email;
    const user = await userCollection.find({ email: email }).toArray();
    res.send(user);
})

app.patch("/userUpdate/:email", async (req, res) => {
    const filter = req.params;
    const profile = req.body;
    const options = { upsert: true };
    const updateDoc = { $set: profile };
    const result = await userCollection.updateOne(filter, updateDoc, options)
    res.send(result);
});

app.get("/userpost", async (req, res) => {
    const email = req.query.email;
    const post = (await postCollection.find({ email: email }).toArray()).reverse();
    res.send(post)
})



app.post("/post", async (req, res) => {
    try {
        const post = req.body;
        const result = await postCollection.insertOne(post);
        if (result) {
            res.send(result)
            console.log(result);
        } else {
            throw new Error("Failed to create the post.");
        }
    } catch (error) {
        console.log("Error creating post:", error);
        res.status(500).json({ error: "An error occurred while creating the post" });
    }
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);
    try {
        if (result) {
            res.send(result);
            console.log(result);
        } else {
            throw new Error("Registration failed.");
        }
    } catch (error) {
        console.log("Error creating post:", error);
        res.status(500).json({ error: "an error occur while try to register user" })
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
