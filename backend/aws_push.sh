mvn clean package
docker build -t myapp .
docker tag myapp:latest 774305610150.dkr.ecr.eu-central-1.amazonaws.com/medgo:v.1.0.0
docker push 774305610150.dkr.ecr.eu-central-1.amazonaws.com/medgo:v.1.0.0
