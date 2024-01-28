# Use a base image with Node.js and other necessary dependencies
FROM node:21

# Set the working directory
WORKDIR /app

# Copy the frontend code and install dependencies
COPY package*.json ./

RUN npm install 

COPY . .
# Expose the port on which the frontend will run
EXPOSE 5000

# Command to run the frontend server
CMD ["npm", "run", "dev"]
