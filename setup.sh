#!/bin/bash

# Script to setup the project for the first time
# Usage: ./setup.sh

set -e

echo "🚀 Starting E-commerce Project Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed or not in PATH."
    echo "   Please install PostgreSQL 15+ before continuing."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Setup Server
echo "📦 Setting up Server (NestJS)..."
cd server

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration!"
fi

echo "Installing server dependencies..."
npm install

cd ..

# Setup Client
echo ""
echo "📦 Setting up Client (Next.js)..."
cd client

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration!"
fi

echo "Installing client dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Update .env files in both client and server directories"
echo "2. Create PostgreSQL database: createdb ecommerce_db"
echo "3. Start the server: cd server && npm run dev"
echo "4. Start the client: cd client && npm run dev"
echo ""
echo "📚 For detailed instructions, see SETUP.md"
echo ""
echo "Happy coding! 🎉"
