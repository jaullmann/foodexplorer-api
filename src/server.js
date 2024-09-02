require("express-async-errors");
require("dotenv/config");
const migrationsRun = require('./database/sqlite/migrations');

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const uploadConfig = require("./configs/upload");
const AppError = require("./utils/AppError");

migrationsRun();

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(cookieParser());

// definição de origens permitidas para execução do front-end
app.use(cors({       
  origin: [
    "http://localhost:5173", 
    "http://127.0.0.1:5173/",
    "https://foodexplorer2024.netlify.app"
  ],
  credentials: true
})); 
// definição de origens permitidas para execução do front-end   

app.use(routes);

app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
  
    console.error(err);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));