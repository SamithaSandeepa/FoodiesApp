import { useState, useEffect } from "react";
import CommentForm from "../../components/comments/CommentForm";
import Comment from "../../components/comments/Comment";
import "../../views/CommentPage/Comments.css";
import NavBar from "../../components/NavBar/NavBar";

const Comments = ({ postId, postImage, userName, userId }) => {
  console.log(userId, "samitha");
  const currentUserId = JSON.parse(localStorage.getItem("users")).uid;
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [pid, setPid] = useState(postId);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const [image, setImage] = useState([]);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  useEffect(() => {
    getComments();
    console.log(backendComments);
    console.log(rootComments);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.id == userId);
        const imagePaths = filteredUsers.map((user) => user.imagePath);
        setImage(imagePaths);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getComments = () => {
    // console.log(postId, "postId");
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch("http://localhost:8080/api/comments/all", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const filteredComments = data.filter(
          (comment) => comment.postId === pid
        );
        console.log(filteredComments);
        setBackendComments(filteredComments);
        // getComments();
        // setOpen(false);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const addComment = (text, parentId) => {
    console.log(parentId);
    let payload = {
      userId: currentUserId,
      postId: postId,
      commentBody: text,
      parentId: parentId,
      timeStamp: new Date().getTime(),
    };
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };

    fetch("http://localhost:8080/api/comments/save", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getComments();
        // setOpen(false);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const updateComment = (text, commentId) => {
    console.log(text, commentId);
    let payload = {
      commentBody: text,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };

    fetch(
      `http://localhost:8080/api/comments/update/${commentId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getComments();
      })
      .then(() => {
        const updatedBackendComments = backendComments.map((backendComment) => {
          if (backendComment.id === commentId) {
            return { ...backendComment, body: text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      fetch(`http://localhost:8080/api/comments/delete/${commentId}`, {
        method: "DELETE",
      }).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="comments">
        <div className="container-comment">
          <div className="post1">
            <div className="post-header">
              <img
                src={image}
                alt="profile"
                className="profile-img"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                }}
              />
              <h3 className="post-title">{userName}</h3>
            </div>
            <img src={postImage} alt="post" className="post-img" />
          </div>
          <div className="comCont">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Add a comment</div>
            <CommentForm submitLabel="Send" handleSubmit={addComment} />
            <div className="comments-container">
              {rootComments.map((rootComment) => (
                <Comment
                  key={rootComment.id}
                  comment={rootComment}
                  uid={userId}
                  replies={getReplies(rootComment.id)}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
