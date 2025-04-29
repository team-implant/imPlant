# Step 1: Use a secure, modern Node.js image to build the app
FROM node:23-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app (assumes Create React App or Vite)
RUN npm run build

# Step 2: Use a minimal Nginx image to serve the build
FROM nginx:alpine

# Copy the built app to Nginx default directory (make sure the path matches 'dist' not 'build')
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will serve the site on
EXPOSE 80

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
