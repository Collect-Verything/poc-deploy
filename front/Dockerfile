# --- Build (CRA) ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
# CRA produit /app/build
RUN npm run build

# --- Serve (Nginx) ---
FROM nginx:alpine
# Contenu statique
COPY --from=builder /app/build /usr/share/nginx/html
# Conf Nginx (SPA)
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
