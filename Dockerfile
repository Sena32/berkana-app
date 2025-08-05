# Etapa 1: build
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install --force && npm run build

# Etapa 2: execução
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app . 
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm", "start"]
