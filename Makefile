# Makefile for E-commerce Project
# Usage: make [target]

.PHONY: help install dev build start clean docker-dev docker-down

# Colors for output
GREEN=\033[0;32m
NC=\033[0m # No Color

help: ## Show this help message
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

install: ## Install all dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm install
	cd client && npm install
	cd server && npm install

install-client: ## Install client dependencies only
	@echo "$(GREEN)Installing client dependencies...$(NC)"
	cd client && npm install

install-server: ## Install server dependencies only
	@echo "$(GREEN)Installing server dependencies...$(NC)"
	cd server && npm install

dev: ## Start development servers (both client and server)
	@echo "$(GREEN)Starting development servers...$(NC)"
	npm run dev

dev-client: ## Start client in development mode
	@echo "$(GREEN)Starting client...$(NC)"
	cd client && npm run dev

dev-server: ## Start server in development mode
	@echo "$(GREEN)Starting server...$(NC)"
	cd server && npm run dev

build: ## Build for production
	@echo "$(GREEN)Building for production...$(NC)"
	cd client && npm run build
	cd server && npm run build

build-client: ## Build client for production
	@echo "$(GREEN)Building client...$(NC)"
	cd client && npm run build

build-server: ## Build server for production
	@echo "$(GREEN)Building server...$(NC)"
	cd server && npm run build

start: ## Start production servers
	@echo "$(GREEN)Starting production servers...$(NC)"
	npm run start

lint: ## Lint all code
	@echo "$(GREEN)Linting...$(NC)"
	cd client && npm run lint
	cd server && npm run lint

format: ## Format all code
	@echo "$(GREEN)Formatting code...$(NC)"
	cd client && npx prettier --write .
	cd server && npm run format

clean: ## Clean all dependencies and build files
	@echo "$(GREEN)Cleaning...$(NC)"
	rm -rf node_modules
	rm -rf client/node_modules client/.next
	rm -rf server/node_modules server/dist

docker-dev: ## Start Docker containers for development
	@echo "$(GREEN)Starting Docker development environment...$(NC)"
	docker-compose -f docker-compose.dev.yml up -d

docker-prod: ## Start Docker containers for production
	@echo "$(GREEN)Starting Docker production environment...$(NC)"
	docker-compose up -d

docker-down: ## Stop Docker containers
	@echo "$(GREEN)Stopping Docker containers...$(NC)"
	docker-compose down

docker-clean: ## Stop and remove all Docker containers and volumes
	@echo "$(GREEN)Cleaning Docker...$(NC)"
	docker-compose down -v

test: ## Run all tests
	@echo "$(GREEN)Running tests...$(NC)"
	cd server && npm run test

test-e2e: ## Run e2e tests
	@echo "$(GREEN)Running e2e tests...$(NC)"
	cd server && npm run test:e2e

setup: ## Initial project setup
	@echo "$(GREEN)Setting up project...$(NC)"
	@chmod +x setup.sh
	@./setup.sh
