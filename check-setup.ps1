# Setup Check Script for Digital Well-Being Project
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "Digital Well-Being Setup Checker" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python
Write-Host "[1/6] Checking Python..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "  [OK] Python found: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Python not found!" -ForegroundColor Red
    $allGood = $false
}

# Check Node.js
Write-Host "[2/6] Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "  [OK] Node.js found: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Node.js not found!" -ForegroundColor Red
    $allGood = $false
}

# Check npm
Write-Host "[3/6] Checking npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "  [OK] npm found: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] npm not found!" -ForegroundColor Red
    $allGood = $false
}

# Check backend structure
Write-Host "[4/6] Checking backend structure..." -ForegroundColor Yellow
if (Test-Path ".\backend\app\main.py") {
    Write-Host "  [OK] Backend files found" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Backend files missing!" -ForegroundColor Red
    $allGood = $false
}

# Check ML models (CRITICAL)
Write-Host "[5/6] Checking ML models..." -ForegroundColor Yellow
$modelsDir = ".\backend\app\models"
$requiredModels = @("knn_model.pkl", "scaler.pkl", "feature_columns.pkl")
$missingModels = @()

foreach ($model in $requiredModels) {
    $modelPath = Join-Path $modelsDir $model
    if (Test-Path $modelPath) {
        Write-Host "  [OK] Found: $model" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $model" -ForegroundColor Red
        $missingModels += $model
        $allGood = $false
    }
}

# Check frontend structure
Write-Host "[6/6] Checking frontend structure..." -ForegroundColor Yellow
if (Test-Path ".\frontend\package.json") {
    Write-Host "  [OK] Frontend files found" -ForegroundColor Green
    
    # Check node_modules
    if (Test-Path ".\frontend\node_modules") {
        Write-Host "  [OK] Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] Dependencies not installed" -ForegroundColor Yellow
        Write-Host "        Run: cd frontend; npm install" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [FAIL] Frontend files missing!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "[SUCCESS] ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You're ready to start!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Terminal 1: cd backend; venv\Scripts\activate; python -m uvicorn app.main:app --reload" -ForegroundColor White
    Write-Host "2. Terminal 2: cd frontend; npm run dev" -ForegroundColor White
    Write-Host "3. Open: http://localhost:3000" -ForegroundColor White
} else {
    Write-Host "[FAIL] SOME CHECKS FAILED" -ForegroundColor Red
    Write-Host ""
    
    if ($missingModels.Count -gt 0) {
        Write-Host "[CRITICAL] Missing ML model files:" -ForegroundColor Red
        foreach ($model in $missingModels) {
            Write-Host "  - $model" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "You need to:" -ForegroundColor Yellow
        Write-Host "1. Train your ML model or use existing .pkl files" -ForegroundColor Yellow
        Write-Host "2. Copy the .pkl files to: backend\app\models\" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "See QUICK_START.md for details" -ForegroundColor Yellow
    }
}

Write-Host "=======================================" -ForegroundColor Cyan
