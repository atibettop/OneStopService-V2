param(
 [string]$DatabasePath = (Join-Path $env:LOCALAPPDATA 'OneStopService/leads.sqlite3'),
 [string]$PythonPath = 'python',
 [int]$Port = 8091
)
$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$privateDatabase = [IO.Path]::GetFullPath($DatabasePath)
if ($privateDatabase.StartsWith($siteRoot + [IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'The database must be outside the website directory.' }
if (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue) { throw "Port $Port is already in use. Check the existing service before starting another." }
$env:LEAD_DB_PATH = $privateDatabase
$env:LEAD_PORT = [string]$Port
$env:LEAD_ALLOWED_ORIGINS = 'http://127.0.0.1:8090,http://localhost:8090'
$process = Start-Process -FilePath $PythonPath -ArgumentList 'server/lead_api.py' -WorkingDirectory $siteRoot -WindowStyle Hidden -PassThru
Write-Output "Local receiver started (PID $($process.Id)); database: $privateDatabase"
