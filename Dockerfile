FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN echo "⬇️ FILES IN /app ⬇️" && ls -la

# Check if src exists and list its content
RUN echo "⬇️ FILES IN /app/src ⬇️" && ls -R src || echo "❌ CRITICAL: src folder is missing!"

# Check if the config file exists
RUN echo "⬇️ Checking config ⬇️" && cat tsconfig.app.json || echo "❌ tsconfig.app.json missing"
# ======================================================

RUN npm run build
CMD ["echo", "Done"]
