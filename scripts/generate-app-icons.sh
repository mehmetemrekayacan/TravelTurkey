#!/bin/bash

# TravelTurkey App Icon Generator Script
# Bu script SVG app icon'unu tüm gerekli boyutlarda PNG'ye çevirir

echo "🇹🇷 TravelTurkey App Icon Generator"
echo "======================================"

# Android boyutları
declare -A android_sizes=(
    ["mdpi"]="48"
    ["hdpi"]="72"
    ["xhdpi"]="96"
    ["xxhdpi"]="144"
    ["xxxhdpi"]="192"
)

# iOS boyutları
declare -A ios_sizes=(
    ["20"]="20"
    ["20@2x"]="40"
    ["20@3x"]="60"
    ["29"]="29"
    ["29@2x"]="58"
    ["29@3x"]="87"
    ["40"]="40"
    ["40@2x"]="80"
    ["40@3x"]="120"
    ["60@2x"]="120"
    ["60@3x"]="180"
    ["1024"]="1024"
)

# Input SVG dosyası
INPUT_SVG="src/assets/logos/app-icon.svg"

if [ ! -f "$INPUT_SVG" ]; then
    echo "❌ Error: $INPUT_SVG dosyası bulunamadı!"
    exit 1
fi

echo "📱 Android icon'ları oluşturuluyor..."

# Android dizinlerini oluştur
for size_name in "${!android_sizes[@]}"; do
    size="${android_sizes[$size_name]}"
    dir="android/app/src/main/res/mipmap-$size_name"
    
    mkdir -p "$dir"
    
    # SVG'yi PNG'ye çevir (requires inkscape or rsvg-convert)
    if command -v rsvg-convert &> /dev/null; then
        rsvg-convert -w $size -h $size "$INPUT_SVG" > "$dir/ic_launcher.png"
        echo "✅ Created: $dir/ic_launcher.png (${size}x${size})"
    elif command -v inkscape &> /dev/null; then
        inkscape -w $size -h $size "$INPUT_SVG" --export-filename="$dir/ic_launcher.png"
        echo "✅ Created: $dir/ic_launcher.png (${size}x${size})"
    else
        echo "⚠️  Warning: rsvg-convert veya inkscape bulunamadı. Manuel olarak çevirmeniz gerekiyor."
    fi
done

echo ""
echo "🍎 iOS icon'ları oluşturuluyor..."

# iOS dizinini oluştur
ios_dir="ios/TravelTurkey/Images.xcassets/AppIcon.appiconset"
mkdir -p "$ios_dir"

# iOS icon'larını oluştur
for size_name in "${!ios_sizes[@]}"; do
    size="${ios_sizes[$size_name]}"
    filename="icon-$size_name.png"
    
    if command -v rsvg-convert &> /dev/null; then
        rsvg-convert -w $size -h $size "$INPUT_SVG" > "$ios_dir/$filename"
        echo "✅ Created: $ios_dir/$filename (${size}x${size})"
    elif command -v inkscape &> /dev/null; then
        inkscape -w $size -h $size "$INPUT_SVG" --export-filename="$ios_dir/$filename"
        echo "✅ Created: $ios_dir/$filename (${size}x${size})"
    fi
done

echo ""
echo "🎉 App icon'ları başarıyla oluşturuldu!"
echo ""
echo "📋 Sonraki adımlar:"
echo "1. Android: 'react-native run-android' ile test edin"
echo "2. iOS: Xcode'da Images.xcassets'i kontrol edin"  
echo "3. Gerçek cihazda test edin"
echo ""
echo "💡 Not: SVG'yi manuel olarak PNG'ye çevirmek isterseniz:"
echo "   Online converter: https://convertio.co/svg-png/"
echo "   Boyut: 1024x1024 (sonra diğer boyutları otomatik oluşturabilirsiniz)"
