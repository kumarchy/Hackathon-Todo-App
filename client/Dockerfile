# Use Node 18 base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# Build the app for production
RUN npm run build

# Use a lightweight web server to serve the static files
# Install `serve` package globally
RUN npm install -g serve

# Expose the default port Vite apps use for dev, but override for production
EXPOSE 3000

# Start the built app using `serve`
CMD ["serve", "-s", "dist"]
