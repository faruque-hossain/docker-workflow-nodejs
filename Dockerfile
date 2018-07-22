##############################################
# Developer: Nur Rony <pro.nmrony@gmail.com> #
# GitHub:  https://github.com/nmrony         #
# Twitter: https://twitter.com/nmrony        #
# Docker:  https://hub.docker.com/u/nmrony   #
##############################################

FROM node:8-alpine

# Meta informations.
LABEL maintainer="Nur Rony<pro.nmrony@gmail.com>"

# Build arguments
ARG NODE_ENV=production
ARG PORT=3000

# Set necessary environment variables.
ENV NODE_ENV=$NODE_ENV \
  PORT=$PORT \
  NPM_CONFIG_PREFIX=/home/node/.npm-global \
  PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH

# For handling Karnel signal properly.
RUN apk add --no-cache tini

# Non previlage mode for better security (this user comes with ffficial NodeJS image).
USER node

# Check every 30 seconds with 3 seconds timout with 3 retries to ensure this service returns HTTP 200.
HEALTHCHECK --interval=10s --start-period=5s --timeout=3s --retries=3 CMD node healthcheck.js

# Create necessary directories.
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Copy package.json, package-lock.json, yarn.lock and npm-shrinkwrap.json
COPY --chown=node:node ["package*.json","*.lock","npm-shrinkwrap.json*", "./"]

# Run npm install. Necessary to run before adding application code to leverage Docker cache
RUN npm install --silent && npm cache clean --force && mv node_modules ../ && printenv

# Copy compiled application files
COPY --chown=node:node ./dist .

# Expose specific port and other necessary ports for Debugging
EXPOSE $PORT 9229 9230

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "bin/www"]