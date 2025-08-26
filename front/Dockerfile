FROM node:18-alpine
WORKDIR /front
COPY package*.json ./
RUN npm install
RUN #npm ci || npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
