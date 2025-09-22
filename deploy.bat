@echo off
echo ========================================
echo Suthar Indermal Suresh Kumar - Website Deployment
echo ========================================
echo.
echo This script will help you deploy your website to Netlify
echo.
echo Step 1: Install Netlify CLI
echo Installing Netlify CLI globally...
npm install -g netlify-cli
if %errorlevel% neq 0 (
    echo.
    echo ❌ Failed to install Netlify CLI
    echo Please install it manually by running: npm install -g netlify-cli
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Netlify CLI installed successfully!
echo.
echo Step 2: Login to Netlify
echo Opening Netlify login...
netlify login

echo.
echo Step 3: Deploy website
echo Deploying your website...
cd /d %~dp0
netlify deploy --prod --dir=.

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your website should now be live on Netlify!
echo.
echo If you encounter any issues:
echo 1. Make sure you're logged in to Netlify
echo 2. Check that all files are in the correct directory
echo 3. Try running: netlify deploy --prod --dir=.
echo.
pause
