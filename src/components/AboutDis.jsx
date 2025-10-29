import React from "react";
import { motion } from "framer-motion";

// ➕ Sections Data
const sections = [
  {
    title: "About Us",
    desc: "Sanvio Systems, Ludhiana is a dynamic group of skilled professionals driven by a shared passion for technology and innovation. Led by Er. Sandeep Mahajan, a visionary and seasoned industry expert with over 30 years of experience in IT and office automation, we stay at the forefront of technological advancements and our team brings deep expertise and insight to every project. As an authorized distributor and service center for TVS Electronics, we deliver reliable, future-ready solutions that are tailored to the unique needs of each client. With a focus on innovation, collaboration, and customer success, Sanvio Systems is a trusted partner for businesses looking to streamline and enhance their operations through technology.",
    img: "/Aboutus.jpg",
  },
  {
    title: "Our Mission",
    desc: "At Sanvio Systems Ludhiana, our mission is to deliver cutting-edge IT products, services, and office automation solutions that simplify business processes, enhance operational efficiency, and drive sustainable growth, while staying deeply committed to customer-centric innovation and personalized service",
    img: "/Mission.jpg",
    reverse: true,
  },
  {
    title: "Our Vision",
    desc: "To be a leader in Information Technology and office automation solutions, empowering businesses and individuals with innovative, reliable, and sustainable technology that drives efficiency, productivity, and growth.",
    img: "/Vision.jpg",
  },
  {
    title: "Our Core Values",
    desc: (
      <>
        1. Integrity: Committing to transparency and trust in all our actions. <br />
        2. Innovation: Embracing creativity and staying ahead in an ever-evolving tech landscape. <br />
        3. Customer-Centricity: Putting our clients at the center of everything we do. <br />
        4. Teamwork: Fostering a collaborative and inclusive environment for employees and partners alike. <br />
        5. Adaptability: Responding quickly and effectively to market shifts and client needs with agile solutions.
      </>
    ),
    img: "/Values.jpg",
    reverse: true,
  },
];

// 🔧 Main Component
const AboutDis = () => {
  return (
    <>
      {/* ✅ Marquee Section */}
      <div className="marquee-wrapper">
        <div className="marquee-content">
          Authorised Distributor and Service Center - TVS Electronics Limited
          <img src="tvs.png" alt="TVS Electronics Logo" className="marquee-logo" />
          • We cater to a wide range of industries with scalable, secure, and user-centric solutions.
          <img src="tvs.png" alt="TVS Electronics Logo" className="marquee-logo" />
          • We specialize in delivering innovative technology solutions designed to optimize business performance and drive digital transformation.
          <img src="tvs.png" alt="TVS Electronics Logo" className="marquee-logo" />
        </div>
      </div>

      {/* ✅ Main About Sections */}
      <div className="about-container">
        {sections.map(({ title, desc, img, reverse }, index) => (
          <motion.div
            key={index}
            className={`about-section ${reverse ? "reverse" : ""}`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="about-text">
              <h3 className="about-title">{title}</h3>
              <p className="about-desc">{desc}</p>
            </div>
            <motion.div className="about-image" whileHover={{ scale: 1.1 }}>
              <img src={img} alt={title} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AboutDis;

// ✅ Inject CSS
const styles = `
/* 🔄 Marquee Section */
.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background-color: rgb(183, 28, 28);
  color: #fff;
  padding: 10px 0;
}

.marquee-content {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 20s linear infinite;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.marquee-logo {
  height: 24px;
  margin: 0 10px;
  vertical-align: middle;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

/* 📄 Main Content Section */
.about-container {
  width: 100%;
  background: url('/background-3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 80px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
  padding: 50px;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  transition: transform 0.3s ease-in-out;
}

.about-section.reverse {
  flex-direction: row-reverse;
}

.about-text {
  flex: 1;
  text-align: justify;
  padding: 20px;
}

.about-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.about-desc {
  font-size: 18px;
  color: #555;
  line-height: 1.8;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.about-image img:hover {
  transform: scale(1.1);
}

/* 📱 Mobile Responsive */
@media (max-width: 768px) {
  .about-section {
    flex-direction: column !important;
    text-align: center;
    padding: 30px;
  }

  .about-image img {
    max-width: 300px;
  }

  .marquee-text {
    font-size: 1.1rem;
  }
}
`;

const styleTag = document.createElement("style");
styleTag.type = "text/css";
styleTag.appendChild(document.createTextNode(styles));
document.head.appendChild(styleTag);
