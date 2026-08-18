import { useEffect } from "react";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/thejaswi-nayak",
    color: "#0A66C2",
    bgColor: "#E8F2FF",
    borderColor: "#D5E7FA",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@Thej02",
    icon: Github,
    url: "https://github.com/Thej02",
    color: "#39354F",
    bgColor: "#F0EEF7",
    borderColor: "#E3E0EF",
    gradient: "from-[#39354F] to-[#24212F]",
  },
  {
    name: "Email",
    displayName: "Email Me",
    subText: "thejaswinayak05@gmail.com",
    icon: Mail,
    url: "mailto:thejaswinayak05@gmail.com",
    color: "#E2554D",
    bgColor: "#FFF0EE",
    borderColor: "#F5DCD8",
    gradient: "from-[#EA4335] to-[#C5221F]",
  },
  {
    name: "Phone",
    displayName: "Call Me",
    subText: "+91 7026945878",
    icon: Phone,
    url: "tel:+917026945878",
    color: "#269653",
    bgColor: "#EDF9F1",
    borderColor: "#D8EEDF",
    gradient: "from-[#34A853] to-[#2E7D32]",
  },
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find(
    (link) => link.isPrimary
  );

  const otherLinks = socialLinks.filter(
    (link) => !link.isPrimary
  );

  useEffect(() => {
    AOS.init({
      offset: 10,
      duration: 800,
      once: true,
    });
  }, []);

  const isExternal = (url) =>
    url.startsWith("http");

  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div
        className="flex items-center gap-3 mb-5"
        data-aos="fade-up"
      >
        <span
          className="
            w-9
            h-[3px]
            rounded-full
            bg-gradient-to-r
            from-[#7161EF]
            to-[#A855F7]
          "
        />

        <h3
          className="
            text-sm
            font-semibold
            text-[#4B4760]
            tracking-wide
          "
        >
          Connect with me
        </h3>
      </div>


      {/* ================= LINKEDIN ================= */}

      <a
        href={linkedIn.url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          relative
          flex
          items-center
          justify-between
          p-4
          rounded-2xl
          bg-[#F5F8FF]
          border
          border-[#DCE8F8]
          overflow-hidden
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#EFF5FF]
          hover:border-[#BFD6F2]
          hover:shadow-[0_8px_25px_rgba(10,102,194,0.08)]
        "
        data-aos="fade-up"
        data-aos-delay="100"
      >

        {/* Hover background */}

        <div
          className={`
            absolute
            inset-0
            opacity-0
            group-hover:opacity-[0.04]
            transition-opacity
            duration-300
            bg-gradient-to-r
            ${linkedIn.gradient}
          `}
        />


        {/* Content */}

        <div className="relative flex items-center gap-4">

          {/* Icon */}

          <div
            className="
              w-11
              h-11
              rounded-xl
              flex
              items-center
              justify-center
              bg-[#E1EFFF]
              border
              border-[#D2E5FA]
              transition-all
              duration-300
              group-hover:scale-105
            "
          >
            <linkedIn.icon
              className="w-5 h-5"
              style={{
                color: linkedIn.color,
              }}
            />
          </div>


          {/* Text */}

          <div className="flex flex-col">

            <span
              className="
                text-sm
                font-bold
                text-[#3F3B52]
                tracking-tight
                transition-colors
                duration-300
                group-hover:text-[#0A66C2]
              "
            >
              {linkedIn.displayName}
            </span>

            <span
              className="
                text-xs
                text-[#77738A]
                mt-0.5
              "
            >
              {linkedIn.subText}
            </span>

          </div>

        </div>


        {/* External icon */}

        <div
          className="
            relative
            w-8
            h-8
            rounded-lg
            bg-white
            border
            border-[#E2EAF4]
            flex
            items-center
            justify-center
            opacity-70
            group-hover:opacity-100
            transition-all
            duration-300
          "
        >
          <ExternalLink
            className="
              w-4
              h-4
              text-[#7C7890]
              group-hover:text-[#0A66C2]
              transition-colors
            "
          />
        </div>

      </a>


      {/* ================= OTHER LINKS ================= */}

      <div
        className="
          grid
          grid-cols-3
          gap-3
          mt-3
        "
      >

        {otherLinks.map((link, index) => {

          const Icon = link.icon;

          return (
            <a
              key={link.name}
              href={link.url}
              target={
                isExternal(link.url)
                  ? "_blank"
                  : undefined
              }
              rel={
                isExternal(link.url)
                  ? "noopener noreferrer"
                  : undefined
              }
              className="
                group
                relative
                min-w-0
                p-3
                rounded-xl
                overflow-hidden
                bg-white
                border
                border-[#E8E3FF]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_8px_22px_rgba(99,102,241,0.07)]
              "
              style={{
                "--hover-border": link.borderColor,
              }}
              data-aos="fade-up"
              data-aos-delay={
                200 + index * 100
              }
            >

              {/* Icon */}

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  mb-2.5
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  backgroundColor:
                    link.bgColor,
                }}
              >
                <Icon
                  className="w-[18px] h-[18px]"
                  style={{
                    color: link.color,
                  }}
                />
              </div>


              {/* Text */}

              <div className="min-w-0">

                <p
                  className="
                    text-xs
                    font-bold
                    text-[#4B4760]
                    truncate
                    group-hover:text-[#302D46]
                    transition-colors
                  "
                >
                  {link.displayName}
                </p>

                <p
                  className="
                    text-[10px]
                    text-[#9995AA]
                    mt-0.5
                    truncate
                  "
                >
                  {link.subText}
                </p>

              </div>


              {/* Small arrow */}

              <ExternalLink
                className="
                  absolute
                  top-3
                  right-3
                  w-3
                  h-3
                  text-[#C0BDCA]
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-300
                "
              />

            </a>
          );
        })}

      </div>

    </div>
  );
};

export default SocialLinks;