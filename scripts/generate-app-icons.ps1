# TravelTurkey App Icon Generator - Windows PowerShell Script

Write-Host "🇹🇷 TravelTurkey App Icon Generator" -ForegroundColor Red
Write-Host "======================================" -ForegroundColor Yellow

# Input SVG dosyası kontrol et
$inputSvg = "src\assets\logos\app-icon.svg"

if (-not (Test-Path $inputSvg)) {
    Write-Host "❌ Error: $inputSvg dosyası bulunamadı!" -ForegroundColor Red
    exit 1
}

Write-Host "📱 Android dizinleri oluşturuluyor..." -ForegroundColor Green

# Android dizinlerini oluştur
$androidDirs = @("mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi")
$androidSizesInfo = @{
    "mdpi" = "48x48"
    "hdpi" = "72x72"
    "xhdpi" = "96x96"
    "xxhdpi" = "144x144"
    "xxxhdpi" = "192x192"
}

foreach ($sizeDir in $androidDirs) {
    $dir = "android\app\src\main\res\mipmap-$sizeDir"
    
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    $sizeInfo = $androidSizesInfo[$sizeDir]
    Write-Host "✅ Oluşturuldu: $dir (gerekli boyut: $sizeInfo)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🍎 iOS dizini oluşturuluyor..." -ForegroundColor Green

# iOS dizinini oluştur
$iosDir = "ios\TravelTurkey\Images.xcassets\AppIcon.appiconset"
if (-not (Test-Path $iosDir)) {
    New-Item -ItemType Directory -Path $iosDir -Force | Out-Null
}
Write-Host "✅ Oluşturuldu: $iosDir" -ForegroundColor Cyan

# iOS Contents.json dosyası oluştur
$contentsJson = @'
{
  "images" : [
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "20x20",
      "filename" : "icon-20@2x.png"
    },
    {
      "idiom" : "iphone", 
      "scale" : "3x",
      "size" : "20x20",
      "filename" : "icon-20@3x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x", 
      "size" : "29x29",
      "filename" : "icon-29@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "29x29", 
      "filename" : "icon-29@3x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "40x40",
      "filename" : "icon-40@2x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "3x", 
      "size" : "40x40",
      "filename" : "icon-40@3x.png"
    },
    {
      "idiom" : "iphone",
      "scale" : "2x",
      "size" : "60x60",
      "filename" : "icon-60@2x.png" 
    },
    {
      "idiom" : "iphone",
      "scale" : "3x",
      "size" : "60x60",
      "filename" : "icon-60@3x.png"
    },
    {
      "idiom" : "ios-marketing",
      "scale" : "1x", 
      "size" : "1024x1024",
      "filename" : "icon-1024.png"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
'@

$contentsJson | Out-File -FilePath "$iosDir\Contents.json" -Encoding UTF8
Write-Host "✅ Contents.json oluşturuldu" -ForegroundColor Cyan

Write-Host ""
Write-Host "🎉 Dizinler başarıyla oluşturuldu!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Sonraki adımlar:" -ForegroundColor Yellow
Write-Host "1. app-icon.svg dosyanızı online converter ile PNG'ye çevirin" -ForegroundColor White
Write-Host "2. https://appicon.co adresini kullanın (ücretsiz)" -ForegroundColor White
Write-Host "3. 1024x1024 boyutunda PNG yükleyin" -ForegroundColor White
Write-Host "4. Tüm boyutları indirin ve ilgili klasörlere kopyalayın" -ForegroundColor White
Write-Host ""
Write-Host "� Android boyutları:" -ForegroundColor Magenta
Write-Host "   • mdpi: 48x48px" -ForegroundColor White
Write-Host "   • hdpi: 72x72px" -ForegroundColor White  
Write-Host "   • xhdpi: 96x96px" -ForegroundColor White
Write-Host "   • xxhdpi: 144x144px" -ForegroundColor White
Write-Host "   • xxxhdpi: 192x192px" -ForegroundColor White
Write-Host ""
Write-Host "🍎 iOS boyutları:" -ForegroundColor Magenta
Write-Host "   • icon-20@2x.png: 40x40px" -ForegroundColor White
Write-Host "   • icon-20@3x.png: 60x60px" -ForegroundColor White
Write-Host "   • icon-29@2x.png: 58x58px" -ForegroundColor White
Write-Host "   • icon-29@3x.png: 87x87px" -ForegroundColor White
Write-Host "   • icon-40@2x.png: 80x80px" -ForegroundColor White
Write-Host "   • icon-40@3x.png: 120x120px" -ForegroundColor White
Write-Host "   • icon-60@2x.png: 120x120px" -ForegroundColor White
Write-Host "   • icon-60@3x.png: 180x180px" -ForegroundColor White
Write-Host "   • icon-1024.png: 1024x1024px" -ForegroundColor White
