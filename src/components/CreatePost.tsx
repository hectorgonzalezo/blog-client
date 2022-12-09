import React, {
  MutableRefObject,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { selectUser } from "../store/userSlice";
import { createPost, updatePost } from "../API/posts";
import InputWrapper from "./InputWrapper";
import loadingLogo from "../assets/loading.gif";

interface CreateProps {
  editUser?: string;
  editId?: string;
  edit?: boolean;
  editTitle?: string;
  editContent?: string;
  editPublished?: boolean;
  editComments?: IComment[];
}

function CreatePost({
  editUser,
  editId,
  edit = false,
  editTitle = "",
  editContent = "",
  editPublished = true,
  editComments = [],
}: CreateProps): JSX.Element {
  const titleErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const contentErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const formRef: MutableRefObject<null | HTMLFormElement> = useRef(null);
  const titleRef: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const contentRef: MutableRefObject<null | HTMLTextAreaElement> = useRef(null);
  const [title, setTitle] = useState(editTitle);
  const [content, setContent] = useState(editContent);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  function submitForm(e: SyntheticEvent): void {
    // Check if form is valid
    if (
      titleRef.current !== null &&
      contentRef.current !== null &&
      formRef.current !== null &&
      formRef.current.reportValidity()
    ) {
      e.preventDefault();
      // Show loading logo on button
      setLoading(true);
      // if it is, submit data

      // if a new post is being CREATED
      if (!edit) {
        const newPost = {
          title: titleRef.current.value,
          content: contentRef.current.value,
          published: true,
          poster: user?._id as string,
          comments: [],
        };
        createPost(newPost, user?.token as string)
          .then((data) => {
            setLoading(false);
            // if theres an error, render it.
            if (data.errors !== undefined) {
              // show message
              displayErrors(data.errors);
            } else {
              // if theres no error
              // load post page
              navigate(`/posts/${data.post._id as string}`);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      } else {
        // if a post is being UPDATED
        const updatedPost = {
          title: titleRef.current.value,
          content: contentRef.current.value,
          published: editPublished,
          poster: editUser as string,
          comments: editComments,
        };
        updatePost(editId as string, updatedPost, user?.token as string)
          .then((data) => {
            setLoading(false);
            // if theres an error, render it.
            if (data.errors !== undefined) {
              // show message
              displayErrors(data.errors);
            } else {
              // if theres no error
              // load post page
              navigate(`/posts/${data.post._id as string}`);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    }
  }

  function displayErrors(errors: SignUpError[]): void {
    errors.forEach((error: SignUpError) => {
      switch (error.msg) {
        case "A blog title is required":
          if (titleErrRef.current !== null) {
            titleErrRef.current.innerText = error.msg;
          }
          break;
        case "Blog title must be between 1 and 100 characters":
          if (titleErrRef.current !== null) {
            titleErrRef.current.innerText = error.msg;
          }
          break;
        case "Blog content is required":
          if (contentErrRef.current !== null) {
            contentErrRef.current.innerText = error.msg;
          }
          break;
        case "Blog content can't be empty":
          if (contentErrRef.current !== null) {
            contentErrRef.current.innerText = error.msg;
          }
          break;
        case "Blog poster is required":
          if (contentErrRef.current !== null) {
            contentErrRef.current.innerText =
              "You have to be logged in as an administrator to post";
          }
          break;
        default:
          break;
      }
    });
  }

  function validateTitle(e: SyntheticEvent<HTMLInputElement>): void {
    const field = e.currentTarget;
    setTitle(field.value);
    if (titleErrRef.current !== null) {
      // Check if title is within boundaries, display error message if not
      if (field.validity.tooShort || field.validity.tooLong) {
        titleErrRef.current.innerText =
          "Blog title must be between 1 and 100 characters";
        field.setCustomValidity(
          "Blog title must be between 1 and 100 characters"
        );
      } else {
        titleErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  function validateContent(e: SyntheticEvent<HTMLTextAreaElement>): void {
    const field = e.currentTarget;
    setContent(field.value);
    if (contentErrRef.current !== null) {
      // Check if content is within boundaries, display error message if not
      if (field.validity.valueMissing) {
        contentErrRef.current.innerText = "Blog content can't be empty";
        field.setCustomValidity("Blog content can't be empty");
      } else {
        contentErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  return (
    // only render if theres a user loged in
    <form action="" ref={formRef}>
      <h1>{edit ? "Edit Post" : "Create Post"}</h1>
      <InputWrapper name="title" errRef={titleErrRef}>
        <input
          type="text"
          name="title"
          value={title}
          minLength={1}
          maxLength={100}
          placeholder="Post Title"
          onChange={validateTitle}
          ref={titleRef}
          required
        />
      </InputWrapper>
      <InputWrapper name="content" errRef={contentErrRef}>
        <textarea
          name="content"
          className="enrichedText"
          id="content"
          cols={40}
          rows={20}
          minLength={1}
          value={content}
          onChange={validateContent}
          ref={contentRef}
          placeholder="Post Content"
          required
        />
      </InputWrapper>
      <button className="button" onClick={submitForm} type="submit">
        {loading ? <img src={loadingLogo} alt="" /> : "Submit post"}
      </button>
    </form>
  );
}

export default CreatePost;
