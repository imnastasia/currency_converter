# Use the official Node.js 23 image as the base image
FROM node:23.11.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install -g nodemon
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["nodemon", "app/app.js"]
