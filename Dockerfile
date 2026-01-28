# Use Alpine for a lighter, faster build image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# 1. Optimize Caching: Copy package files first
COPY package.json package-lock.json ./

# 2. Install Dependencies
# We use 'npm ci' for a clean, deterministic install
RUN npm ci --legacy-peer-deps

# 3. Copy the rest of the source code
COPY . .

RUN npx vite build

# 5. Dummy Command for the Artifact Builder pattern
CMD ["echo", "Build success. Ready for artifact extraction."]
