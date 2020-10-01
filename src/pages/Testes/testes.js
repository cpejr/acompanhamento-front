import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/"
})

export default function Testes() {
  const [posts, setPosts] = React.useState()

  React.useEffect(() => {
    api.get("posts")
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(err => console.debug("Olha aqui", err.message));
  }, [])

  if (posts === undefined) {
    return <h1>Carregando...</h1>
  }

  return (
    <div>
      {posts.map(post => (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      ))}
    </div>
  );
}
