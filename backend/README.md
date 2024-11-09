## Steps to Build and Deploy MyApp

Follow these steps to get your project up and running.

1. **Clean the Project**  
   To remove any previously compiled files and ensure a fresh build, run the following Maven command:

   ```bash
   mvn clean

2. **Package the Project**  
   Next, package your application into a deployable format (typically a `.jar` or `.war` file). This will compile the code and package it for distribution:

   ```bash
   mvn package

3. **Build the Docker Image**  
   Now, you will build the Docker image for your application. This step packages the application inside a container image:

   ```bash
   docker build -t myapp .

4. **Create Docker Secret**  
   Your application needs a secret, the database password. Use the following command to create the secret for the database password

   ```bash
   echo "password" | docker secret create db-password

5. **Initialize Docker Swarm**  
   If Docker Swarm has not been initialized, you need to initialize it. This command starts a Docker Swarm cluster on your local machine:

   ```bash
   docker swarm init

6. **Deploy the Application Using Docker Stack**  
   Now that Docker Swarm is initialized, you can deploy the application stack using a `docker-compose.yml` file. This will create the necessary services and networks defined in the file:

   ```bash
   docker stack deploy -c docker-compose.yml myapp

7. **Check Database Logs**  
   If you want to monitor the database logs for your application, you can view them using the following command:

   ```bash
   docker service logs -f myapp_myapp

8. **Scale the Application Services**  
   If you want to scale your services, for example, increasing the number of replicas for a specific service, you can use the following command:

   ```bash
   docker service scale myapp_myapp=3
