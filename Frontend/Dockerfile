# base image
FROM node:20-alpine

# set working directory
WORKDIR /app

# install dependencies
COPY ./package.json ./package-lock.json* ./
RUN npm install

# copy the rest of the code
COPY . .

# expose port
EXPOSE 5173

# start vite dev server
CMD ["npm", "run", "dev"]
