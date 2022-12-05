const BASEURL = "https://blogserver-production.up.railway.app";

// Get a single user
async function getUser(id: string): Promise<{user: IUser}>{
  const response = await fetch(`${BASEURL}/users/${id}`, { mode: "cors" })
  const users = await response.json();
  return users;
}

// Create a user
async function logIn(data: { username: string, password: string }): Promise<{user: IUser | boolean, token?: string, message?: string}>{
  const response = await fetch(`${BASEURL}/users/log-in`, {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const users = await response.json();
  return users;
}

// Update a user
async function signUp(data: IUser): Promise<{user: IUser}>{
  const response = await fetch(`${BASEURL}/users/sign-up`, {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const users = await response.json();
  return users;
}

// Update a user
async function updateUser(id: string, data: IUser): Promise<{user: IUser}>{
  const response = await fetch(`${BASEURL}/users/sign-up`, {
    mode: "cors",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const users = await response.json();
  return users;
}

// Delete a user
async function deleteUser(id: string): Promise<{ response: string}>{
  const response = await fetch(`${BASEURL}/users/${id}`, {
    mode: "cors",
    method: "DELETE",
  });
  const users = await response.json();
  return users;
}

export {
  getUser,
  logIn,
  signUp,
  updateUser,
  deleteUser,
}