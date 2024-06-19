### Introspection

#### Show basic introspection

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

#### Show some information about query

```graphql
{
  __schema {
    queryType {
      name
    }
  }
}
```

#### Show some information about Post

```graphql
{
  __type(name: "Post") {
    name
  }
}
```

#### Show more information about Post

```graphql
{
  __type(name: "Post") {
    name
    kind
  }
}
```

#### Show some information about CreateUserInput

```graphql
{
  __type(name: "CreateUserInput") {
    name
    kind
  }
}
```

#### Show even more information about Post

```graphql
{
  __type(name: "Post") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}
```

#### Show last introspection about Post

```graphql
{
  __type(name: "Post") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
```

##### After that, show how `useDisableIntrospection()` works by simply uncommenting it and reloading the page.

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
