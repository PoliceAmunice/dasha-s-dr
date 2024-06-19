# Development

1. Create `compose.override.yaml` with following content:
```
services:
  web:
    build:
      dockerfile: ./docker/Dockerfile.dev
    ports:
      - 5173:5173
```
2. Run `docker compose up -d`. App will be available at `localhost:5173`.
