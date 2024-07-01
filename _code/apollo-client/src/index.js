import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

client
  .query({
    query: getUsers,
  })
  .then((response) => {
    let html = "";

    response.data.users.forEach((user) => {
      html += `
            <div>
                <h3>${user.name}</h3>
            </div>
        `;
    });

    document.getElementById("users").innerHTML = html;
  });
