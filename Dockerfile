FROM node:10-alpine

# Create app directory
WORKDIR /app

# Copy current directory in
COPY package*.json ./

# install everything
RUN npm install

COPY . .

ENV PORT 80
ENV VUE_APP_BACKEND_URL ""

RUN npm run build

EXPOSE 80

CMD ["node", "server.js"]



# production stage
# FROM nginx:1.13.12-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]