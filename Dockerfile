# Use the official Node.js image as the base image
FROM node:18-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code to the working directory
COPY . .
 
ENV BUILD_STANDALONE true
# Build the Next.js application
RUN npm run build
 
EXPOSE 10131
 
# Command to run the application
CMD ["npm", "start"]