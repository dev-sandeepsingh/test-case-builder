### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:12.0.0 as builder

#Cleanup
RUN npm cache clean --force
#RUN rmdir node_modules /s /q
RUN npm install -g typescript


COPY package.json  ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build.
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Checking node version and that it can be accessed irectly
RUN node --version

## ng Version check
RUN $(npm bin)/ng --version

##RUN npm rebuild node-sass --force

## Build the angular app in production mode and store t he artifacts in dist folder
##RUN node --max-old-space-size=8192 $(npm bin)/ng build --prod --aot --build-optimizer --no-progress
##RUN REM call npm install -g @angular/cli
RUN $(npm bin)/ng build --prod 


### STAGE 2: Setup ###

# base image
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
