# base image
FROM node:latest as node

# set working directory
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=node /app/dist/test-case-builder usr/share/nginx/html

# Run the web service on container startup.
# CMD ng serve --host 0.0.0.0
EXPOSE 8080
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'build' stage copy over the artifacts in dist folder to default nginx public folder

CMD ["nginx", "-g", "daemon off;"]
