const { MongoClient, ServerApiVersion } = require("mongodb")
const uri =
  "mongodb+srv://bustros:bustros@cluster0.6c0jotm.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 })
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // )
    const blogs = await client.db("blog").collection("posts")
    const count = await blogs.countDocuments() // count() methods has been deprecated in v4.0, use countDocuments() instead
    const post = await blogs.find().toArray()

    const collection = client
      .db("sample_airbnb")
      .collection("listingsAndReviews")

    // console.log(post)
    // console.log(count)

    const pipeline = [
      {
        $match: {
          accommodates: {
            $lt: 4
          },
          bedrooms: {
            $lt: 3
          },
          amenities: "Hair dryer"
        } // $match is used to filter documents, in this case by accommodates, bedrooms and amenities, $lt means less than
      },
      {
        $sort: {
          price: 1
        } // $sort is used to sort the documents, in this case by price and 1 means ascending
      },
      {
        $project: {
          name: 1,
          price: 1,
          images: 1,
          description: 1
        } // $project is used to select the fields to be returned
      },
      {
        $limit: 5
      } // $limit is used to limit the number of documents returned
    ]

    const result = await collection.aggregate(pipeline).toArray() // aggregate() method is used to perform aggregation operations on the collection
    console.log(result)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
// run()
