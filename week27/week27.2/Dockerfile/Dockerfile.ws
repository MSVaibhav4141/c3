FROM oven/bun:1

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./bun.lock ./bun.lock

COPY ./turbo.json ./turbo.json

COPY ./apps/ws/package.json ./apps/ws/package.json

RUN bun install 

COPY ./apps/ws ./apps/ws

RUN bun run db:generate

EXPOSE 8081 

CMD [ "bun", "run", "start:ws"]