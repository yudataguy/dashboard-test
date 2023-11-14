# Use the official Nginx image as a base
FROM nginx:latest

# Copy the 'dist' folder contents to the default Nginx public folder
COPY ./build /usr/share/nginx/html

# Copy the custom nginx.conf to the container
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
