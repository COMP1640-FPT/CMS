# ---- base ----
FROM node:alpine as base

EXPOSE 3030

ENV NODE_PATH=/node_modules

ENV PATH=$PATH:/node_modules/.bin

WORKDIR /app

COPY ./package*.json ./

# ---- dependencies ----
FROM base as dependencies

RUN npm set progress=false && npm config set depth 0 \
    && npm install --only=production \
    && cp -R node_modules prod_node_modules 

# ---- Release ----
FROM base AS release

WORKDIR /app

COPY --from=dependencies app/prod_node_modules ./node_modules

COPY . .

#RUN npm run build

CMD ["npm", "start"]