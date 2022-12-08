import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { deletePost } from "../API/posts";
import loadingLogo from "../assets/loading.gif";

const Preview = styled.button`
  width: 250px;
  background-color: var(--old-lace);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 2px 2px 4px 2px gray;
  &:hover {
    background-color: var(--beige);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h1 {
    font-size: 2rem;
  }
`;

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
    <Preview
      onClick={() => {
        navigate(`/posts/${id}`);
      }}
    >
      <h1>{title}</h1>
      <p>By {poster}</p>
      <p>{format(new Date(createdAt), "d MMM yyyy")}</p>
      {user?.permission === "admin" && !deleteConfirmVisible ? (
        <div className="buttons">
          <button className="button" type="button">
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
    </Preview>
  );
}

export default PostPreview;
