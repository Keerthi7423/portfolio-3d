# 1. Base image with lightweight Node.js Alpine Linux
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /usr/src/app

# 3. Copy package files first (to leverage Docker layer caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port the Express server listens on
EXPOSE 5000

# 7. Start command
CMD ["npm", "run", "dev"]
