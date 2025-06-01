FROM node:21-alpine AS build

WORKDIR ./app

COPY package* .
RUN npm install -f

COPY . .

EXPOSE 5173:5173

CMD ["npm", "run", "dev"]