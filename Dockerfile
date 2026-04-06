# FRONTEND
FROM node:25.0.0-alpine AS frontend-builder
ARG BACKEND_PORT
ENV VITE_BACKEND_PORT=$BACKEND_PORT
WORKDIR /frontend

COPY frontend/vue-project/package*.json ./
RUN npm ci

COPY frontend/vue-project/ ./
RUN npm run build
