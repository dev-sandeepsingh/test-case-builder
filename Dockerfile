# base image
FROM node:latest as node

# set working directory
WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=node /app/dist/test-case-builder usr/share/nginx/html

EXPOSE 8080
# Run the web service on container startup.
CMD ng serve --host 0.0.0.0
