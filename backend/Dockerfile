# Use the official Node.js image as the base image
FROM node:23-alpine

# Install required libraries
RUN apk add --no-cache \
    openssl \
    libssl3

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install --prod

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the backend application
CMD ["pnpm", "start"]