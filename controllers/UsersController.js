import sha1 from 'sha1';
import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

class UsersController {
  static async postNew(req, res) {
    // ... (previous code from Task 3)
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const db = dbClient.client.db(dbClient.dbName);
    const user = await db.collection('users').findOne({ _id: new dbClient.client.ObjectId(userId) });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    res.status(200).json({ id: user._id, email: user.email });
  }
}

export default UsersController;
