import React, {
  MutableRefObject,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { createComment } from "../API/comments";
import InputWrapper from "./InputWrapper";
import loadingLogo from "../assets/loading.gif";

interface AddCommentProps {
  postId: string;
  user: IUser;
  reload: (arg0: IPost, arg1?: MutableRefObject<null | HTMLFormElement>) => void;
}

function AddComment({ postId, user, reload }: AddCommentProps): JSX.Element {
  const commentErrRef: MutableRefObject<null | HTMLSpanElement> = useRef(null);
  const formRef: MutableRefObject<null | HTMLFormElement> = useRef(null);
  const commentRef: MutableRefObject<null | HTMLTextAreaElement> = useRef(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  function submitForm(e: SyntheticEvent): void {
    // Check if form is valid
    if (
      commentRef.current !== null &&
      formRef.current !== null &&
      formRef.current.reportValidity()
    ) {
      e.preventDefault();
      // Show loading logo on button
      setLoading(true);
      // if it is, submit data
      const newComment = {
        content: commentRef.current.value,
        published: true,
        commenter: user._id as string,
        post: postId,
      };
      createComment(postId, newComment, user.token as string)
        .then((data) => {
          setLoading(false);
          // if theres an error, render it.
          if (data.errors !== undefined) {
            // show message
            displayErrors(data.errors);
          } else if (data.post !== undefined) {
            // if theres no error
            // reload page
            setComment("");
            reload(data.post, formRef);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  function displayErrors(errors: SignUpError[]): void {
    errors.forEach((error: SignUpError) => {
      switch (error.msg) {
        case "Comment content is required":
          if (commentErrRef.current !== null) {
            commentErrRef.current.innerText = error.msg;
          }
          break;
        default:
          break;
      }
    });
  }

  function validateComment(e: SyntheticEvent<HTMLTextAreaElement>): void {
    const field = e.currentTarget;
    setComment(field.value);
    if (commentErrRef.current !== null) {
      // Check if comment is within boundaries, display error message if not
      if (field.validity.valueMissing) {
        commentErrRef.current.innerText = "Comment can't be empty";
        field.setCustomValidity("Comment can't be empty");
      } else {
        commentErrRef.current.innerText = "";
        field.setCustomValidity("");
      }
    }
  }

  return (
    // only render if theres a user loged in
    <form action="" ref={formRef}>
      <h1>Add comment</h1>
      <InputWrapper name="comment" errRef={commentErrRef}>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={5}
          minLength={1}
          value={comment}
          onChange={validateComment}
          ref={commentRef}
          placeholder="Comment"
          required
        />
      </InputWrapper>
      <button className="button" onClick={submitForm} type="submit">
        {loading ? <img src={loadingLogo} alt="" /> : "Add comment"}
      </button>
    </form>
  );
}

export default AddComment;
