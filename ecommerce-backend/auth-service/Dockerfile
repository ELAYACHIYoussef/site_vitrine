# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Copy parent pom
COPY pom.xml .
# Copy service pom and source
COPY auth-service/pom.xml auth-service/
COPY auth-service/src auth-service/src
# Build the service
RUN mvn -f auth-service/pom.xml clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/auth-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
