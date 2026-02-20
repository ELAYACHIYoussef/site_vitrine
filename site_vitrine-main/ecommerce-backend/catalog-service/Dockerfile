# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Copy parent pom
COPY pom.xml .
# Copy service pom and source
COPY catalog-service/pom.xml catalog-service/
COPY catalog-service/src catalog-service/src
# Build the service
RUN mvn -f catalog-service/pom.xml clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/catalog-service/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
