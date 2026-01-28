# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy everything from the repository to the container
COPY . .

# Install dependencies (both production and dev dependencies)
# --ignore-scripts prevents postinstall scripts from executing (security measure)
RUN npm ci --ignore-scripts --legacy-peer-deps || npm install --ignore-scripts --legacy-peer-deps

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
