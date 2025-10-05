export async function login({ username, password }) {
  try {
    const res = await fetch("http://localhost:5182/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json(); // e.g. JWT token or user info

    return data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
}

// services/register.js
export async function register({ username, email, password }) {
  try {
    const res = await fetch("http://localhost:5182/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Error registering:", err);
    throw err;
  }
}

export async function getUsersConvertedWith(userId) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `http://localhost:5182/api/users/UsersConvertedWith?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5182/api/users/GetAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}

export async function uploadProfileImage(userId, file) {
  const token = localStorage.getItem("token"); // JWT from login
  const formData = new FormData();
  formData.append("UserId", userId);
  formData.append("ProfileImageUrl", file);

  try {
    const res = await fetch("http://localhost:5182/api/users/AddImage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // send JWT for auth
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Image upload failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Error uploading profile image:", err);
    throw err;
  }
}
