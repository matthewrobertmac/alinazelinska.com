# Use an official Node runtime as a parent image
FROM node:14-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
# First, copying package.json and yarn.lock (or package-lock.json) for better caching
COPY package*.json ./
COPY yarn.lock ./

# Install any needed packages using yarn or npm
RUN yarn install --frozen-lockfile || npm install

# Copy everything else
COPY . ./

# Define environment variable for creating production build
ENV NODE_ENV production

# At runtime, we'll use the PORT environment variable provided by Cloud Run
CMD ["sh", "-c", "npm start -- -p $PORT"]
