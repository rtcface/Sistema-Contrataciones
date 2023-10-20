FROM node:18.18.2-bullseye

ADD . /backend
WORKDIR /backend

COPY ["package.json","./certs","./"]

RUN yarn install
COPY . .

#RUN npm run build

#CMD [ "node", "dist/main" ]

CMD [ "yarn", "start:dev" ]