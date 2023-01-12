import React, { SyntheticEvent, useState } from "react";
import { format } from "date-fns";
import { deleteComment } from "../API/comments";
import AddComment from './AddComment';
import loadingLogo from "../assets/loading.gif";
import userIcon from "../assets/userIcon.png";

interface CommentProps {
  id: string;
  postId: string;
  commenter: IUser;
  content: string;
  published: boolean;
  createdAt: string;
  user: IUser | null;
  reload: (arg0: IPost) => void;
}

function Comment({
  id,
  postId,
  commenter,
  content,
  published,
  createdAt,
  user,
  reload,
}: CommentProps): JSX.Element {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [edit, setEdit] = useState(false);

  // Deletes comment from database
  function deleteComm(): void {
    // show loading icon
    setLoading(true);

    if (user !== null) {
      deleteComment(postId, id, user.token as string)
        .then((data) => {
          setLoading(false);
          // if theres an error, render it.
          if (data.error !== undefined) {
            // show message
            setDeleteError(data.error);
          } else {
            // if theres no error
            // reload page
            setDeleteConfirmVisible(false);
            reload(data.post);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }


  return edit ? (
    <AddComment
      edit
      postId={postId}
      user={user as IUser}
      reload={(post, ref) => {
        setEdit(false);
        reload(post);
      }}
      commentId={id}
      commentContent={content}
      editPublished={published}
      editUser={commenter._id}
    />
  ) : (
    <div className="comment" id={id}>
      <h1>
        <img src={userIcon} alt="" className="icon" />
        {commenter.username}
      </h1>
      <p className="date">{format(new Date(createdAt), "d MMM yyyy")}</p>
      <p className="content">{content}</p>
      {user?.username === commenter.username ||
      (user?.permission === "admin" && !deleteConfirmVisible) ? (
        <>
          <button
            type="button"
            className="button--small"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
          <button
            type="button"
            className="button--small"
            onClick={() => setDeleteConfirmVisible(true)}
          >
            Delete
          </button>
        </>
      ) : null}
      {deleteConfirmVisible ? (
        <div className="delete_confirm">
          {deleteError === "" ? (
            <>
              <p>Are you sure you want to delete this comment?</p>
              <button
                type="button"
                className="button--small--green"
                onClick={() => setDeleteConfirmVisible(false)}
              >
                No
              </button>
              <button
                type="button"
                className="button--small--red"
                onClick={deleteComm}
              >
                {loading ? <img src={loadingLogo} className="loading-logo" alt="" /> : "Yes"}
              </button>
            </>
          ) : (
            <p>{deleteError}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
