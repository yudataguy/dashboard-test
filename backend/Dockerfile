# FILEPATH: /Users/samyu/Downloads/code/bunshoai/internal-dashboard/Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Setup AWS credentials
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80 8000

# Define environment variable
ENV NAME World

# Run main.py when the container launches
CMD ["python", "main.py"]
