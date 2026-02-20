# Install Maven Locally
$MavenUrl = "https://dlcdn.apache.org/maven/maven-3/3.9.12/binaries/apache-maven-3.9.12-bin.zip"
$InstallDir = "$env:LOCALAPPDATA\Maven"
$ZipPath = "$env:TEMP\maven.zip"

# Create directory
if (!(Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
}

# Download
Write-Host "Downloading Maven..."
Invoke-WebRequest -Uri $MavenUrl -OutFile $ZipPath

# Extract
Write-Host "Extracting Maven..."
Expand-Archive -Path $ZipPath -DestinationPath $InstallDir -Force

# Get extracted folder name
$ExtractedFolder = Get-ChildItem -Path $InstallDir | Select-Object -First 1
$MavenBinData = "$($ExtractedFolder.FullName)\bin"

# Add to PATH (User)
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($UserPath -notlike "*$MavenBinData*") {
    Write-Host "Adding to PATH: $MavenBinData"
    [Environment]::SetEnvironmentVariable("Path", "$UserPath;$MavenBinData", "User")
    Write-Host "PATH updated."
} else {
    Write-Host "Maven already in PATH."
}

# Clean get-variable
Remove-Item -Path $ZipPath -Force

Write-Host "Maven installed successfully to $MavenBinData"
Write-Host "Please restart your terminal to use 'mvn'."
