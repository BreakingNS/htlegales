<#
Generate an optimized OG image from `assets/htlegales.png` and write to `assets/og-image.jpg`.
Requirements: ImageMagick (magick) installed and available in PATH.
Usage (PowerShell):
  .\generate-og-image.ps1
  .\generate-og-image.ps1 -Source "assets/htlegales.png" -Dest "assets/og-image.jpg" -Quality 85
#>
param(
    [string]$Source = "assets/htlegales.png",
    [string]$Dest = "assets/og-image.jpg",
    [int]$Width = 1200,
    [int]$Height = 630,
    [int]$Quality = 85,
    [string]$Bg = "#FFFFFF"
)

if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Error "ImageMagick 'magick' not found. Install ImageMagick and ensure 'magick' is in PATH."
    exit 1
}

# Ensure output directory exists
$destDir = Split-Path $Dest -Parent
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }

$resize = "${Width}x${Height}>"

# Create optimized JPG: strip metadata, resize without upscaling, center on canvas, set quality
magick `n    "$Source" `n    -strip `n    -resize $resize `n    -background "$Bg" `n    -gravity center `n    -extent ${Width}x${Height} `n    -quality $Quality `n    "$Dest"

if (Test-Path $Dest) {
    Write-Output "Generated: $Dest"
    Get-Item $Dest | Select-Object FullName, Length
} else {
    Write-Error "Failed to generate $Dest"
}
