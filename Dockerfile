# base image
FROM node:latest as node
# set working directory
WORKDIR /app

COPY . .

RUN npm install

# RUN npm install @angular/cli -g

# RUN ng -v

RUN ng build --prod

FROM nginx:alpine

COPY --from=node /app/dist/test-case-builder usr/share/nginx/html

CMD ng serve --host 0.0.0.0 --port $PORT
