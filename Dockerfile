#Stage 0
FROM node:12-alpine as Builder

#Create app directory
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json  ./
RUN apk add --no-cache make gcc g++ python && \
  npm install
RUN npm rebuild bcrypt --build-from-source
#Bundle app source
COPY . .


##STAGE 1
#FROM node:12-alphine
#COPY --from=Builder /usr/src/app ./app
#WORKDIR ./app

ENV PORT 80
ENV NODE_ENV "development"

#Expose port
EXPOSE $PORT

RUN ["chmod", "+x", "./entrypoint.sh"]
RUN ["chmod", "+x", "./wait-for.sh"]
CMD ["./entrypoint.sh"]
