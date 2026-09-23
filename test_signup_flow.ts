import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import User from './src/server/models/User.js';
import Build from './src/server/models/Build.js';
import { checkExpiry } from './src/server/routes/auth.js';

dotenv.config({ path: '.env.local' });

async function testSignupAndLogin() {
  await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/apkify');
  
  const email = `test_signup_${Date.now()}@gmail.com`;
  
  // Simulate signup
  const newUser = new User({
    fullName: 'Test User',
    email,
    password: 'hashedpassword',
    credits_remaining: 3,
    history_limit: 10,
    plan_type: 'Free'
  });
  await newUser.save();
  console.log('Signup credits:', newUser.credits_remaining, 'last_credit_refill:', newUser.last_credit_refill);
  
  // Simulate login
  let loginUser = await User.findOne({ email });
  loginUser = await checkExpiry(loginUser);
  console.log('Login credits after checkExpiry:', loginUser.credits_remaining, 'last_credit_refill:', loginUser.last_credit_refill);
  
  process.exit(0);
}

testSignupAndLogin();
