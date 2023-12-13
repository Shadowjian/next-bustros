### MONGODB

Commands:

Working with DB

1. db - shows current database
2. show dbs - list all database
3. use <dbname> - change to a different database or create new database

Working with Collections inside Blog db

- collections are like tables in sql

1. create collection - db.createCollection("collection_name)

```bash
Atlas [primary] blog> db.createCollection("posts")
```

2. create document - db.posts.insertOne({
   title: 'Post 1',
   body: 'Body of the post',
   category: 'News',
   likes: 1,
   tagas: ['news', 'events'],
   date: Date()
   })

3. create multiple document - db.posts.insertMany([{},{},{}])

Show Current Database

- db

Show All Databases

- show dbs

Create Or Switch Database

- use blog

Drop Database

- db.dropDatabase()

Create Collection

- db.createCollection('posts')

Show Collections

- show collections

Insert Document

- db.posts.insertOne({
  title: 'Post 1',
  body: 'Body of post.',
  category: 'News',
  likes: 1,
  tags: ['news', 'events'],
  date: Date()
  })

Insert Multiple Documents

- db.posts.insertMany([
  {
  title: 'Post 2',
  body: 'Body of post.',
  category: 'Event',
  likes: 2,
  tags: ['news', 'events'],
  date: Date()
  },
  {
  title: 'Post 3',
  body: 'Body of post.',
  category: 'Tech',
  likes: 3,
  tags: ['news', 'events'],
  date: Date()
  },
  {
  title: 'Post 4',
  body: 'Body of post.',
  category: 'Event',
  likes: 4,
  tags: ['news', 'events'],
  date: Date()
  },
  {
  title: 'Post 5',
  body: 'Body of post.',
  category: 'News',
  likes: 5,
  tags: ['news', 'events'],
  date: Date()
  }
  ])

Find All Documents

- db.posts.find()

Find Documents with Query

- db.posts.find({ category: 'News' })

Sort Documents

Ascending

- db.posts.find().sort({ title: 1 })

Descending

- db.posts.find().sort({ title: -1 })

Count Documents

- db.posts.find().count()
- db.posts.find({ category: 'news' }).count()

Limit Documents

- db.posts.find().limit(2)

Chaining

- db.posts.find().limit(2).sort({ title: 1 })

Find One Document

- db.posts.findOne({ likes: { $gt: 3 } })

Update Document

- db.posts.updateOne({ title: 'Post 1' },
  {
  $set: {
  category: 'Tech'
  }
  })

Update Document or Insert if not Found

- db.posts.updateOne({ title: 'Post 6' },
  {
  $set: {
  title: 'Post 6',
  body: 'Body of post.',
  category: 'News'
  }
  },
  {
  upsert: true
  })
- if the document doesn't exist, it will be created

Increment Field ($inc)

- db.posts.updateOne({ title: 'Post 1' },
  {
  $inc: {
  likes: 2
  }
  })
- this increments like by 2

Update Multiple Documents

- db.posts.updateMany({}, {
  $inc: {
  likes: 1
  }
  })

Rename Field

- db.posts.updateOne({ title: 'Post 2' },
  {
  $rename: {
  likes: 'views'
  }
  })

Delete a Document

- db.posts.deleteOne({ title: 'Post 6' })

Delete Multiple Documents

- db.posts.deleteMany({ category: 'Tech' })

Greater & Less Than

- db.posts.find({ views: { $gt: 2 } })
  db.posts.find({ views: { $gte: 7 } })
  db.posts.find({ views: { $lt: 7 } })
  db.posts.find({ views: { $lte: 7 } })
