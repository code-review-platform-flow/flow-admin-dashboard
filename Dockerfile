# 기본 이미지 설정
FROM node:20-alpine AS base

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위한 레이어
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 소스 코드 빌드를 위한 레이어
FROM base AS builder
COPY . .

# 환경 변수를 ARG로 설정하여 빌드 시 사용
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_API_ENDPOINT

# 환경 변수를 ENV로 설정하여 런타임에 사용
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT

COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 프로덕션 이미지 설정
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일들과 필요한 파일들만 복사
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 애플리케이션이 실행될 포트 노출
EXPOSE 3000

# Next.js 애플리케이션 시작 명령어
CMD ["npm", "start"]
