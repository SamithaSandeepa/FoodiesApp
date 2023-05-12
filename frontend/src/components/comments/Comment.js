import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import "../../views/CommentPage/Comments.css";
import pp1 from "../../images/pp3.jpeg";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.timestamp) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.timestamp).toLocaleDateString();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(currentUserId);
    fetch("http://localhost:8080/api/users/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.id !== currentUserId);
        setUsers(filteredUsers);
        console.log(filteredUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={users.imagePath} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userName}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && (
          <div className="comment-text">{comment.commentBody}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Send"
            hasCancelButton
            initialText={comment.commentBody}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Send"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
