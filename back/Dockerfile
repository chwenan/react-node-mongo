FROM node:alpine

WORKDIR /app

# back 資料夾傳到容器裡
COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]