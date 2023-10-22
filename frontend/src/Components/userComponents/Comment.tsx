import { commentProps } from "../../interface/interface";
import { addComment } from "../../Api/userApi";
import { useFormik } from "formik";
import { addCommentValidation } from "../../validations/validation";
import sendButton from "../../assets/icon/sendButton.png";

export default function Comment({ viewComment, itemId }: commentProps) {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: addCommentValidation,
    onSubmit: async (values) => {
      const message = values.comment;
      const { data } = await addComment({ message, itemId });
      if (data.success) {
        formik.values.comment = "";
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="relative">
        <div className="mb-2">
          <input
            type="text"
            id="comment"
            name="comment"
            className=" w-[42%] px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Add comment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          />
          {formik.values.comment && formik.isValid ? (
            <button type="submit" className="absolute">
              <img
                src={sendButton}
                alt="Send"
                className="w-5 h-5 dark:invert ml-1"
              />
            </button>
          ) : null}
        </div>
      </form>
      {viewComment === itemId && (
        <div className="bg-gray-100 dark:bg-gray-800 mb-0.5 rounded-md">
          <h6>username</h6>
        </div>
      )}
    </div>
  );
}
