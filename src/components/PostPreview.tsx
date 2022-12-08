import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { deletePost } from "../API/posts";
import loadingLogo from "../assets/loading.gif";



interface BlogProps {
  title: string;
  published: boolean;
  createdAt: string;
  poster: string;
  id: string;
  user: IUser;
  reload: () => void;
}

function PostPreview({
  title,
  published,
  createdAt,
  poster,
  user,
  id,
  reload,
}: BlogProps): JSX.Element {
  const navigate = useNavigate();
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [loading, setLoading] = useState(false);

  function editP(e: SyntheticEvent): void {
    // Prevent click from bubbling up
    e.stopPropagation();
    navigate(`/edit-post/${id}`);
  }

  // delete post from database;
  function deleteP(e: SyntheticEvent): void {
    // Prevent click from bubbling up
    e.stopPropagation();

    // show loading icon
    setLoading(true);
    if (user !== null) {
      deletePost(id, user.token as string)
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
            reload();
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  function toggleDeleteConfirmation(e: SyntheticEvent): void {
    e.stopPropagation();
    setDeleteConfirmVisible((previousValue) => !previousValue);
  }

  // When clicking on preview, go to post id
  return (
    <Link to={`/posts/${id}`} className="preview">
      <h1>{title}</h1>
      <p>By {poster}</p>
      <p>{format(new Date(createdAt), "d MMM yyyy")}</p>
      {user?.permission === "admin" && !deleteConfirmVisible ? (
        <div className="buttons">
          <button className="button" type="button" onClick={editP}>
            Edit
          </button>
          <button
            className="button"
            type="button"
            onClick={toggleDeleteConfirmation}
          >
            Delete
          </button>
        </div>
      ) : null}
      {deleteConfirmVisible ? (
        <div className="delete_confirm">
          {deleteError === "" ? (
            <>
              <p>Are you sure you want to delete this Post?</p>
              <button
                type="button"
                className="button--small--green"
                onClick={toggleDeleteConfirmation}
              >
                No
              </button>
              <button
                type="button"
                className="button--small--red"
                onClick={deleteP}
              >
                {loading ? <img src={loadingLogo} alt="" /> : "Yes"}
              </button>
            </>
          ) : (
            <p>{deleteError}</p>
          )}
        </div>
      ) : null}
    </Link>
  );
}

export default PostPreview;
