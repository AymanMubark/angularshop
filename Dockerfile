#stage 1
FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install --legacy-peer-deps
RUN npm run build
#stage 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/angularshop /usr/share/nginx/html
EXPOSE 4200
