FROM node:24.22-alpine AS build

WORKDIR /app
COPY apps/site/package.json apps/site/.npmrc apps/site/yarn.lock ./apps/site/
WORKDIR /app/apps/site

ARG APP_ENV=production
ARG VITE_SITE_URL
ARG VITE_MAIN_APP_URL
ARG VITE_API_URL
ARG VITE_API_MOCK
ARG VITE_COOKIE_DOMAIN
ARG VITE_YM_COUNTER_ID

ENV APP_ENV=$APP_ENV \
  MY_INTERVIEW_SOURCE=0 \
  VITE_SITE_URL=$VITE_SITE_URL \
  VITE_MAIN_APP_URL=$VITE_MAIN_APP_URL \
  VITE_API_URL=$VITE_API_URL \
  VITE_API_MOCK=$VITE_API_MOCK \
  VITE_COOKIE_DOMAIN=$VITE_COOKIE_DOMAIN \
  VITE_YM_COUNTER_ID=$VITE_YM_COUNTER_ID

# NPM_TOKEN нужен и на build: yarn читает .npmrc при любом запуске, а секрет живёт только в своём RUN
RUN --mount=type=secret,id=npm_token \
  NPM_TOKEN="$(cat /run/secrets/npm_token)" \
  yarn install --frozen-lockfile --ignore-scripts

COPY apps/site ./
COPY vite.shared.ts /app/vite.shared.ts
COPY tsconfig.base.json tsconfig.node.base.json /app/
RUN --mount=type=secret,id=npm_token \
  NPM_TOKEN="$(cat /run/secrets/npm_token)" \
  && if [ "$APP_ENV" = "test" ]; then yarn build:test; else yarn build; fi

FROM nginx:alpine
COPY apps/site/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/site/build /usr/share/nginx/html
