FROM node:lts-alpine
COPY ./server /app/
COPY ./dist /app/dist
WORKDIR /app
RUN npm install
CMD ["node", "index.js"]