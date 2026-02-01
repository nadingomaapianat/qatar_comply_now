# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies from lockfile
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Production stage: serve static files
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom nginx config for SPA routing (e.g. React Router)
RUN echo 'server { \
  listen 3000; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { try_files $uri $uri/ /index.html; } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
