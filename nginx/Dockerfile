# Use the official Nginx image as a base
FROM nginx:latest

# Install Certbot and cron
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx cron

# Copy the cron job file
COPY certbot-renew /etc/cron.d/certbot-renew

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/certbot-renew

# Apply cron job
RUN crontab /etc/cron.d/certbot-renew

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Copy the 'dist' folder contents to the default Nginx public folder
COPY ./build /usr/share/nginx/html

# Copy the custom nginx.conf to the container
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80 443

# Run the command on container startup
CMD cron && nginx -g 'daemon off;'
