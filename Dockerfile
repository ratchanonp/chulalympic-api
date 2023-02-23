# Install dependencies
FROM node:alpine AS builder

RUN npm install -g pnpm
RUN npm install -g @nestjs/cli 

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate
RUN pnpm run build


FROM node:alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]





