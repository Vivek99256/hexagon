import styles from '../styles/job-industries-grid.module.css';// Assuming CSS module is in the same directory or adjust the path

const SkillManagement = () => {
  const industries = [
    "Agriculture, Food and Natural Resources",
    "Architecture and Construction",
    "Arts, Audio/Video Technology and Communication",
    "Business Management and Administration",
    "Education and Training",
    "Finance",
    "Government and Public Administration",
    "Health Science",
    "Hospitality and Tourism",
    "Human Services",
    "Information Technology",
  ];

  const jobProfiles = [
    "Agribusiness System",
    "Animal System",
    "Environmental Service System",
    "Food Products & Processing System",
    "Natural Resource System",
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EMPLOYEE SKILL MANAGEMENT</h1>
      <div className={styles.content}>
        {/* Industries List */}
        <div className={styles.industries}>
          <h2>INDUSTRIES</h2>
          <ul>
            {industries.map((industry, index) => (
              <li key={index}>{industry}</li>
            ))}
          </ul>
        </div>

        {/* Job Profiles Diagram */}
        <div className={styles.diagram}>
          <div className={styles.industryBox}>
            Agriculture, Food and Natural Resources
          </div>
          <div className={styles.jobProfiles}>
            {jobProfiles.map((profile, index) => (
              <div key={index} className={styles.profileBox}>
                {profile}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.industryDot}></span> Industry
            </div>
            <div className={styles.legendItem}>
              <span className={styles.profileDot}></span> Job Profiles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillManagement;