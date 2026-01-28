# Use Alpine for a lighter, faster build image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# 1. Cache Layer: Copy package files ONLY first.

COPY package.json package-lock.json ./

# 2. Install Dependencies

RUN npm ci --legacy-peer-deps

# 3. Copy the rest of the source code
COPY . .

# 4. Build the Static Assets

RUN npm run build

CMD ["echo", "Build success. Ready for artifact extraction."]
