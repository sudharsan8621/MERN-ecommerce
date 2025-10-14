@echo off
echo Creating .gitignore files...

REM Create root .gitignore
(
echo # Dependencies
echo node_modules/
echo */node_modules/
echo.
echo # Environment
echo .env
echo .env.local
echo *.env
echo.
echo # Build
echo dist/
echo build/
echo.
echo # Logs
echo *.log
echo.
echo # IDE
echo .vscode/
echo .idea/
echo .DS_Store
) > .gitignore

REM Create backend .gitignore
(
echo node_modules/
echo .env
echo .env.local
echo *.log
echo .DS_Store
) > backend\.gitignore

REM Create frontend .gitignore  
(
echo node_modules/
echo dist/
echo .env
echo .env.local
echo .env.production
echo *.log
echo .DS_Store
) > frontend\.gitignore

echo .gitignore files created successfully!
echo.
echo Now run:
echo git add .
echo git commit -m "Add gitignore files"
echo git push
pause