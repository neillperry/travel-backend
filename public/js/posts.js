

async function getPosts() {
  
   return await fetch('https://localhost:3000/posts').then((response) =>
        response.json()).then((data) => data);

}
