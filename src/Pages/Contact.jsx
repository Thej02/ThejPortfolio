import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
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
      submitData.append("_subject", "New Message from Portfolio Website");
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
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]">

      {/* ================= HEADER ================= */}
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">

        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto"
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
          data-aos-duration="1100"
          className="text-[#7B7790] max-w-2xl mx-auto text-sm md:text-base mt-3 leading-relaxed"
        >
          Got an idea? Wanna build something cool? Drop me a message and
          let's make it happen.
        </p>
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div
        className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-8 lg:gap-10">

          {/* ================= CONTACT CARD ================= */}
          <div
            className="
              bg-white
              rounded-[28px]
              border border-[#E8E3FF]
              shadow-[0_20px_60px_rgba(99,102,241,0.08)]
              p-5 py-10 sm:p-10
              transition-all duration-500
              hover:shadow-[0_25px_70px_rgba(99,102,241,0.12)]
            "
          >

            {/* Card Header */}
            <div className="flex justify-between items-start mb-8">

              <div>
                <h2
                  className="
                    text-4xl
                    font-bold
                    mb-3
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-[#7161EF]
                    to-[#A855F7]
                  "
                >
                  Say hi
                </h2>

                <p className="text-[#77738A] leading-relaxed">
                  Got a project, idea, or just wanna say hey? I'm all ears.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F0EDFF]">
                <Share2 className="w-7 h-7 text-[#7161EF]" />
              </div>
            </div>

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Name */}
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
                    text-[#9995AA]
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
                  className="
                    w-full
                    p-4
                    pl-12
                    bg-[#F8F7FF]
                    rounded-xl
                    border
                    border-[#E8E3FF]
                    placeholder-[#9995AA]
                    text-[#302D46]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#7161EF]/20
                    focus:border-[#7161EF]
                    transition-all
                    duration-300
                    hover:border-[#B8B0F0]
                    disabled:opacity-50
                  "
                  required
                />
              </div>

              {/* Email */}
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
                    text-[#9995AA]
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
                  className="
                    w-full
                    p-4
                    pl-12
                    bg-[#F8F7FF]
                    rounded-xl
                    border
                    border-[#E8E3FF]
                    placeholder-[#9995AA]
                    text-[#302D46]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#7161EF]/20
                    focus:border-[#7161EF]
                    transition-all
                    duration-300
                    hover:border-[#B8B0F0]
                    disabled:opacity-50
                  "
                  required
                />
              </div>

              {/* Message */}
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
                    text-[#9995AA]
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
                  className="
                    w-full
                    resize-none
                    p-4
                    pl-12
                    bg-[#F8F7FF]
                    rounded-xl
                    border
                    border-[#E8E3FF]
                    placeholder-[#9995AA]
                    text-[#302D46]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#7161EF]/20
                    focus:border-[#7161EF]
                    transition-all
                    duration-300
                    hover:border-[#B8B0F0]
                    h-[9.9rem]
                    disabled:opacity-50
                  "
                  required
                />
              </div>

              {/* Submit */}
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  bg-gradient-to-r
                  from-[#7161EF]
                  to-[#A855F7]
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-lg
                  hover:shadow-[#7161EF]/20
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-2
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                "
              >
                <Send className="w-5 h-5" />

                {isSubmitting ? "Sending it..." : "Let's Talk"}
              </button>

            </form>

            {/* Social Links */}
            <div className="mt-10 pt-6 border-t border-[#ECE9F7] flex justify-center">
              <SocialLinks />
            </div>

          </div>

          {/* ================= COMMENTS ================= */}
          <div
            className="
              bg-white
              rounded-[28px]
              border border-[#E8E3FF]
              shadow-[0_20px_60px_rgba(99,102,241,0.08)]
              p-3
              md:p-5
              transition-all duration-500
              hover:shadow-[0_25px_70px_rgba(99,102,241,0.12)]
            "
          >
            <Komentar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;