FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/backend
#/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]