FROM node:20-alpine

RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache openssl

WORKDIR /DEPLOY-SERVICE

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run" ,"start:debug"]