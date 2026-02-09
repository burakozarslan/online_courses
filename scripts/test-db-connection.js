#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Verifies that the database is accessible and Prisma can connect
 */

const { PrismaClient } = require('../app/generated/prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function testConnection() {
  console.log('🔌 Testing Database Connection...\n');
  
  try {
    // Test basic connection
    console.log('📡 Attempting to connect to database...');
    await prisma.$connect();
    console.log('✅ Database connection successful!\n');

    // Test a simple query
    console.log('🔍 Running test query...');
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful! Found ${userCount} users in database\n`);

    // Check for tables
    console.log('📊 Checking database schema...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    if (tables.length > 0) {
      console.log(`✅ Found ${tables.length} tables:`);
      tables.forEach((table, index) => {
        console.log(`   ${index + 1}. ${table.table_name}`);
      });
    } else {
      console.log('⚠️  No tables found. You may need to run migrations:');
      console.log('   npx prisma migrate deploy');
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Database is ready to use!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Database connection failed!\n');
    console.error('Error:', error.message);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check DATABASE_URL is set correctly');
    console.log('2. Verify database server is running');
    console.log('3. Ensure SSL mode is correct (?sslmode=require for cloud databases)');
    console.log('4. Check network connectivity to database host');
    console.log('5. Verify database credentials are correct');
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
