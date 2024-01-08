FROM node:20
WORKDIR /usr/src/countries-api-nem
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 4000
CMD [ "npm","start" ]