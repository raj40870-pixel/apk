# Use official Node.js 20 LTS lightweight image
FROM node:20-bookworm-slim

# Set working directory
WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build Vite frontend and bundled backend server
RUN npm run build

# Default environment configuration for Google Cloud Run
ENV NODE_ENV=production
ENV PORT=8080
ENV MOCK_BUILD=true

# Ensure apks directory exists for downloads
RUN mkdir -p apks

# Cloud Run default port
EXPOSE 8080

# Start the built production server
CMD ["npm", "start"]
