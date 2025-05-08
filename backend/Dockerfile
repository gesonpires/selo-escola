# Dockerfile na pasta backend
FROM node:18-alpine

WORKDIR /usr/src/app

# 1) Copia somente package.json e instala deps de runtime
COPY package*.json ./
RUN npm install --production

# 2) Copia o prisma schema e gera o client
COPY prisma ./prisma
RUN npx prisma generate

# 3) Copia o restante do código
COPY .env .env
COPY tsconfig.json ./
COPY src ./src

# 4) Instala ts-node (dev) para poder rodar TS direto
RUN npm install -D ts-node

# Entrypoint
CMD ["npx", "ts-node", "src/index.ts"]
