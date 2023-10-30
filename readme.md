PORT :http://localhost:9020

API_PATH

Create New Book(POST Request) :http://localhost:9020/api/v1/books

Get All Book(GET REQUEST):
http://localhost:9020/api/v1/books?limit=5

paginated:query:{
    page:PageNum
    limit:No of documents per page
}


Get Book Details(GET):http://localhost:9020/api/v1/books/bookId


Update Book(PATCH):http://localhost:9020/api/v1/books/bookId

Delete Book(DELETE):http://localhost:9020/api/v1/books