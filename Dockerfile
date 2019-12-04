# base image
FROM node:latest as node

# set working directory
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

EXPOSE 8080

COPY --from=node /app/dist/test-case-builder usr/share/nginx/html

# Run the web service on container startup.
CMD [ "ng", "serve" ]
