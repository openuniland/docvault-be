# Build stage
FROM node:16-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/.env.example /app/.env.example
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules /app/node_modules
CMD ["npm", "start"]
