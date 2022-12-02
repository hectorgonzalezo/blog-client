const BASEURL = "https://blogserver-production.up.railway.app";


// Get all posts
async function getPosts(): Promise<{posts: IPost[]}>{
  const response = await fetch(`${BASEURL}/posts`, { mode: "cors" })
  const posts = await response.json();
  return posts;
}

// Get a single post
async function getPost(id: string): Promise<{post: IPost}>{
  const response = await fetch(`${BASEURL}/posts/${id}`, { mode: "cors" })
  const posts = await response.json();
  return posts;
}

// Create a post
async function createPost(id: string, data: IPost): Promise<{post: IPost}>{
  const response = await fetch(`${BASEURL}/posts/${id}`, {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const posts = await response.json();
  return posts;
}

// Update a post
async function updatePost(id: string, data: IPost): Promise<{post: IPost}>{
  const response = await fetch(`${BASEURL}/posts/${id}`, {
    mode: "cors",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const posts = await response.json();
  return posts;
}

// Delete a post
async function deletePost(id: string): Promise<{post: IPost}>{
  const response = await fetch(`${BASEURL}/posts/${id}`, {
    mode: "cors",
    method: "DELETE",
  });
  const posts = await response.json();
  return posts;
}

export  {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}