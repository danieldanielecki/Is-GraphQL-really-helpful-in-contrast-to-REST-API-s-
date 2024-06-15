### Introspection

(show basic introspection)

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

After that, show how `useDisableIntrospection()` works by simply uncommenting it and reloading the page.

### Circular Queries

(show users query with 5 fields and nested posts, author, posts and author)

```graphql
query {
  users {
    id
    name
    email
    age
    posts {
      id
      title
      body
      published
      author {
        id
        name
        email
        age
        posts {
          id
          title
          author {
            id
            posts {
              author {
                id
              }
            }
          }
        }
      }
    }
  }
}
```

### Apollo Client demo

(little example how it looks in reality in frontend)

1. `yarn start` in `graphql-prisma`
2. `yarn start` in `apollo-client`
3. Open `localhost:1234`

### Testing demo

(shortly show tested 1 of each: query, mutation, and subscription)

1. `cd _code`
2. `cd unit-testing`
3. `yarn test`
