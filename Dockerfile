FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN corepack enable && yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn build

# ---- Production stage ----
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

# Clear default nginx static files
RUN rm -rf ./*

# Copy built app
COPY --from=builder /app/dist ./

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]