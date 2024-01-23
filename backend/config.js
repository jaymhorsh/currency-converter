import dotenv from "dotenv";
dotenv.config(); //it will  enable us to read the content of .env file

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET
};

export default config;
