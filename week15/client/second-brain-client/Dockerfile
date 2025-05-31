FROM node:18-alpine

WORKDIR ./app

COPY package* .
RUN npm install -f

COPY . .

EXPOSE 5173:5173

CMD ["npm", "run", "dev"]