#Stage 0
FROM node:12-slim as Builder

#Create app directory
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json  ./
RUN npm ci

#Bundle app source
COPY . .


#STAGE 1
FROM node:12-alpine
COPY --from=Builder /usr/src/app ./app
WORKDIR ./app

ENV PORT 80
ENV NODE_ENV 'production'

#Expose port
EXPOSE $PORT

RUN ["chmod", "+x", "/app/entrypoint.sh"]
CMD ["/app/entrypoint.sh"]
