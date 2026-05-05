FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src ./src
COPY tsconfig.json nest-cli.json ./

# Build the application
RUN pnpm build

# Expose the port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main"]
