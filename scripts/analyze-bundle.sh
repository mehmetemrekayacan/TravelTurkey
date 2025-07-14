#!/bin/bash

# TravelTurkey - Production Bundle Analysis Script
# Analyzes bundle size and performance for production builds

echo "🔍 TravelTurkey Bundle Analysis Starting..."

# Create analysis directory
mkdir -p analysis

# Generate Android bundle
echo "📱 Generating Android bundle..."
npx react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output analysis/android-bundle.js \
  --assets-dest analysis/assets/ \
  --sourcemap-output analysis/android-bundle.map

# Generate iOS bundle
echo "🍎 Generating iOS bundle..."
npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output analysis/ios-bundle.js \
  --assets-dest analysis/assets/ \
  --sourcemap-output analysis/ios-bundle.map

# Analyze bundle sizes
echo "📊 Analyzing bundle sizes..."

ANDROID_SIZE=$(wc -c < analysis/android-bundle.js)
IOS_SIZE=$(wc -c < analysis/ios-bundle.js)

ANDROID_SIZE_MB=$(echo "scale=2; $ANDROID_SIZE / 1048576" | bc)
IOS_SIZE_MB=$(echo "scale=2; $IOS_SIZE / 1048576" | bc)

echo ""
echo "📱 Android Bundle: ${ANDROID_SIZE_MB}MB (${ANDROID_SIZE} bytes)"
echo "🍎 iOS Bundle: ${IOS_SIZE_MB}MB (${IOS_SIZE} bytes)"

# Performance recommendations
echo ""
echo "💡 Performance Recommendations:"

if (( $(echo "$ANDROID_SIZE > 2097152" | bc -l) )); then
  echo "❌ Android bundle too large (>2MB). Consider:"
  echo "   - Code splitting"
  echo "   - Remove unused dependencies"
  echo "   - Enable Hermes engine"
else
  echo "✅ Android bundle size optimal"
fi

if (( $(echo "$IOS_SIZE > 2097152" | bc -l) )); then
  echo "❌ iOS bundle too large (>2MB). Consider:"
  echo "   - Code splitting"
  echo "   - Remove unused dependencies"
else
  echo "✅ iOS bundle size optimal"
fi

# Asset analysis
echo ""
echo "🖼️ Asset Analysis:"
ASSETS_SIZE=$(du -sh analysis/assets/ | cut -f1)
echo "Total assets: $ASSETS_SIZE"

# Find largest assets
echo "Largest assets:"
find analysis/assets/ -type f -exec du -h {} \; | sort -rh | head -5

# Generate performance report
cat > analysis/performance-report.md << EOF
# TravelTurkey Bundle Analysis Report

Generated: $(date)

## Bundle Sizes
- **Android**: ${ANDROID_SIZE_MB}MB
- **iOS**: ${IOS_SIZE_MB}MB
- **Assets**: $ASSETS_SIZE

## Performance Metrics
- Target bundle size: <2MB
- Android status: $(if (( $(echo "$ANDROID_SIZE <= 2097152" | bc -l) )); then echo "✅ PASS"; else echo "❌ FAIL"; fi)
- iOS status: $(if (( $(echo "$IOS_SIZE <= 2097152" | bc -l) )); then echo "✅ PASS"; else echo "❌ FAIL"; fi)

## Recommendations
$(if (( $(echo "$ANDROID_SIZE > 2097152" | bc -l) )); then 
  echo "### Android Optimization"
  echo "- Enable code splitting"
  echo "- Remove unused dependencies"
  echo "- Enable Hermes engine"
  echo "- Optimize images (WebP/AVIF)"
fi)

$(if (( $(echo "$IOS_SIZE > 2097152" | bc -l) )); then 
  echo "### iOS Optimization"
  echo "- Enable code splitting"
  echo "- Remove unused dependencies"
  echo "- Optimize images"
fi)

## Next Steps
1. Review dependency usage with \`npm-bundle-analyzer\`
2. Implement lazy loading for screens
3. Optimize image assets
4. Consider using Flipper for runtime analysis
EOF

echo ""
echo "📝 Full report saved to: analysis/performance-report.md"
echo "🔍 Bundle analysis complete!"

# Optional: Open bundle analyzer if available
if command -v npx &> /dev/null; then
  echo ""
  echo "💡 Run 'npx @next/bundle-analyzer' for detailed analysis"
fi
