class FilesController {
  // ... postUpload from Task 5

  static async getShow(req, res) {
    const { id } = req.params;
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const db = dbClient.client.db(dbClient.dbName);
    const file = await db.collection('files').findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });
    if (!file) return res.status(404).json({ error: 'Not found' });

    res.status(200).json(file);
  }

  static async getIndex(req, res) {
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { parentId = 0, page = 0 } = req.query;
    const db = dbClient.client.db(dbClient.dbName);
    const files = await db.collection('files')
      .aggregate([
        { $match: { userId: new ObjectId(userId), parentId: parentId === 0 ? 0 : new ObjectId(parentId) } },
        { $skip: page * 20 },
        { $limit: 20 },
      ])
      .toArray();

    res.status(200).json(files);
  }
}
