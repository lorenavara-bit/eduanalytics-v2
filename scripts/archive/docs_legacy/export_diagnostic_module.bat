@echo off
set "DEST_DIR=diagnostic_module"

:: Create the destination directory
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"
if not exist "%DEST_DIR%\src" mkdir "%DEST_DIR%\src"
if not exist "%DEST_DIR%\src\components\games" mkdir "%DEST_DIR%\src\components\games"
if not exist "%DEST_DIR%\src\services" mkdir "%DEST_DIR%\src\services"
if not exist "%DEST_DIR%\src\utils" mkdir "%DEST_DIR%\src\utils"
if not exist "%DEST_DIR%\src\__tests__" mkdir "%DEST_DIR%\src\__tests__"

:: Copy Game Components
copy "src\components\games\*.jsx" "%DEST_DIR%\src\components\games\"
copy "src\components\EarlyDetection*.jsx" "%DEST_DIR%\src\components\"

:: Copy Services and Utils
copy "src\services\riskCalculator.js" "%DEST_DIR%\src\services\"
copy "src\utils\gemini.js" "%DEST_DIR%\src\utils\"
copy "src\utils\env.js" "%DEST_DIR%\src\utils\"
copy "src\utils\appEnv.js" "%DEST_DIR%\src\utils\"

:: Copy Tests
copy "src\__tests__\riskCalculator.test.js" "%DEST_DIR%\src\__tests__\"
copy "src\__tests__\realGames.test.js" "%DEST_DIR%\src\__tests__\"

:: Create a README
echo # Diagnostic Module Export > "%DEST_DIR%\README.md"
echo. >> "%DEST_DIR%\README.md"
echo This folder contains the extracted components for the specific Diagnostic/Early Detection module. >> "%DEST_DIR%\README.md"
echo. >> "%DEST_DIR%\README.md"
echo ## Contents: >> "%DEST_DIR%\README.md"
echo - src/components/games/: All game components (VARK, Concept Comprehension, placeholders). >> "%DEST_DIR%\README.md"
echo - src/components/EarlyDetection*: The main dashboard components for testing. >> "%DEST_DIR%\README.md"
echo - src/services/riskCalculator.js: Logic for calculating risk based on game results. >> "%DEST_DIR%\README.md"
echo - src/utils/gemini.js: AI integration helper. >> "%DEST_DIR%\README.md"
echo. >> "%DEST_DIR%\README.md"
echo ## How to use: >> "%DEST_DIR%\README.md"
echo Copy these files into the corresponding directories of your new web application. Ensure you have the necessary dependencies installed (React, Lucide, Recharts). >> "%DEST_DIR%\README.md"

echo "Export complete. Files are in 'diagnostic_module' folder."
pause
