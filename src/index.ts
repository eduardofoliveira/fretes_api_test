import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
import { rootRoutes } from './routes/routes'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(rootRoutes);

app.listen(port, () => {
    console.log(`API running at port ${port}`);
});
