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
  ({ comment, formatDate, index, isPinned = false }) => (
    <div
      className={`
        px-4
        pt-4
        pb-3
        rounded-xl
        border
        transition-all
        group
        hover:shadow-md
        hover:-translate-y-0.5

        ${
          isPinned
            ? `
              bg-gradient-to-r
              from-[#F0EDFF]
              to-[#F8F2FF]
              border-[#C9C1F5]
              hover:from-[#EBE7FF]
              hover:to-[#F5ECFF]
            `
            : `
              bg-[#FAF9FF]
              border-[#E8E3FF]
              hover:bg-[#F7F5FF]
            `
        }
      `}
    >

      {/* Pinned label */}
      {isPinned && (
        <div className="flex items-center gap-2 mb-3 text-[#7161EF]">
          <Pin className="w-4 h-4" />

          <span className="text-xs font-semibold uppercase tracking-wide">
            Pinned Comment
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">

        {/* Profile */}
        {comment.profile_image ? (
          <img
            src={comment.profile_image}
            alt={`${comment.user_name}'s profile`}
            className={`
              w-10
              h-10
              rounded-full
              object-cover
              border-2
              flex-shrink-0

              ${
                isPinned
                  ? "border-[#7161EF]/50"
                  : "border-[#B8B0F0]"
              }
            `}
            loading="lazy"
          />
        ) : (
          <div
            className={`
              p-2
              rounded-full
              text-[#7161EF]
              transition-colors

              ${
                isPinned
                  ? "bg-[#7161EF]/15"
                  : "bg-[#7161EF]/10"
              }

              group-hover:bg-[#7161EF]/20
            `}
          >
            <UserCircle2 className="w-5 h-5" />
          </div>
        )}

        {/* Content */}
        <div className="flex-grow min-w-0">

          <div className="flex items-center justify-between gap-4 mb-2">

            <div className="flex items-center gap-2">

              <h4
                className={`
                  font-medium
                  truncate

                  ${
                    isPinned
                      ? "text-[#51458F]"
                      : "text-[#39354F]"
                  }
                `}
              >
                {comment.user_name}
              </h4>

              {isPinned && (
                <span
                  className="
                    px-2
                    py-0.5
                    text-xs
                    bg-[#7161EF]/10
                    text-[#7161EF]
                    rounded-full
                    font-medium
                  "
                >
                  Admin
                </span>
              )}

            </div>

            <span className="text-xs text-[#A19DAF] whitespace-nowrap">
              {formatDate(comment.created_at)}
            </span>

          </div>

          <p className="text-[#6F6A82] text-sm break-words leading-relaxed relative bottom-2">
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


    /* -----------------------------
       IMAGE CHANGE
    ----------------------------- */

    const handleImageChange = useCallback((e) => {
      const file = e.target.files[0];

      if (!file) return;


      // File size
      if (file.size > 5 * 1024 * 1024) {
        alert(
          "File size must be less than 5MB. Please choose a smaller image."
        );

        if (e.target) {
          e.target.value = "";
        }

        return;
      }


      // File type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");

        if (e.target) {
          e.target.value = "";
        }

        return;
      }


      setImageFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }, []);


    /* -----------------------------
       TEXTAREA
    ----------------------------- */

    const handleTextareaChange = useCallback((e) => {
      setNewComment(e.target.value);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";

        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, []);


    /* -----------------------------
       SUBMIT
    ----------------------------- */

    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();

        if (!newComment.trim() || !userName.trim()) {
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
          textareaRef.current.style.height = "auto";
        }
      },
      [newComment, userName, imageFile, onSubmit]
    );


    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ================= NAME ================= */}

        <div
          className="space-y-2"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <label className="block text-sm font-medium text-[#5F5B73]">
            Name <span className="text-red-400">*</span>
          </label>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            maxLength={15}
            placeholder="What should we call you?"
            className="
              w-full
              p-3.5
              rounded-xl
              bg-[#F8F7FF]
              border
              border-[#E8E3FF]
              text-[#302D46]
              placeholder-[#9995AA]
              focus:outline-none
              focus:border-[#7161EF]
              focus:ring-2
              focus:ring-[#7161EF]/15
              transition-all
              hover:border-[#B8B0F0]
            "
            required
          />
        </div>


        {/* ================= MESSAGE ================= */}

        <div
          className="space-y-2"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="flex items-center justify-between">

            <label className="block text-sm font-medium text-[#5F5B73]">
              Message <span className="text-red-400">*</span>
            </label>

            <span className="text-xs text-[#A19DAF]">
              {newComment.length}/200
            </span>

          </div>

          <textarea
            ref={textareaRef}
            value={newComment}
            maxLength={200}
            onChange={handleTextareaChange}
            placeholder="What's on your mind?"
            className="
              w-full
              p-4
              rounded-xl
              bg-[#F8F7FF]
              border
              border-[#E8E3FF]
              text-[#302D46]
              placeholder-[#9995AA]
              focus:outline-none
              focus:border-[#7161EF]
              focus:ring-2
              focus:ring-[#7161EF]/15
              transition-all
              resize-none
              min-h-[120px]
              hover:border-[#B8B0F0]
            "
            required
          />
        </div>


        {/* ================= PROFILE PHOTO ================= */}

        <div
          className="space-y-2"
          data-aos="fade-up"
          data-aos-duration="1400"
        >

          <label className="block text-sm font-medium text-[#5F5B73]">
            Profile Photo{" "}
            <span className="text-[#A19DAF]">
              (optional)
            </span>
          </label>


          <div
            className="
              flex
              items-center
              gap-4
              p-4
              bg-[#F8F7FF]
              border
              border-[#E8E3FF]
              rounded-xl
            "
          >

            {imagePreview ? (

              <div className="flex items-center gap-4">

                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="
                    w-16
                    h-16
                    rounded-full
                    object-cover
                    border-2
                    border-[#7161EF]/40
                  "
                />

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
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-red-50
                    text-red-500
                    hover:bg-red-100
                    transition-all
                  "
                >
                  <X className="w-4 h-4" />

                  <span>
                    Remove Photo
                  </span>
                </button>

              </div>

            ) : (

              <div className="w-full">

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
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-3
                    rounded-xl
                    bg-[#F0EDFF]
                    text-[#7161EF]
                    hover:bg-[#E7E2FF]
                    transition-all
                    border
                    border-dashed
                    border-[#B8B0F0]
                    hover:border-[#7161EF]
                    group
                  "
                >

                  <ImagePlus
                    className="
                      w-5
                      h-5
                      group-hover:scale-110
                      transition-transform
                    "
                  />

                  <span>
                    Choose Profile Photo
                  </span>

                </button>

                <p className="text-center text-[#A19DAF] text-xs mt-2">
                  Max file size: 5MB
                </p>

              </div>
            )}

          </div>
        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div
            className="
              flex
              items-center
              gap-2
              p-4
              text-red-500
              bg-red-50
              border
              border-red-100
              rounded-xl
            "
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />

            <p className="text-sm">
              {error}
            </p>
          </div>
        )}


        {/* ================= SUBMIT ================= */}

        <button
          type="submit"
          disabled={isSubmitting}
          data-aos="fade-up"
          data-aos-duration="1000"
          className="
            relative
            w-full
            h-12
            bg-gradient-to-r
            from-[#7161EF]
            to-[#A855F7]
            rounded-xl
            font-medium
            text-white
            overflow-hidden
            group
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-lg
            hover:shadow-[#7161EF]/20
            active:scale-[0.98]
            disabled:opacity-50
            disabled:hover:scale-100
            disabled:cursor-not-allowed
          "
        >

          <div
            className="
              absolute
              inset-0
              bg-white/20
              translate-y-12
              group-hover:translate-y-0
              transition-transform
              duration-300
            "
          />

          <div className="relative flex items-center justify-center gap-2">

            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />

                <span>
                  Posting...
                </span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />

                <span>
                  Post Comment
                </span>
              </>
            )}

          </div>
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
      duration: 1000,
    });
  }, []);


  /* =====================================================
     FETCH PINNED COMMENT
  ===================================================== */

  useEffect(() => {

    const fetchPinnedComment = async () => {

      try {

        const { data, error } = await supabase
          .from("portfolio_comments")
          .select("*")
          .eq("is_pinned", true)
          .single();

        if (error && error.code !== "PGRST116") {
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
     FETCH COMMENTS + REALTIME
  ===================================================== */

  useEffect(() => {

    const fetchComments = async () => {

      try {

        const { data, error } = await supabase
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
        "Failed to subscribe to comments channel:",
        err.message
      );

    }


    return () => {

      if (subscription) {

        try {
          subscription.unsubscribe();
        } catch (err) {
          console.error(
            "Error unsubscribing comments channel:",
            err
          );
        }

      }

    };

  }, []);


  /* =====================================================
     UPLOAD IMAGE
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
          .upload(filePath, imageFile);


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
                profile_image: profileImageUrl,
                is_pinned: false,
                created_at:
                  new Date().toISOString(),
              },
            ]);


        if (error) {
          throw error;
        }

      } catch (error) {

        setError(
          "Failed to post comment. Please try again."
        );

        console.error(
          "Error adding comment:",
          error
        );

      } finally {

        setIsSubmitting(false);

      }

    },
    [uploadImage]
  );


  /* =====================================================
     DATE FORMAT
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
          (now - date) /
            (1000 * 60)
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


  /* =====================================================
     TOTAL COMMENTS
  ===================================================== */

  const totalComments =
    comments.length +
    (pinnedComment ? 1 : 0);


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      className="
        w-full
        bg-white
        rounded-[24px]
      "
      data-aos="fade-up"
      data-aos-duration="1000"
    >

      {/* ================= HEADER ================= */}

      <div
        className="
          px-5
          pt-5
          pb-4
          border-b
          border-[#ECE9F7]
        "
        data-aos="fade-down"
        data-aos-duration="800"
      >

        <div className="flex items-center gap-3">

          <div
            className="
              p-2.5
              rounded-xl
              bg-[#F0EDFF]
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
                font-semibold
                text-[#302D46]
              "
            >
              Comments{" "}

              <span className="text-[#7161EF]">
                ({totalComments})
              </span>
            </h3>

            <p className="text-xs text-[#A19DAF] mt-0.5">
              Leave a thought. Start a conversation.
            </p>

          </div>

        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="p-5 space-y-6">

        {/* Error */}
        {error && (
          <div
            className="
              flex
              items-center
              gap-2
              p-4
              text-red-500
              bg-red-50
              border
              border-red-100
              rounded-xl
            "
            data-aos="fade-in"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />

            <p className="text-sm">
              {error}
            </p>
          </div>
        )}


        {/* Comment Form */}
        <div>
          <CommentForm
            onSubmit={handleCommentSubmit}
            isSubmitting={isSubmitting}
            error={error}
          />
        </div>


        {/* ================= COMMENTS LIST ================= */}

        <div
          className="
            space-y-4
            h-[328px]
            overflow-y-auto
            overflow-x-hidden
            custom-scrollbar
            pt-1
            pr-1
          "
          data-aos="fade-up"
          data-aos-delay="200"
        >

          {/* Pinned */}
          {pinnedComment && (
            <div
              data-aos="fade-down"
              data-aos-duration="800"
            >
              <Comment
                comment={pinnedComment}
                formatDate={formatDate}
                index={0}
                isPinned={true}
              />
            </div>
          )}


          {/* Regular Comments */}

          {comments.length === 0 &&
          !pinnedComment ? (

            <div
              className="text-center py-8"
              data-aos="fade-in"
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-[#F0EDFF]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                "
              >

                <UserCircle2
                  className="
                    w-7
                    h-7
                    text-[#7161EF]
                  "
                />

              </div>

              <p
                className="
                  text-[#77738A]
                  text-sm
                "
              >
                No comments yet. Start the conversation.
              </p>

            </div>

          ) : (

            comments.map(
              (comment, index) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  formatDate={formatDate}
                  index={
                    index +
                    (pinnedComment ? 1 : 0)
                  }
                  isPinned={false}
                />
              )
            )

          )}

        </div>

      </div>


      {/* ================= CUSTOM SCROLLBAR ================= */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: #F4F2FA;
              border-radius: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #C8C1EF;
              border-radius: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #9E94E5;
            }
          `,
        }}
      />

    </div>
  );
};


export default Komentar;