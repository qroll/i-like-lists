# Build stage
FROM node:12.20.1-alpine3.12 AS builder

WORKDIR /dist

COPY tsconfig.json .
COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY components ./components
COPY features ./features
COPY lib ./lib
COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY utils ./utils

RUN npm run build

# Prod image
FROM node:12.20.1-alpine3.12

WORKDIR /dist

COPY package-lock.json .
COPY package.json .

RUN npm ci --production

COPY --from=builder  /dist/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "start"]