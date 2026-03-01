# ---- Base Image ----
# Using official Nginx Alpine image - lightweight and secure
FROM nginx:alpine

# ---- Metadata ----
LABEL maintainer="thari"
LABEL description="SAM Assignment 1 - Static Website"

# ---- Security ----
# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# ---- Working Directory ----
WORKDIR /usr/share/nginx/html

# ---- Copy Files ----
# Copy static website files from src/ into the container
COPY src/ /usr/share/nginx/html/

# ---- Port ----
# Expose port 80 for HTTP traffic
EXPOSE 80

# ---- Start Server ----
# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]