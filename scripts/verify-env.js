#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * Checks if all required environment variables are set
 */

const required = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'NEXT_PUBLIC_BASE_URL',
  'NODE_ENV'
];

const optional = [
  'SEED_INSTRUCTOR_EMAIL',
  'SEED_INSTRUCTOR_PASSWORD'
];

console.log('🔍 Verifying Environment Variables...\n');

let missingRequired = [];
let presentRequired = [];
let presentOptional = [];
let missingOptional = [];

// Check required variables
required.forEach(key => {
  if (process.env[key]) {
    presentRequired.push(key);
    const value = process.env[key];
    const masked = key.includes('SECRET') || key.includes('PASSWORD') || key.includes('KEY')
      ? `${value.substring(0, 8)}...${value.substring(value.length - 4)}`
      : value;
    console.log(`✅ ${key}: ${masked}`);
  } else {
    missingRequired.push(key);
    console.log(`❌ ${key}: NOT SET`);
  }
});

console.log('\nOptional variables (for seeding):');
optional.forEach(key => {
  if (process.env[key]) {
    presentOptional.push(key);
    const value = process.env[key];
    const masked = key.includes('PASSWORD') 
      ? '*'.repeat(value.length)
      : value;
    console.log(`✅ ${key}: ${masked}`);
  } else {
    missingOptional.push(key);
    console.log(`⚠️  ${key}: NOT SET (only needed for production seeding)`);
  }
});

console.log('\n' + '='.repeat(50));
console.log(`Required: ${presentRequired.length}/${required.length} set`);
console.log(`Optional: ${presentOptional.length}/${optional.length} set`);

if (missingRequired.length > 0) {
  console.log('\n❌ MISSING REQUIRED VARIABLES:');
  missingRequired.forEach(key => console.log(`   - ${key}`));
  console.log('\nSee .env.example for reference');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are set!');
  process.exit(0);
}
