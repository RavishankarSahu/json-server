import { useState, useEffect } from "react";

export default function App() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((response) => {
        setPost(response);
      });
  }, []);

  const addPost = () => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `JSON post Exe ${post.length + 1}`
      })
    })
      .then((res) => res.json())
      .then((response) => {
        setPost((pre) => [...pre, response]);
      });
  };

  const handleEdit = (id) => {
    let toEdit = post.filter((d) => d.id === id)[0];
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `JSON post Exe ${toEdit.id}_Edited`
      })
    })
      .then((res) => res.json())
      .then(() => {
        fetch("http://localhost:3000/posts")
          .then((res) => res.json())
          .then((d) => {
            setPost(d);
          });
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        setPost((prePost) => {
          return post.filter((pre) => pre.id !== id);
        });
      });
  };
  return (
    <div className="App">
      <button
        onClick={addPost}
        style={{
          cursor: "pointer",
          background: "blue",
          color: "white",
          padding: "10px 20px",
          borderRadius: "20px",
          border: "none"
        }}
      >
        Add Post
      </button>
      <hr />
      <h3>Post list</h3>
      <div>
        {post.length > 0 &&
          post.map((data, i) => (
            <div
              style={{ background: "lightblue", padding: "5px", margin: "5px" }}
            >
              {data.id}. {data.title}{" "}
              <button
                onClick={() => handleEdit(data.id)}
                style={{ cursor: "pointer" }}
              >
                Edit
              </button>{" "}
              <button
                onClick={() => handleDelete(data.id)}
                style={{ cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
