import React, { useState, useEffect } from "react";
import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 900,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending it...",
      html: "Give me a moment while your message makes its way over.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formSubmitUrl =
        "https://formsubmit.co/thejaswinayak05@gmail.com";

      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);

      submitData.append(
        "_subject",
        "New Message from Portfolio Website"
      );

      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Message sent.",
        text: "Got it. I'll get back to you soon.",
        icon: "success",
        confirmButtonColor: "#7161EF",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: "Message sent.",
          text: "Got it. I'll get back to you soon.",
          icon: "success",
          confirmButtonColor: "#7161EF",
          timer: 2000,
          timerProgressBar: true,
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Something went wrong.",
          text: "Couldn't send that right now. Try again in a bit.",
          icon: "error",
          confirmButtonColor: "#7161EF",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[7%] lg:px-[10%]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="
          text-center
          mt-10
          lg:mt-[5%]
          mb-8
          sm:px-0
          px-[5%]
        "
      >
        <h2
          data-aos="fade-down"
          data-aos-duration="900"
          className="
            inline-block
            text-4xl
            md:text-5xl
            font-bold
          "
        >
          <span
            style={{
              backgroundImage:
                "linear-gradient(45deg, #7161EF 10%, #A855F7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let's Talk
          </span>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1000"
          className="
            text-[#7B7790]
            max-w-xl
            mx-auto
            text-sm
            md:text-base
            mt-3
            leading-relaxed
          "
        >
          Got an idea? Wanna build something cool? Drop me a
          message and let's make it happen.
        </p>
      </div>


      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <div
        id="Contact"
        className="
          py-6
          lg:py-8
          flex
          justify-center
        "
      >

        <div
          className="
            w-full
            max-w-[700px]
            mx-auto
          "
        >

          {/* =================================================
              CONTACT CARD
          ================================================= */}

          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="
              bg-white
              rounded-[28px]
              border
              border-[#E8E3FF]
              shadow-[0_20px_60px_rgba(99,102,241,0.08)]
              p-6
              sm:p-8
              md:p-10
              transition-all
              duration-500
              hover:shadow-[0_25px_70px_rgba(99,102,241,0.12)]
            "
          >

            {/* =============================================
                CARD HEADER
            ============================================= */}

            <div
              className="
                flex
                items-start
                justify-between
                mb-8
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#8B82C8]
                    mb-2
                  "
                >
                  Get in touch
                </p>

                <h2
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-[#7161EF]
                    to-[#A855F7]
                  "
                >
                  Let's Build
                </h2>

                <p
                  className="
                    text-[#77738A]
                    text-sm
                    sm:text-base
                    leading-relaxed
                    mt-2
                    max-w-md
                  "
                >
                  Got a project, idea, or something interesting
                  in mind? I'm all ears.
                </p>

              </div>


              {/* Share Icon */}

              <div
                className="
                  p-3
                  rounded-2xl
                  bg-[#F0EDFF]
                  border
                  border-[#E3DEFF]
                  flex-shrink-0
                "
              >
                <Share2
                  className="
                    w-6
                    h-6
                    text-[#7161EF]
                  "
                />
              </div>

            </div>


            {/* =============================================
                FORM
            ============================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* =========================================
                  NAME
              ========================================= */}

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >

                <User
                  className="
                    absolute
                    left-4
                    top-4
                    w-5
                    h-5
                    text-[#9D99AF]
                    group-focus-within:text-[#7161EF]
                    transition-colors
                  "
                />

                <input
                  type="text"
                  name="name"
                  placeholder="What should I call you?"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="
                    w-full
                    h-[54px]
                    px-4
                    pl-12
                    rounded-xl
                    bg-[#F8F7FF]
                    border
                    border-[#E6E1FA]
                    text-[#302D46]
                    placeholder-[#9995AA]
                    focus:outline-none
                    focus:border-[#7161EF]
                    focus:ring-4
                    focus:ring-[#7161EF]/10
                    hover:border-[#C7C0EC]
                    transition-all
                    duration-300
                    disabled:opacity-50
                  "
                />

              </div>


              {/* =========================================
                  EMAIL
              ========================================= */}

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >

                <Mail
                  className="
                    absolute
                    left-4
                    top-4
                    w-5
                    h-5
                    text-[#9D99AF]
                    group-focus-within:text-[#7161EF]
                    transition-colors
                  "
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Drop your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="
                    w-full
                    h-[54px]
                    px-4
                    pl-12
                    rounded-xl
                    bg-[#F8F7FF]
                    border
                    border-[#E6E1FA]
                    text-[#302D46]
                    placeholder-[#9995AA]
                    focus:outline-none
                    focus:border-[#7161EF]
                    focus:ring-4
                    focus:ring-[#7161EF]/10
                    hover:border-[#C7C0EC]
                    transition-all
                    duration-300
                    disabled:opacity-50
                  "
                />

              </div>


              {/* =========================================
                  MESSAGE
              ========================================= */}

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >

                <MessageSquare
                  className="
                    absolute
                    left-4
                    top-4
                    w-5
                    h-5
                    text-[#9D99AF]
                    group-focus-within:text-[#7161EF]
                    transition-colors
                  "
                />

                <textarea
                  name="message"
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="
                    w-full
                    h-[160px]
                    resize-none
                    p-4
                    pl-12
                    rounded-xl
                    bg-[#F8F7FF]
                    border
                    border-[#E6E1FA]
                    text-[#302D46]
                    placeholder-[#9995AA]
                    focus:outline-none
                    focus:border-[#7161EF]
                    focus:ring-4
                    focus:ring-[#7161EF]/10
                    hover:border-[#C7C0EC]
                    transition-all
                    duration-300
                    disabled:opacity-50
                  "
                />

              </div>


              {/* =========================================
                  SUBMIT BUTTON
              ========================================= */}

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  h-[54px]
                  rounded-xl
                  bg-gradient-to-r
                  from-[#7161EF]
                  to-[#A855F7]
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-300
                  hover:scale-[1.015]
                  hover:shadow-lg
                  hover:shadow-[#7161EF]/20
                  active:scale-[0.98]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                "
              >

                <Send className="w-5 h-5" />

                {isSubmitting
                  ? "Sending it..."
                  : "Let's Talk"}

              </button>

            </form>


            {/* =============================================
                SOCIAL LINKS
            ============================================= */}

            <div
              className="
                mt-8
                pt-7
                border-t
                border-[#ECE9F7]
              "
            >
              <SocialLinks />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactPage;