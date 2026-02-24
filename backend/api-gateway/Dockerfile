# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Copy parent pom
COPY pom.xml .
# Copy service pom and source
COPY api-gateway/pom.xml api-gateway/
COPY api-gateway/src api-gateway/src
# Build the service
RUN mvn -f api-gateway/pom.xml clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/api-gateway/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
