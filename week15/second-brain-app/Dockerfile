FROM node:24-alpine AS build

WORKDIR /app

COPY package* .
RUN npm install 

COPY . .

RUN npm run build

FROM node:24-alpine AS prod

WORKDIR /app

COPY --from=build ./app/dist .
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "./index.js"]