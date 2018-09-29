FROM node:carbon AS base
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json .


FROM base as dependencies
ENV NODE_ENV=production
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install



## ---- Test ----
## run linters, setup and tests
#FROM dependencies AS test
#COPY . .
#RUN  npm run lint && npm run setup && npm run test


# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /usr/src/app/prod_node_modules ./node_modules
# copy app sources
COPY . .


EXPOSE 8080
CMD [ "yarn", "serve" ]
