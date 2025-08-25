FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd openssl

WORKDIR /deploy-service

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3001
CMD ["npm", "run", "start:debug"]
