FROM node:lts-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g http-server

# copy configs to /app folder
COPY package*.json ./
COPY babel*.js ./
COPY tsconfig.json ./
COPY vue.config.js ./
COPY .eslintrc.js ./
COPY .husky ./

# copy source code to /app/src folder
COPY src /app/src
COPY public /app/public

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "http-server","dist"]
