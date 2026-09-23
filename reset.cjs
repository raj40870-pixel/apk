const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://raj40870:lVjEIl6i2wch8AbX@ac-ekmvanb-shard-00-00.d1qshcp.mongodb.net:27017,ac-ekmvanb-shard-00-01.d1qshcp.mongodb.net:27017,ac-ekmvanb-shard-00-02.d1qshcp.mongodb.net:27017/AppifyNow?ssl=true&replicaSet=atlas-kyyvyz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0').then(async () => {
  const db = mongoose.connection.db;
  const hashedPassword = await bcrypt.hash('Hny@2028', 10);
  await db.collection('users').updateOne({ email: 'raj40870@gmail.com' }, { $set: { password: hashedPassword } });
  console.log('Password reset successfully!');
  process.exit(0);
}).catch(console.error);
