# Use an official Nginx runtime as the base image
FROM nginx

# Copy the built Vue.js app into the Nginx web server's document root
COPY ./dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]