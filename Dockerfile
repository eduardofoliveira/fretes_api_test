FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

# RUN npx knex migrate:latest --env production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
