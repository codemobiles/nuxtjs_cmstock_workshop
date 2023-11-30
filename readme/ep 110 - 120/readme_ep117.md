# Nuxt 3 CMS Stock Course EP.117 - Workshop - Docker - Dockerfile Workshop

## Outcome

-   [x] Introduce Dockerfile
-   [x] Know when/why/how to use Dockerfile
-   [x] Write Dockerfile
-   [x] Build Dockerfile

## Documentation for this episode

-   [Dockerfile](https://docs.docker.com/engine/reference/builder/)

## Setup

1. Create `Dockerfile` in `~/`

```dockerfile

# ~/Dockerfile

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
```

2. Build the docker image

```bash
docker build -t codemobiles/nuxt_cmstock .
```

3. Run the docker image

```bash
docker run -p 3000:3000 --name nuxt_cmstock codemobiles/nuxt_cmstock
```
