P
# **Step 1: Dockerfile**

Make sure you already have a `Dockerfile` like this:

file:
# Use official Nginx image
FROM nginx:alpine

# Copy website files to Nginx default folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

✅ This ensures your website is served via Nginx.

---

**Step 2: GitHub Actions Workflow**

Create `.github/workflows/docker-ci.yml`:

```yaml
name: CI/CD Docker Pipeline

# Trigger pipeline on push or pull request to main branch
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      # 1️⃣ Checkout code
      - name: Checkout code
        uses: actions/checkout@v3

      # 2️⃣ Set up Docker Buildx (multi-platform)
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # 3️⃣ Log in to DockerHub
      - name: Log in to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # 4️⃣ Build and push Docker image
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/ecommerce:latest
```

---

# **Step 3: GitHub Secrets**

Add the following **secrets** in your GitHub repository:

* `DOCKER_USERNAME` → Your Docker Hub username
* `DOCKER_PASSWORD` → Your Docker Hub password

This ensures GitHub Actions can **log in to Docker Hub** securely.

---

# **Step 4: How It Works**

1. **Push to main branch** → triggers GitHub Actions
2. **Checkout code** → gets your project files
3. **Set up Docker Buildx** → prepares Docker for build
4. **Login to Docker Hub** → authenticates your account
5. **Build Docker image** → creates `ecommerce:latest` image
6. **Push Docker image** → uploads it to your Docker Hub repository

---

# **Step 5: Deploying Docker Image (Optional)**

After pushing the Docker image, you can deploy it anywhere:

### **Locally**

docker pull your-dockerhub-sam040804/ecommerce:latest
docker run -p 8080:80 your-dockerhub-sam040804/ecommerce:latest


Then visit [http://localhost:8080](http://localhost:8080)

### **Cloud Deployment Options**

* **AWS ECS / Fargate**
* **Azure Container Instances**
* **Google Cloud Run**
* **DigitalOcean App Platform**

All of these can **pull the Docker image from Docker Hub** automatically.

---

# ✅ Summary

* CI/CD pipeline builds the Docker image on **every push**
* Pushes image to **Docker Hub automatically**
* Optional deployment to **cloud platforms** using the same image
* Fully automated **frontend ecommerce site deployment**


