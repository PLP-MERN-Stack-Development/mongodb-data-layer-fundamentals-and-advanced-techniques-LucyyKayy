// q1. Find all books in a specific genre (e.g., Fiction)
find({ genre: "Fiction" })

// q2. Find books published after a certain year (e.g., 2000)
find({ published_year: { $gt: 2000 } })

// q3. Find books by a specific author (e.g., J.K. Rowling)
find({ author: "J.K. Rowling" })

// q4.Update the price of a specific book (e.g., "The Hobbit")
   updateOne(
  { title: "The Hobbit" },
  { $set: { price: 13.99 } }
)

// q5. Delete a book by its title (e.g., "The Catcher in the Rye")
deleteOne({ title: "The Catcher in the Rye" })


//ADVQ 1. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

//ADVQ 2. Use projection to return only the title, author, and price fields
db.books.find(
  {}, 
  { title: 1, author: 1, price: 1, _id: 0 }
)

// ADVQ3A. Sort books by price ascending
db.books.find().sort({ price: 1 })

// ADVQ3b. Sort books by price descending
db.books.find().sort({ price: -1 })

// ADVQ4a. Pagination - Page 1 (first 5 books)
db.books.find().limit(5)

// ADVQ4b. Pagination - Page 2 (skip first 5, get next 5)
db.books.find().skip(5).limit(5)

// q1. Calculate the average price of books by genre
([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

// q2. Find the author with the most books in the collection
([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// q3. Group books by publication decade and count them
([
  {
    $group: {
      _id: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// 1. Create an index on the title field for faster searches
createIndex({ title: 1 })

// 2. Create a compound index on author and published_year
createIndex({ author: 1, published_year: 1 })

// 3. Use explain() to show performance improvement
// Example: searching for a book by title with explain
find({ title: "The Hobbit" }).explain("executionStats")

// Example: searching by author + year with explain
find({ author: "J.K. Rowling", published_year: 1997 }).explain("executionStats")

