# use node 18 alpine image
FROM node:18-alpine

# create work directory in app folder
WORKDIR /app

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY package.json /app/
# COPY package-lock.json /app/ # uncomment if using npm
COPY yarn.lock /app/

# install all depencies
RUN yarn install --frozen-lockfile --production

# copy over all files to the work directory
ADD . /app

# build the project
RUN yarn build

# define the host and port for the server
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# expose the host and port 3000 to the server
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]