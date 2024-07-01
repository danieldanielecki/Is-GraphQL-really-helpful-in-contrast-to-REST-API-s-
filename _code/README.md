# Demo part instructions

Note: when facings problems with installing (outdated) packages, try to run `npm i --legacy-peer-deps`, and try to operate with `npm`, instead of `yarn`.

## Demo Optional

### Simplest example of GraphQL query

#### Show basic dummy query: `http://localhost:4000/graphql`

```graphql
query {
  users {
    id
  }
}
```

#### Show one more field having also name (as per how it's written in schema definition): `http://localhost:4000/graphql`

```graphql
query {
  users {
    id
    name
  }
}
```

#### Show one more field having also email (as per how it's written in schema definition): `http://localhost:4000/graphql`

```graphql
query {
  users {
    id
    name
    email
  }
}
```

#### Show one more field having also optional age (as per how it's written in schema definition): `http://localhost:4000/graphql`

```graphql
query {
  users {
    id
    name
    email
    age
  }
}
```

#### Show one more field having nested posts (as per how it's written in schema definition): `http://localhost:4000/graphql`

```graphql
query {
  users {
    id
    name
    email
    age
    posts {
      id
    }
  }
}
```

#### Show one nested field inside already nested posts (as per how it's written in schema definition): `http://localhost:4000/graphql`

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
    }
  }
}
```

#### Show one last nested field inside already nested posts (as per how it's written in schema definition): `http://localhost:4000/graphql`

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
      published
    }
  }
}
```

#### Show real use case in `index.html`/`index.js`: `http://localhost:1234`

```graphql
query {
  users {
    id
    name
  }
}
```

##### Show network tab with the data under `Preview` of request: `http://localhost:1234`

#### Show real use case in `index.html`/`index.js` with one extra field: `http://localhost:1234`

```graphql
query {
  users {
    id
    name
    email
  }
}
```

##### Show network tab with the data under `Preview` of request having also email: `http://localhost:1234`

##### Show in HTML the email: `http://localhost:1234`

```html
<h3>${user.email}</h3>
```

#### Revert it back not to have in query `email` and show `undefined` on HTML/under `Preview` of request: `http://localhost:1234`

```graphql
query {
  users {
    id
    name
  }
}
```

##### Show `200 OK` Status Code under `Preview` of request even if this resource doesn't return anything: `http://localhost:1234`

#### Show executing create mutation: `http://localhost:4000/graphql`

```graphql
mutation {
  createUser(data: { name: "Daniel", email: "foo@example.com", age: 25 }) {
    id
    email
    age
  }
}
```

##### Show added new user: `http://localhost:4000/graphql`

```graphql
query {
  users {
    id
    email
    name
    age
  }
}
```

##### Refresh `index.html`/`index.js` to show also `Daniel` popping up: `http://localhost:1234`

#### Show Subscription: `http://localhost:4000/graphql`

```graphql
subscription {
  count
}
```

## Demo Error

### Let's see an error

#### Show `200 OK` Status Code under `Preview` of request when trying to print email, which isn't queried: `http://localhost:1234`

```graphql
query {
  users {
    id
    name
  }
}
```

```html
<h3>${user.email}</h3>
```

#### Show `200 OK` Status Code under `Preview` of request when trying to query some random not existing field: `http://localhost:1234`

```graphql
query {
  users {
    id
    name
    blablabla
  }
}
```

#### Show `200 OK` Status Code under `Preview` of request when trying to exectute mutation for already existing email: `http://localhost:4000/graphql`

```graphql
mutation {
  createUser(data: { name: "Daniel", email: "foo@example.com", age: 25 }) {
    id
    email
    age
  }
}
```

##### Show it inside the code `throw new GraphQLError("Email taken");` to highlight no REST-like status codes, but `GraphQL` ones

## Demo Introspection

### Introspection in practice

#### Show basic introspection: `http://localhost:4000/graphql`

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

#### Show some information about query: `http://localhost:4000/graphql`

```graphql
{
  __schema {
    queryType {
      name
    }
  }
}
```

#### Show some information about Post: `http://localhost:4000/graphql`

```graphql
{
  __type(name: "Post") {
    name
  }
}
```

#### Show more information about Post: `http://localhost:4000/graphql`

```graphql
{
  __type(name: "Post") {
    name
    kind
  }
}
```

#### Show some information about CreateUserInput: `http://localhost:4000/graphql`

```graphql
{
  __type(name: "CreateUserInput") {
    name
    kind
  }
}
```

#### Show even more information about Post: `http://localhost:4000/graphql`

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

#### Show last introspection about Post: `http://localhost:4000/graphql`

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

##### After that, show how `useDisableIntrospection()` works by simply uncommenting it and reloading the page: `http://localhost:4000/graphql`

## Demo Circular Queries

### Digging with nesting

#### Show users query with 5 fields and nested posts, author, posts and author: `http://localhost:4000/graphql`

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

## Demo Unit Testing

### Unit Testing in GraphQL

#### Shortly show tested 1 of each: query, mutation, and subscription

1. `cd _code`
2. `cd unit-testing`
3. `yarn test`
