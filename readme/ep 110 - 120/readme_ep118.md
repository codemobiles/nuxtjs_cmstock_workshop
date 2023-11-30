# Nuxt 3 CMS Stock Course EP.118 - Workshop - Docker - Docker Compose

## Outcome

-   [x] Introduce Docker Compose
-   [x] Know when/why/how to use Docker Compose
-   [x] Write Docker Compose
-   [x] Build Docker Compose

## Documentation for this episode

-   [Docker Compose](https://docs.docker.com/compose/)

## Setup

1. Create `docker-compose.yml` in `~/`

```yml
# ~/docker-compose.yml

version: "3.1"

services:
    nuxt_cmstock_app1:
        image: codemobiles/nuxt_cmstock
        build:
            context: .
            dockerfile: Dockerfile
        container_name: nuxt_cmstock_app1
        restart: always
        ports:
            - 3000:3000
    nuxt_cmstock_app2:
        image: codemobiles/nuxt_cmstock
        build:
            context: .
            dockerfile: Dockerfile
        container_name: nuxt_cmstock_app2
        restart: always
        ports:
            - 3001:3000
```

2. Run `docker-compose up -d` to build and run the docker compose

```bash
docker-compose up -d
```

3. Run `docker-compose ps` to verify the docker compose

```bash
docker-compose ps
```

4. Run `docker-compose logs -f` to view the logs

```bash
docker-compose logs -f
```
