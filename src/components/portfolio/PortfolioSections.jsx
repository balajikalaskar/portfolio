import { contact } from '../../config/site';


// Add real URLs here to show "Live" / "Code" links under a project.
const projectLinks = {
  smartSpecs: {},
  campusOS: {},
};

const skillGroups = [
  { label: 'Frontend', value: 'React, Redux, Tailwind CSS, JavaScript, HTML and CSS' },
  { label: 'Backend', value: 'Node.js, Express.js, REST APIs' },
  { label: 'Data', value: 'MongoDB, Mongoose, Redis' },
  { label: 'Foundations', value: 'Java, data structures and algorithms, Git, DevOps' },
];

const processSteps = ['Understand', 'Structure', 'Build', 'Refine'];

function SectionLabel({ children }) {
  return <p className="portfolio-label">{children}</p>;
}

function ProjectMeta({ stack, links }) {
  return (
    <div className="project-meta">
      <p className="project-stack">{stack}</p>
      {(links.live || links.code) && (
        <p className="project-links">
          {links.live && <a href={links.live} target="_blank" rel="noreferrer">Live site<span className="sr-only"> (opens in new tab)</span> ↗</a>}
          {links.code && <a href={links.code} target="_blank" rel="noreferrer">Source code<span className="sr-only"> (opens in new tab)</span> ↗</a>}
        </p>
      )}
    </div>
  );
}

function EyewearMark() {
  return (
    <svg viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 45c2-13 11-20 25-20h39c12 0 17 7 18 19l-3 24c-2 14-11 21-26 21H49c-16 0-24-8-27-22l-5-22Z" />
      <path d="M203 45c-2-13-11-20-25-20h-39c-12 0-17 7-18 19l3 24c2 14 11 21 26 21h21c16 0 24-8 27-22l5-22Z" />
      <path d="M99 47c5-7 17-7 22 0M15 42 2 37m203 5 13-5" />
    </svg>
  );
}

function SmartSpecsExhibit() {
  return (
    <div className="project-exhibit specs-exhibit" role="img" aria-label="SmartSpecs storefront drawn in code: a frame catalog with search and wishlist, and a checkout that moves from browse to prescription upload to order.">
      <div className="exhibit-bar">
        <span className="exhibit-brand">SmartSpecs</span>
        <span className="exhibit-search">Search frames</span>
        <span className="exhibit-chip">Wishlist</span>
      </div>
      <div className="specs-product">
        <div className="eyewear-panel"><EyewearMark /></div>
        <div className="specs-product-copy">
          <span className="specs-product-name">Browse eyewear</span>
          <span className="specs-product-note">Filter frames and save them for later.</span>
          <span className="exhibit-actions">
            <span className="exhibit-button">Add to cart</span>
            <span className="exhibit-button exhibit-button-quiet">Save</span>
          </span>
        </div>
      </div>
      <ol className="purchase-flow">
        <li className="is-done"><span className="flow-node" /><strong>Browse</strong><small>Search and wishlist</small></li>
        <li className="is-current"><span className="flow-node" /><strong>Prescription</strong><small>Upload at checkout</small></li>
        <li><span className="flow-node" /><strong>Order</strong><small>Pay and track</small></li>
      </ol>
    </div>
  );
}

function CampusExhibit() {
  return (
    <div className="project-exhibit campus-exhibit" role="img" aria-label="CampusOS workspace drawn in code: a role switcher for students, faculty and admins beside the academic areas each role can reach.">
      <div className="exhibit-bar">
        <span className="exhibit-brand">CampusOS</span>
        <span className="exhibit-chip">Student view</span>
      </div>
      <div className="campus-workspace">
        <div className="campus-role-nav">
          <span className="campus-role campus-role-selected">Student</span>
          <span className="campus-role">Faculty</span>
          <span className="campus-role">Admin</span>
        </div>
        <div className="campus-modules">
          <div className="campus-module"><strong>Subjects</strong><span>Enrolled subjects and materials</span></div>
          <div className="campus-module campus-module-active"><strong>Assignments</strong><span className="exhibit-button">Submit</span></div>
          <div className="campus-module"><strong>Attendance</strong><span>Session records</span></div>
          <div className="campus-module"><strong>Exams and notices</strong><span>Academic updates</span></div>
        </div>
      </div>
    </div>
  );
}

function ProcessLine() {
  return (
    <ol className="process-line" aria-label="How I work">
      {processSteps.map((step) => (
        <li key={step}><span className="process-node" aria-hidden="true" />{step}</li>
      ))}
    </ol>
  );
}

export default function PortfolioSections() {
  return (
    <div className="portfolio-page">
      <section id="work" className="portfolio-section work-section" aria-labelledby="work-title">
        <div className="portfolio-shell">
          <div className="section-intro">
            <div>
              <SectionLabel>02 / Selected work</SectionLabel>
              <h2 id="work-title">Two products.<br />Built around <em>real work.</em></h2>
            </div>
            <p>Full-stack work shaped around the details that make a product usable: clear roles, complete flows, and reliable handling of data.</p>
          </div>

          <article className="project-row">
            <div className="project-copy">
              <p className="project-kind">E-commerce <span className="project-status">Built</span></p>
              <h3>SmartSpecs</h3>
              <p>A full-stack eyewear store, from product discovery to order tracking.</p>
              <ul className="project-features">
                <li>Search, wishlist, cart and checkout</li>
                <li>Prescription upload during checkout</li>
                <li>Admin portal for products, orders and inventory</li>
                <li>bcrypt auth with server-side sessions and Helmet</li>
              </ul>
              <ProjectMeta stack="Node.js · Express.js · MongoDB · Mongoose · EJS" links={projectLinks.smartSpecs} />
            </div>
            <SmartSpecsExhibit />
          </article>

          <article className="project-row project-row-reverse">
            <CampusExhibit />
            <div className="project-copy">
              <p className="project-kind">Academic platform <span className="project-status">In progress</span></p>
              <h3>CampusOS</h3>
              <p>An academic management platform for students, faculty and administrators, built around role-aware access.</p>
              <ul className="project-features">
                <li>Access follows enrollment and teaching assignments</li>
                <li>Subjects, learning materials and notices</li>
                <li>Assignment submission and grading</li>
                <li>Session attendance with historical records</li>
              </ul>
              <ProjectMeta stack="React · Tailwind CSS · Node.js · Express.js · MongoDB" links={projectLinks.campusOS} />
            </div>
          </article>
        </div>
      </section>

      <section id="about" className="portfolio-section about-section" aria-labelledby="about-title">
        <div className="portfolio-shell about-layout">
          <div className="about-copy">
            <SectionLabel>03 / About</SectionLabel>
            <h2 id="about-title">Practical software.<br /><em>Clear foundations.</em></h2>
            <p className="about-lead">I&apos;m a full-stack developer working mainly with the MERN stack. I graduated in 2026 with a Bachelor of Computer Applications in Computer Software Engineering from SRTMU, Nanded, where Java and problem solving became my foundation.</p>
            <p>Making and editing films taught me to care about pacing, sequence and clarity. I bring the same habits to software: understand the problem, give it structure, build it, then refine it.</p>
            <ProcessLine />
          </div>

          <div className="skills-panel">
            <h3 className="skills-title">What I work with</h3>
            <dl className="skill-list">
              {skillGroups.map((group) => (
                <div className="skill-row" key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.value}</dd>
                </div>
              ))}
              <div className="skill-row">
                <dt>Education</dt>
                <dd>BCA, Computer Software Engineering · SRTMU, Nanded · 2023–2026</dd>
              </div>
              <div className="skill-row">
                <dt>Outside code</dt>
                <dd>Filmmaking, video editing, content creation, hackathons and chess</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
        <div className="portfolio-shell contact-layout">
          <div>
            <SectionLabel>04 / Contact</SectionLabel>
            <h2 id="contact-title">Have something<br />worth <em>building?</em></h2>
            <p className="contact-note">For a project, internship or collaboration, the best place to start is a message. I&apos;m based in Nanded, Maharashtra, India.</p>
          </div>
          <ul className="contact-links">
            <li>
              <a href={`mailto:${contact.email}`}>
                <span className="contact-kind">Email</span>
                <strong>{contact.email}</strong>
                <span className="contact-arrow" aria-hidden="true">→</span>
              </a>
            </li>
            <li>
              <a href={contact.linkedin.url} target="_blank" rel="noreferrer">
                <span className="contact-kind">LinkedIn</span>
                <strong>{contact.linkedin.label}<span className="sr-only"> (opens in new tab)</span></strong>
                <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
