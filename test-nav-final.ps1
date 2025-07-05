# TravelTurkey Navigation Test Runner - Final Version
param([string]$TestType = "basic")

Write-Host "🧪 TravelTurkey Navigation Tests" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

$results = @()

# Test Node.js
$nodeExists = Get-Command node -ErrorAction SilentlyContinue
if ($nodeExists) {
    Write-Host "✅ Node.js: $(node --version)" -ForegroundColor Green
    $results += $true
} else {
    Write-Host "❌ Node.js: Not found" -ForegroundColor Red
    $results += $false
}

# Test Dependencies
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies: Installed" -ForegroundColor Green
    $results += $true
} else {
    Write-Host "❌ Dependencies: Missing" -ForegroundColor Red
    $results += $false
}

# Test Structure
$files = @(
    "src/navigation/BottomTabNavigator.tsx",
    "src/types/navigation.ts",
    "src/screens/HomeScreen.tsx",
    "src/components/debug/NavigationDebugTools.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ File: $file" -ForegroundColor Green
        $results += $true
    } else {
        Write-Host "❌ File: $file" -ForegroundColor Red
        $results += $false
    }
}

# Test TypeScript
if ($TestType -eq "all" -or $TestType -eq "typescript") {
    try {
        $tsOutput = npx tsc --noEmit 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ TypeScript: No errors" -ForegroundColor Green
            $results += $true
        } else {
            Write-Host "❌ TypeScript: Errors found" -ForegroundColor Red
            $results += $false
        }
    } catch {
        Write-Host "❌ TypeScript: Check failed" -ForegroundColor Red
        $results += $false
    }
}

# Summary
$total = $results.Count
$passed = ($results | Where-Object { $_ }).Count
$failed = $total - $passed

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "Total: $total, Passed: $passed, Failed: $failed" -ForegroundColor White

if ($failed -eq 0) {
    Write-Host "🎉 All tests passed!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️ Some tests failed" -ForegroundColor Yellow
    exit 1
}
