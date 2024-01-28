# Use a base image with Node.js and other necessary dependencies
FROM node:21

# Set the working directory
WORKDIR /app

# Copy only the package.json file to install dependencies separately
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port on which the frontend will run
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "run", "dev"]

