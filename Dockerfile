FROM node
WORKDIR /app
COPY package.json .
RUN npm install -g typescript && npm install
COPY . .
RUN tsc
CMD npm start
EXPOSE 8000