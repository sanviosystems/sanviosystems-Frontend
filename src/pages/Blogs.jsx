import React from 'react';
import { useNavigate } from 'react-router-dom';

const blogData = [
  {
    path: '/best_thermal_tvse_printers_sanviosystems',
    title: 'Best Thermal TVSE Printers by Sanvio Systems: Price, Performance & Support ',
    description: 'In the world of retail, hospitality, logistics, warehouse, restaurants, use of POS (Point of Sale) systems and thermal printers have become indispensable. They are fast, reliable, and cost-effective. Sanvio Systems,   ',
    image: '/best-thermal-tvse-printers-sanvio-systems.jpg',
    category: 'TVSE Thermal Printers  ',
    date: 'Oct 06, 2025'
  },
  {
    path: '/TVS_E_Label_Printers',
    title: 'TVS-E Label Printers for Business – By Sanvio Systems ',
    description: ' Efficient labeling is the backbone of retail,logistics, e-commerce, and manufacturing. TVS-E range of label printers, offered by Sanvio Systems,is designed to deliver speed, accuracy, and reliability forfor',
    image: '/Best Label Printer Range.jpg',
    category: 'Label Printers ',
    date: 'Sep 19, 2025'
  },
  {
    path: '/Sanvio_systems_digital_retail',
    title: 'Sanvio Systems Driving Retail Digital Transformation ',
    description: ' Sanvio Systems drives retail digital transformation with AI, IoT and automation, helping stores cut costs, boost efficiency and improve customer experience.',
    image: '/Sanvio_systems_digital_retail.jpeg',
    category: 'Artificial Intelligence ',
    date: 'Aug 28, 2025'
  },

  {
    path: '/why_every_retail_business_needs_modern_pos_solution',
    title: 'Why Every Retail Business Needs a Modern POS Solution ',
    description: 'Discover why a modern POS system is essential for retail success. Improve billing, inventory & customer experience with smart, reliable POS solutions. Established in 1992, Sanvio Systems is a leading distributor and service provider specializing in Point-of-Sale (POS) products. Located in Ludhiana, Punjab, the company has built a strong reputation for delivering high-quality office automation & IT solutions, POS solutions, business process re-engineering for increased productivity, customized solutions tailored to meet the diverse needs of businesses across various industries.',
    image: '/Modern_POS_Solution.jpeg',
    category: 'POS Solution ',
    date: 'July 24, 2025'
  },


  {
    path: '/Office_automation_pos_solutions_ludhiana',
    title: 'Benefits of Office Automation & POS Solutions by TVS Distributor   ',
    description: " Streamline your business with Sanvio Systems Ludhiana. Get smart Office Automation & POS Solutions from TVS Electronics Ltd. In today’s competitive business environment, automation isn’t a luxury — it’s a necessity. Whether you’re running a retail store, restaurant, or office, smart automation tools can help reduce operational inefficiencies, improve accuracy, and boost profitability. ",
    image: '/POS billing terminals.jpeg',
    category: 'Office Automation ',
    date: 'July 15, 2025'
  },
  {
    path: '/SanvioSystems_Trusted_Office_Automation',
    title: 'Sanvio Systems: Trusted Office Automation & POS Partner ',
    description: ' Sanvio Systems, established in 1992, is a premier IT solutions provider, POS systems and office automation specialist located at 353/14/1 Dr. Hira Singh Road, Civil Lines, Ludhiana, Punjab.Trusted Office Automation & POS Partner Under the leadership of Proprietor Mr. Sandeep Mahajan, the company delivers holistic services and hardware solutions tailored for retail businesses and enterprises alike. As an authorized distributor and service center for TVS Electronics, they offer everything from thermal label printers and barcode scanners to cash counting machines - all backed by professional, qualified support team.',
    image: '/POS.jpeg',
    category: 'POS Solution',
    date: 'July 14, 2025'
  },
  {
    path: '/Sanvio_office_automation_solutions',
    title: 'Sanvio Systems: Your Trusted Partner in Office Automation Excellence',
    description: 'In today’s fast-paced business world, efficiency is the cornerstone of success. All organisations, big or small are constantly seeking innovative solutions to streamline operations, reduce costs, and boost productivity. Enter Sanvio Systems -a name synonymous with reliability,trustworthiness, and unparalleled after-sales service in the realm of office automation and IT services. For businesses looking to future-proof their workflows, isn’t just a vendor; they’re a partner committed to empowering your success.',
    image: '/office-automation-sanvio-1.jpg',
    category: 'Automation',
    date: 'June 25, 2025'
  },
  {
    path: '/Sanvio_systems_tvs_authorized_partner',
    title: 'Sanvio Systems: Trusted TVS Electronics Authorized Partner with Over 30 Years of Excellence',
    description: 'In the rapidly evolving world of technology and office automation, very few names stand the test of time with consistent reliability and customer trust. One such name is Sanvio Systems — a TVS Electronics Authorized Partner, Distributor, and Service Centre, with more than three decades of experience in the Information Technology and Office Automation industry.',
    image: '/Trusted_TVS.jpg',
    category: 'Technology',
    date: 'June 23, 2025'
  },
  {
    path: '/Sanvio_systems_ludhiana_retail_technology',
    title: 'Sanvio Systems, Ludhiana : Revolutionizing Retail Businesses with Cutting-Edge Technology',
    description: 'In today’s fast-paced world, businesses, both big and small, rely on efficient technology solutions to streamline their operations, enhance productivity, and improve customer experiences.',
    image: '/img_2.jpg',
    category: 'Technology',
    date: 'June 20, 2025'
  },
  {
    path: '/Revolutionizing_it_automation_ludhiana_sanvio',
    title: 'Sanvio Systems, Ludhiana : Revolutionizing Information Technology and Office Automation Solutions',
    description: 'In todays fast- paced world, businesses across various sectors rely heavily on technology to streamline operations and ensure seamless service delivery.One company that has been at the forefront of this transformation in the field of Information Technology and office automation is Sanvio Systems.',
    image: '/Pos_Systems.jpg',
    category: 'Technology',
    date: 'June 18, 2025'
  },
  {
    path: '/Sanvio_systems_business_automation_efficiency_solutions',
    title: 'Sanvio Systems - Redefining Business Efficiency Through Automation',
    description: 'Simplify, Optimize, Succeed — Sanvio Systems, located in Ludhiana, Punjab, stands out as a premier authorized distributor and service center for TVS Electronics Ltd. This company has made significant strides in the fields of information technology and office automation, earning a reputation for its innovation, ethical practices, and robust implementation strategies.',
    image: '/img_4.jpeg',
    category: 'Business Solutions',
    date: 'June 15, 2025'
  },

];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .blogs-container {
          margin: 80px auto;
          max-width: 1200px;
          padding: 20px;
          
        }
           .blogs-container p {
    text-align: justify;
  }
        
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .section-title {
          font-size: 2.5rem;
          color: #2d3748;
          margin-bottom: 15px;
          font-weight: 700;
          position: relative;
          display: inline-block;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          width: 50%;
          height: 4px;
          background: linear-gradient(90deg, #ff5722, #ff9800);
          bottom: -10px;
          left: 25%;
          border-radius: 2px;
        }
        
        .section-subtitle {
          color: #718096;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* thoda crop hoga par UI better lagegi */
}

.card-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #2d3748;
  font-weight: 600;
}

.card-excerpt {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* only 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.read-more-btn {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: white;
  color: #ff5722;
  border: 1px solid #ff5722;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background-color: #ff5722;
  color: white;
}

        
        .read-more-btn::after {
          content: '→';
          margin-left: 8px;
          transition: transform 0.3s ease;
        }
        
        .read-more-btn:hover::after {
          transform: translateX(3px);
        }
        
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="blogs-container">
        <div className="section-header">
          <h2 className="section-title">Latest Articles</h2>

        </div>

        <div className="blog-grid">
          {blogData.map((blog, index) => (
            <div className="blog-card" key={index}>
              <div className="card-image-container">
                <img src={blog.image} alt={blog.title} className="card-image" />
                <div className="card-meta">
                  <span className="category-badge">{blog.category}</span>
                  <span className="card-date">{blog.date}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{blog.title}</h3>
                <p className="card-excerpt">{blog.description}</p>
                <button
                  className="read-more-btn"
                  onClick={() => navigate(blog.path)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;