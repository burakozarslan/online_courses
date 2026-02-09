#!/bin/bash

# Production Database Seeding Script
# This script helps you seed the production database with secure credentials

set -e  # Exit on error

echo "🔒 Production Database Seeding"
echo "==============================="
echo ""

# Check if required commands exist
command -v npx >/dev/null 2>&1 || { echo "❌ npx is required but not installed. Install Node.js first."; exit 1; }

# Prompt for credentials
echo "⚠️  IMPORTANT: Use STRONG, UNIQUE credentials for production!"
echo ""

read -p "Enter production DATABASE_URL: " DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is required"
    exit 1
fi

read -p "Enter instructor email (e.g., admin@yourdomain.com): " SEED_INSTRUCTOR_EMAIL
if [ -z "$SEED_INSTRUCTOR_EMAIL" ]; then
    echo "❌ Instructor email is required"
    exit 1
fi

read -sp "Enter instructor password (will be hidden): " SEED_INSTRUCTOR_PASSWORD
echo ""
if [ -z "$SEED_INSTRUCTOR_PASSWORD" ]; then
    echo "❌ Instructor password is required"
    exit 1
fi

# Confirm before proceeding
echo ""
echo "📋 Summary:"
echo "  Database: ${DATABASE_URL:0:30}..."
echo "  Email: $SEED_INSTRUCTOR_EMAIL"
echo ""
read -p "Proceed with seeding? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Seeding cancelled"
    exit 0
fi

# Export variables and run seed
export DATABASE_URL
export SEED_INSTRUCTOR_EMAIL
export SEED_INSTRUCTOR_PASSWORD
export NODE_ENV="production"

echo ""
echo "🌱 Running seed script..."
npm run db:seed

# Clean up
unset DATABASE_URL
unset SEED_INSTRUCTOR_EMAIL
unset SEED_INSTRUCTOR_PASSWORD
unset NODE_ENV

echo ""
echo "✅ Seeding complete!"
echo "⚠️  Save your credentials in a password manager!"
echo ""
