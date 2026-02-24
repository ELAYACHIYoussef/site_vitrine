# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Copy parent pom
COPY pom.xml .
# Copy service pom and source
COPY discovery-service/pom.xml discovery-service/
COPY discovery-service/src discovery-service/src
# Build the service
RUN mvn -f discovery-service/pom.xml clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/discovery-service/target/*.jar app.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "app.jar"]
