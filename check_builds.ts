import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Build from './src/server/models/Build.js';
dotenv.config({ path: '.env.local' });
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/apkify');
  
  // Try to create a mock build
  const user = { _id: new mongoose.Types.ObjectId() };
  try {
    const newBuild = await Build.create({
      user_id: user._id,
      apk_name: 'Test App',
      status: 'Completed',
      downloadUrl: '/apks/test.apk'
    });
    console.log('Created build successfully!', newBuild);
  } catch (err) {
    console.error('Failed to create build:', err);
  }
  
  const count = await Build.countDocuments({});
  console.log('Total builds:', count);
  process.exit(0);
}
check();
