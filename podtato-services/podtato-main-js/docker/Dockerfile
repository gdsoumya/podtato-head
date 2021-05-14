FROM node:12-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ARG VERSION
ENV VERSION=${VERSION}
# Export necessary port
EXPOSE 9000

# Command to run when starting the container
CMD [ "node", "index.js" ]
