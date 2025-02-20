# ceci est une configuration d'un serveur express js avec docker
#
#
# Utiliser l'image officielle de Node.js version 20
FROM node:20

# Définir le répertoire de travail dans le conteneur

RUN mkdir -p /home/to-do-app

# Copier le fichier package.json et package-lock.json
COPY . /home/to-do-app/

# Installer les dépendances
WORKDIR /home/to-do-app/

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

RUN pnpm install

RUN pnpm build

CMD [ "pnpm","start" ]
