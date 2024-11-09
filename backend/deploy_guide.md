# Deploy documentation
As per the deploy, AWS cloud was choosen as a hosting platform for the Spring Boot 3 backend

## Operations

### EC2
An [EC2]() micro instance was setup, with all what was needed to run the application:
Docker, the docker compose file and the secrets, along with every IAM role needed
to make our instance able to communicate with the container registry.
Secrets were managed through Docker Swarm. We also used Swarm to make a possibly 
more robust architecture, that can eventually scale on multiple nodes.

### ECR
The EC2 instance pulls Docker images from the Elastic Container Registry. The images are
pushed manually from local (unfortunately we had no time to develop a solid pipeline, and it
was probably out of scope)

### Run locally
You can run the backend locally, by running

   ```bash
    mvn clean install
   ```

If you setup proper environment variables like datasource password.
    
The only things you need to do is compiling your project, building the image and pushing
it up to AWS ECR. The image will substitute the old one. 
    
    docker build -t image
    docker tag myapp:latest 774305610150.dkr.ecr.eu-central-1.amazonaws.com/medgo:latest
    docker tag myapp:latest 774305610150.dkr.ecr.eu-central-1.amazonaws.com/medgo:latest

On the aws instance, run
```bash
    sudo docker pull 774305610150.dkr.ecr.eu-central-1.amazonaws.com/medgo:latest
    sudo docker stack deploy -c docker-compose.yml medgo
```
   

