# Alina Zelinska Portfolio - Docker Deployment Guide

## 🐳 Docker Setup

This project includes Docker configuration for easy deployment and development.

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Quick Start

#### 1. Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

#### 2. Using Docker Only

```bash
# Build the image
docker build -t alina-portfolio .

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  -p 8001:8001 \
  -e MONGO_URL=your_mongodb_url \
  -e DB_NAME=alina_db \
  --name alina-webapp \
  alina-portfolio
```

### 🔧 Configuration

#### Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Key variables:
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `CORS_ORIGINS` - Allowed origins (comma-separated)
- `NODE_ENV` - Environment (production/development)

#### Ports

- **3000** - Frontend (React app)
- **8001** - Backend API (FastAPI)
- **27017** - MongoDB (only in docker-compose)

### 📦 Services

#### docker-compose.yml includes:

1. **webapp** - React frontend + FastAPI backend
2. **mongodb** - MongoDB database

### 🚀 Deployment Options

#### Production Deployment

```bash
# Build for production
docker-compose -f docker-compose.yml up -d --build

# Check health
docker-compose ps
docker-compose logs webapp
```

#### Development with Hot Reload

For development, use the existing setup with supervisor (outside Docker) for hot reload.

### 🔍 Monitoring & Debugging

#### Check Service Status
```bash
docker-compose ps
```

#### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f webapp
docker-compose logs -f mongodb
```

#### Execute Commands in Container
```bash
# Access webapp shell
docker-compose exec webapp /bin/bash

# Check backend
docker-compose exec webapp curl http://localhost:8001/api/

# Access MongoDB
docker-compose exec mongodb mongosh -u admin -p adminpassword
```

#### Health Checks
```bash
# Check webapp health
curl http://localhost:8001/api/

# Check frontend
curl http://localhost:3000
```

### 🛠️ Maintenance

#### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build
```

#### Backup MongoDB
```bash
# Create backup
docker-compose exec mongodb mongodump -u admin -p adminpassword --authenticationDatabase admin -o /backup

# Copy backup from container
docker cp alina-mongodb:/backup ./mongodb-backup
```

#### Restore MongoDB
```bash
# Copy backup to container
docker cp ./mongodb-backup alina-mongodb:/backup

# Restore
docker-compose exec mongodb mongorestore -u admin -p adminpassword --authenticationDatabase admin /backup
```

#### Clean Up
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (⚠️ deletes data)
docker-compose down -v

# Remove unused images
docker image prune -a
```

### 🔐 Security Best Practices

1. **Change default passwords** in `.env`
2. **Use secrets management** for production (e.g., Docker Swarm secrets)
3. **Enable HTTPS** with reverse proxy (nginx/traefik)
4. **Limit exposed ports** in production
5. **Regular updates** of base images
6. **Scan for vulnerabilities**:
   ```bash
   docker scan alina-portfolio
   ```

### 📊 Performance Optimization

#### Multi-stage Build Benefits
- Smaller final image size
- Frontend built separately
- Production dependencies only
- Cached layers for faster rebuilds

#### Resource Limits
Add to `docker-compose.yml`:
```yaml
services:
  webapp:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### 🌐 Reverse Proxy Setup (Nginx)

Example nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 🐛 Troubleshooting

#### Container won't start
```bash
# Check logs
docker-compose logs webapp

# Verify environment variables
docker-compose config
```

#### MongoDB connection issues
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Test connection
docker-compose exec mongodb mongosh -u admin -p adminpassword
```

#### Port conflicts
```bash
# Check what's using the port
lsof -i :3000
lsof -i :8001

# Change ports in docker-compose.yml
```

#### Build failures
```bash
# Clean build
docker-compose build --no-cache

# Check Dockerfile syntax
docker build --progress=plain .
```

### 📝 Notes

- Frontend is pre-built during Docker build for optimal performance
- Backend runs with uvicorn for production
- MongoDB data persists in Docker volumes
- Supervisor manages both frontend and backend processes
- Health checks ensure services are running properly

### 🆘 Support

For issues specific to Docker deployment, check:
1. Container logs: `docker-compose logs -f`
2. Service status: `docker-compose ps`
3. Environment config: `docker-compose config`

---

Built with ❤️ by Alina Zelinska
