import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior Developer</h4>
                <h5>W3D technologies pvt. ltd.</h5>
              </div>
              <h3>2015</h3>
            </div>
            <p>
              Managed admin panels using Core PHP and MySQL for various clients.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lab Assistant</h4>
                <h5>Prime institute of engineering and technology</h5>
              </div>
              <h3>2016</h3>
            </div>
            <p>
              Supported students with technical issues and maintained laboratory equipment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Junior Developer</h4>
                <h5>Lemon technologies pvt. ltd.</h5>
              </div>
              <h3>2017</h3>
            </div>
            <p>
              Developed applications using Core PHP, Laravel, and Ionic with Angular.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Developer</h4>
                <h5>Solution squares</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading development with React Native, React JS, Ionic, Angular, MySQL, MongoDB, and Firebase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
