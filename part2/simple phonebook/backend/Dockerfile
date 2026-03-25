FROM node:20-alpine
WORKDIR /app

# Copy package manifest(s). using package*.json makes the build succeed
# even when package-lock.json is not present.
COPY package*.json ./

# Use npm install when lockfile may be absent; it installs deps and
# creates a lockfile when needed. --omit=dev keeps image smaller.
RUN npm install --omit=dev
COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
