
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const binRoutes = require("./routes/binRoutes");
app.use("/api/bins", binRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
