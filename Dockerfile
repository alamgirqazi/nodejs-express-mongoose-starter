FROM node:8
WORKDIR /
COPY package.json ./
RUN npm install
COPY . /app
EXPOSE 8081
CMD [ "npm", "start" ]
