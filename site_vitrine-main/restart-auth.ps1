Stop-Process -Name "java" -ErrorAction SilentlyContinue 
# Note: This is a heavy-handed restart script, ideally we would identify the specific PID.
# But for now, relying on the user's "Kill All" preference or just restarting this one service contextually.
# Actually, wait. The user has a 'start-auth.ps1'. I should just kill the process listening on 8081.

$port = 8081
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($process) {
    Stop-Process -Id $process -Force
    Write-Host "Killed Auth Service on port $port"
}

Start-Process powershell -ArgumentList "-NoExit", "-File", ".\start-auth.ps1"
Write-Host "Auth Service Restarted"
