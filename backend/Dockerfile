FROM openjdk:21-jdk-slim as builder
WORKDIR /app
COPY target/myapp-3.3.5.jar /app/myapp.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "myapp.jar"]