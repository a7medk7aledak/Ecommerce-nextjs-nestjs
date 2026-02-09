@echo off
REM Script to setup the project for the first time on Windows
REM Usage: setup.bat

echo Starting E-commerce Project Setup...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Warning: PostgreSQL is not installed or not in PATH.
    echo Please install PostgreSQL 15+ before continuing.
    pause
)

REM Setup Server
echo Setting up Server (NestJS)...
cd server

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Warning: Please update .env file with your configuration!
)

echo Installing server dependencies...
call npm install

cd ..

REM Setup Client
echo.
echo Setting up Client (Next.js)...
cd client

if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Warning: Please update .env file with your configuration!
)

echo Installing client dependencies...
call npm install

cd ..

echo.
echo Setup completed successfully!
echo.
echo Next steps:
echo 1. Update .env files in both client and server directories
echo 2. Create PostgreSQL database: createdb ecommerce_db
echo 3. Start the server: cd server ^&^& npm run dev
echo 4. Start the client: cd client ^&^& npm run dev
echo.
echo For detailed instructions, see SETUP.md
echo.
echo Happy coding!
pause
