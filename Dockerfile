FROM node:14-alpine
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/INDEX-GG/kvik_destkop.git
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npx prisma generate
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000