import BASEURL from './baseUrl';

// Get all comments
async function getCommentsInPost(id: string): Promise<{ comment: IComment[] }> {
  const response = await fetch(`${BASEURL}/posts/${id}/comments`, {
    mode: "cors",
  });
  const comments = await response.json();
  return comments;
}

// Get al single comment
async function getComment(
  postId: string,
  commentId: string
): Promise<{ comments: IComment[] }> {
  const response = await fetch(
    `${BASEURL}/posts/${postId}/comments/${commentId}`,
    { mode: "cors" }
  );
  const comments = await response.json();
  return comments;
}

// Create a comment
async function createComment(
  id: string,
  data: IComment,
  token: string
): Promise<{ post?: IPost; errors?: [] }> {
  const response = await fetch(`${BASEURL}/posts/${id}/comments`, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const comments = await response.json();
  return comments;
}

// Update a comment
async function updateComment(
  postId: string,
  commentId: string,
  data: IComment,
  token: string
): Promise<{ post?: IPost, errors?: [] }> {
  const response = await fetch(
    `${BASEURL}/posts/${postId}/comments/${commentId}`,
    {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const comments = await response.json();
  return comments;
}

// Delete a comment
async function deleteComment(
  postId: string,
  commentId: string,
  token: string
): Promise<{ post: IPost; error?: string }> {
  const response = await fetch(
    `${BASEURL}/posts/${postId}/comments/${commentId}`,
    {
      mode: "cors",
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const comments = await response.json();
  return comments;
}

export {
  getCommentsInPost,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
