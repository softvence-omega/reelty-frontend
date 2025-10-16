# # ----------- Build stage -----------
# FROM node:20 AS build

# WORKDIR /app
# COPY package.json .

# RUN npm install 

# COPY . .





# EXPOSE 3000

# CMD ["npm", "run", "dev"]


# FROM node:22.18.0-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install
# RUN npm rebuild esbuild

# RUN npm i -g serve

# COPY . .

# RUN npm run build

# EXPOSE 3000
# CMD ["serve", "-s", "dist", "-l", "3000", "-n"]



FROM node:22.18.0-alpine


WORKDIR /app


COPY *.json ./
RUN npm install 


COPY . .

RUN npm run build
# RUN npm prune --production

EXPOSE 3000

# Serve the built app
CMD ["npx", "serve", "-s", "dist", "-l", "3000", "-n"]

