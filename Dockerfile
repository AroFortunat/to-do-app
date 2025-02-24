FROM node:20

# Définir le répertoire de travail dans le conteneur

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm db:push

RUN pnpm build

CMD [ "pnpm","start" ]
