import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";

import { supabase } from "../supabase";

import {
  MessageCircle,
  UserCircle2,
  Loader2,
  AlertCircle,
  Send,
  ImagePlus,
  X,
  Pin,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";


/* =========================================================
   COMMENT CARD
========================================================= */

const Comment = memo(
  ({ comment, formatDate, isPinned = false }) => (
    <div
      className={`
        p-4
        rounded-xl
        border
        transition-all
        duration-300
        group
        hover:-translate-y-0.5
        hover:shadow-sm

        ${
          isPinned
            ? `
              bg-gradient-to-r
              from-[#F0EDFF]
              to-[#F8F2FF]
              border-[#CEC7F5]
            `
            : `
              bg-[#FAF9FF]
              border-[#E8E3FF]
              hover:bg-[#F7F5FF]
            `
        }
      `}
    >

      {isPinned && (
        <div className="flex items-center gap-2 mb-3">
          <Pin className="w-3.5 h-3.5 text-[#7161EF]" />

          <span
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-[#7161EF]
            "
          >
            Pinned
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">

        {comment.profile_image ? (
          <img
            src={comment.profile_image}
            alt={`${comment.user_name}'s profile`}
            className="
              w-9
              h-9
              rounded-full
              object-cover
              border-2
              border-[#D7D0F8]
              flex-shrink-0
            "
            loading="lazy"
          />
        ) : (
          <div
            className="
              w-9
              h-9
              rounded-full
              bg-[#F0EDFF]
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <UserCircle2
              className="w-5 h-5 text-[#7161EF]"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-2 min-w-0">

              <h4
                className="
                  font-semibold
                  text-sm
                  text-[#39354F]
                  truncate
                "
              >
                {comment.user_name}
              </h4>

              {isPinned && (
                <span
                  className="
                    text-[10px]
                    px-2
                    py-0.5
                    rounded-full
                    bg-[#7161EF]/10
                    text-[#7161EF]
                    font-medium
                  "
                >
                  Admin
                </span>
              )}

            </div>

            <span
              className="
                text-[11px]
                text-[#A19DAF]
                whitespace-nowrap
              "
            >
              {formatDate(comment.created_at)}
            </span>

          </div>

          <p
            className="
              text-sm
              text-[#6F6A82]
              leading-relaxed
              break-words
              mt-1
            "
          >
            {comment.content}
          </p>

        </div>

      </div>
    </div>
  )
);


/* =========================================================
   COMMENT FORM
========================================================= */

const CommentForm = memo(
  ({ onSubmit, isSubmitting, error }) => {

    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);


    const handleImageChange = useCallback((e) => {

      const file = e.target.files[0];

      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert(
          "File size must be less than 5MB."
        );

        e.target.value = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert(
          "Please select a valid image file."
        );

        e.target.value = "";
        return;
      }

      setImageFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);

    }, []);


    const handleTextareaChange = useCallback(
      (e) => {

        setNewComment(e.target.value);

        if (textareaRef.current) {

          textareaRef.current.style.height =
            "auto";

          textareaRef.current.style.height =
            `${textareaRef.current.scrollHeight}px`;
        }

      },
      []
    );


    const handleSubmit = useCallback(
      (e) => {

        e.preventDefault();

        if (
          !newComment.trim() ||
          !userName.trim()
        ) {
          return;
        }

        onSubmit({
          newComment,
          userName,
          imageFile,
        });

        setNewComment("");
        setUserName("");
        setImagePreview(null);
        setImageFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (textareaRef.current) {
          textareaRef.current.style.height =
            "auto";
        }

      },
      [
        newComment,
        userName,
        imageFile,
        onSubmit,
      ]
    );


    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* NAME */}

        <div>

          <div className="flex items-center justify-between mb-2">

            <label
              className="
                text-xs
                font-semibold
                text-[#5F5B73]
                uppercase
                tracking-wide
              "
            >
              Name
              <span className="text-red-400 ml-1">
                *
              </span>
            </label>

          </div>

          <input
            type="text"
            value={userName}
            onChange={(e) =>
              setUserName(e.target.value)
            }
            maxLength={15}
            placeholder="What should we call you?"
            required
            className="
              w-full
              h-[50px]
              px-4
              rounded-xl
              bg-[#F8F7FF]
              border
              border-[#E6E1FA]
              text-[#302D46]
              placeholder-[#A09CAD]
              focus:outline-none
              focus:border-[#7161EF]
              focus:ring-4
              focus:ring-[#7161EF]/10
              hover:border-[#C7C0EC]
              transition-all
            "
          />

        </div>


        {/* MESSAGE */}

        <div>

          <div className="flex items-center justify-between mb-2">

            <label
              className="
                text-xs
                font-semibold
                text-[#5F5B73]
                uppercase
                tracking-wide
              "
            >
              Message
              <span className="text-red-400 ml-1">
                *
              </span>
            </label>

            <span className="text-[11px] text-[#A19DAF]">
              {newComment.length}/200
            </span>

          </div>

          <textarea
            ref={textareaRef}
            value={newComment}
            maxLength={200}
            onChange={handleTextareaChange}
            placeholder="What's on your mind?"
            required
            className="
              w-full
              h-[100px]
              min-h-[100px]
              max-h-[150px]
              resize-none
              p-4
              rounded-xl
              bg-[#F8F7FF]
              border
              border-[#E6E1FA]
              text-[#302D46]
              placeholder-[#A09CAD]
              focus:outline-none
              focus:border-[#7161EF]
              focus:ring-4
              focus:ring-[#7161EF]/10
              hover:border-[#C7C0EC]
              transition-all
              overflow-y-auto
            "
          />

        </div>


        {/* PROFILE PHOTO */}

        <div>

          <div className="flex items-center justify-between mb-2">

            <label
              className="
                text-xs
                font-semibold
                text-[#5F5B73]
                uppercase
                tracking-wide
              "
            >
              Profile photo
            </label>

            <span className="text-[11px] text-[#A19DAF]">
              Optional
            </span>

          </div>

          {imagePreview ? (

            <div
              className="
                flex
                items-center
                justify-between
                p-3
                rounded-xl
                bg-[#F8F7FF]
                border
                border-[#E6E1FA]
              "
            >

              <div className="flex items-center gap-3">

                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="
                    w-10
                    h-10
                    rounded-full
                    object-cover
                    border-2
                    border-[#C9C1F5]
                  "
                />

                <div>

                  <p className="text-sm font-medium text-[#39354F]">
                    Photo selected
                  </p>

                  <p className="text-[11px] text-[#A19DAF]">
                    Ready to use
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {

                  setImagePreview(null);
                  setImageFile(null);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }

                }}
                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[#8D899C]
                  hover:text-red-500
                  hover:bg-red-50
                  transition-all
                "
              >
                <X className="w-4 h-4" />
              </button>

            </div>

          ) : (

            <div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  w-full
                  h-[48px]
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#F0EDFF]
                  border
                  border-dashed
                  border-[#BDB4EC]
                  text-[#7161EF]
                  text-sm
                  font-medium
                  hover:bg-[#EAE6FF]
                  hover:border-[#7161EF]
                  transition-all
                "
              >
                <ImagePlus className="w-4 h-4" />

                Choose a photo
              </button>

              <p className="text-center text-[10px] text-[#AAA6B7] mt-1.5">
                Max file size: 5MB
              </p>

            </div>

          )}

        </div>


        {/* ERROR */}

        {error && (
          <div
            className="
              flex
              items-center
              gap-2
              p-3
              rounded-xl
              bg-red-50
              border
              border-red-100
              text-red-500
            "
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />

            <p className="text-xs">
              {error}
            </p>

          </div>
        )}


        {/* SUBMIT */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            relative
            w-full
            h-[50px]
            rounded-xl
            overflow-hidden
            bg-gradient-to-r
            from-[#7161EF]
            to-[#A855F7]
            text-white
            font-semibold
            text-sm
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-lg
            hover:shadow-[#7161EF]/20
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >

          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Post it
            </>
          )}

        </button>

      </form>
    );
  }
);


/* =========================================================
   MAIN COMPONENT
========================================================= */

const Komentar = () => {

  const [comments, setComments] = useState([]);
  const [pinnedComment, setPinnedComment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  /* =====================================================
     AOS
  ===================================================== */

  useEffect(() => {

    AOS.init({
      once: false,
      duration: 900,
    });

  }, []);


  /* =====================================================
     PINNED COMMENT
  ===================================================== */

  useEffect(() => {

    const fetchPinnedComment = async () => {

      try {

        const { data, error } =
          await supabase
            .from("portfolio_comments")
            .select("*")
            .eq("is_pinned", true)
            .single();

        if (
          error &&
          error.code !== "PGRST116"
        ) {

          console.error(
            "Error fetching pinned comment:",
            error
          );

          return;
        }

        if (data) {
          setPinnedComment(data);
        }

      } catch (error) {

        console.error(
          "Error fetching pinned comment:",
          error
        );

      }

    };

    fetchPinnedComment();

  }, []);


  /* =====================================================
     COMMENTS + REALTIME
  ===================================================== */

  useEffect(() => {

    const fetchComments = async () => {

      try {

        const { data, error } =
          await supabase
            .from("portfolio_comments")
            .select("*")
            .eq("is_pinned", false)
            .order("created_at", {
              ascending: false,
            });

        if (error) {

          console.error(
            "Error fetching comments:",
            error
          );

          return;
        }

        setComments(data || []);

      } catch (err) {

        console.warn(
          "Failed to fetch comments:",
          err.message
        );

      }

    };


    fetchComments();


    let subscription;

    try {

      subscription = supabase
        .channel("portfolio_comments")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "portfolio_comments",
            filter: "is_pinned=eq.false",
          },
          () => {
            fetchComments();
          }
        )
        .subscribe();

    } catch (err) {

      console.warn(
        "Failed to subscribe:",
        err.message
      );

    }


    return () => {

      if (subscription) {

        try {
          subscription.unsubscribe();
        } catch (err) {
          console.error(
            "Error unsubscribing:",
            err
          );
        }

      }

    };

  }, []);


  /* =====================================================
     IMAGE UPLOAD
  ===================================================== */

  const uploadImage = useCallback(
    async (imageFile) => {

      if (!imageFile) {
        return null;
      }

      const fileExt =
        imageFile.name.split(".").pop();

      const fileName =
        `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

      const filePath =
        `profile-images/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from("profile-images")
          .upload(
            filePath,
            imageFile
          );

      if (uploadError) {
        throw uploadError;
      }

      const { data } =
        supabase.storage
          .from("profile-images")
          .getPublicUrl(filePath);

      return data.publicUrl;

    },
    []
  );


  /* =====================================================
     SUBMIT COMMENT
  ===================================================== */

  const handleCommentSubmit = useCallback(
    async ({
      newComment,
      userName,
      imageFile,
    }) => {

      setError("");
      setIsSubmitting(true);

      try {

        const profileImageUrl =
          await uploadImage(imageFile);

        const { error } =
          await supabase
            .from("portfolio_comments")
            .insert([
              {
                content: newComment,
                user_name: userName,
                profile_image:
                  profileImageUrl,
                is_pinned: false,
                created_at:
                  new Date().toISOString(),
              },
            ]);

        if (error) {
          throw error;
        }

      } catch (error) {

        console.error(
          "Error adding comment:",
          error
        );

        setError(
          "Couldn't post that right now. Try again."
        );

      } finally {

        setIsSubmitting(false);

      }

    },
    [uploadImage]
  );


  /* =====================================================
     DATE
  ===================================================== */

  const formatDate = useCallback(
    (timestamp) => {

      if (!timestamp) {
        return "";
      }

      const date = new Date(timestamp);
      const now = new Date();

      const diffMinutes =
        Math.floor(
          (now - date) / 60000
        );

      const diffHours =
        Math.floor(
          diffMinutes / 60
        );

      const diffDays =
        Math.floor(
          diffHours / 24
        );


      if (diffMinutes < 1) {
        return "Just now";
      }

      if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
      }

      if (diffHours < 24) {
        return `${diffHours}h ago`;
      }

      if (diffDays < 7) {
        return `${diffDays}d ago`;
      }

      return new Intl.DateTimeFormat(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      ).format(date);

    },
    []
  );


  const totalComments =
    comments.length +
    (pinnedComment ? 1 : 0);


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div
        className="
          px-6
          py-5
          border-b
          border-[#ECE9F7]
          bg-gradient-to-r
          from-white
          to-[#FCFBFF]
        "
      >

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#F0EDFF]
                flex
                items-center
                justify-center
                border
                border-[#E5DFFF]
              "
            >
              <MessageCircle
                className="
                  w-5
                  h-5
                  text-[#7161EF]
                "
              />
            </div>

            <div>

              <h3
                className="
                  text-xl
                  font-bold
                  text-[#302D46]
                "
              >
                Guestbook
              </h3>

              <p
                className="
                  text-xs
                  text-[#9995AA]
                  mt-0.5
                "
              >
                Leave a thought. Start a conversation.
              </p>

            </div>

          </div>


          <div
            className="
              px-3
              py-1.5
              rounded-full
              bg-[#F3F0FF]
              text-[#7161EF]
              text-xs
              font-semibold
            "
          >
            {totalComments}{" "}
            {totalComments === 1
              ? "message"
              : "messages"}
          </div>

        </div>

      </div>


      {/* ================= BODY ================= */}

      <div className="p-6">

        {/* FORM */}

        <div
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <CommentForm
            onSubmit={handleCommentSubmit}
            isSubmitting={isSubmitting}
            error={error}
          />
        </div>


        {/* DIVIDER */}

        <div className="flex items-center gap-4 my-6">

          <div className="h-px flex-1 bg-[#ECE9F7]" />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.15em]
              font-semibold
              text-[#AAA6B7]
            "
          >
            Recent thoughts
          </span>

          <div className="h-px flex-1 bg-[#ECE9F7]" />

        </div>


        {/* COMMENTS */}

        <div
          className="
            min-h-[150px]
            max-h-[230px]
            overflow-y-auto
            overflow-x-hidden
            space-y-3
            pr-1
            custom-scrollbar
          "
        >

          {/* PINNED */}

          {pinnedComment && (
            <Comment
              comment={pinnedComment}
              formatDate={formatDate}
              isPinned={true}
            />
          )}


          {/* EMPTY */}

          {comments.length === 0 &&
          !pinnedComment ? (

            <div
              className="
                min-h-[150px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                rounded-xl
                bg-[#FBFAFF]
                border
                border-dashed
                border-[#E3DDF7]
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#F0EDFF]
                  flex
                  items-center
                  justify-center
                  mb-3
                "
              >
                <MessageCircle
                  className="
                    w-5
                    h-5
                    text-[#7161EF]
                  "
                />
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-[#625D76]
                "
              >
                Nothing here yet.
              </p>

              <p
                className="
                  text-xs
                  text-[#A19DAF]
                  mt-1
                "
              >
                Be the first to say something.
              </p>

            </div>

          ) : (

            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                formatDate={formatDate}
                isPinned={false}
              />
            ))

          )}

        </div>

      </div>


      {/* ================= SCROLLBAR ================= */}

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #F5F3FA;
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #C9C2EC;
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9E94E5;
          }
        `}
      </style>

    </div>
  );
};

export default Komentar;