import express from "express";
import cors from "cors";
import  router  from "./router/router.js";
const app = express();
 
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! hi");
    }
);

app.use("/", router);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});