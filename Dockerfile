FROM node:16.15.1

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
EXPOSE 27017

CMD ["npm", "start"]
