/**
 * Single source of truth for portfolio content.
 * Everything here is taken from the CV / LinkedIn export (Profile.pdf), the previous
 * portfolio site, or the certificate images that were already part of that site.
 * Items marked TODO need input from Junaid before they can be shown.
 */
import { assetPath } from "@/lib/utils";
export const site = {
  name: "Junaid Khan",
  title: "Senior Software Engineer",
  tagline: "Building scalable, secure & AI-driven systems",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "junaidk.official7@gmail.com",
  location: "Pakistan",
  careerStart: 2020, // Funprime Technology, March 2020
  cvHref: assetPath("/cv.pdf"),
  githubUser: "JunaidKhan44",
  links: {
    github: "https://github.com/JunaidKhan44",
    linkedin: "https://www.linkedin.com/in/junaid-k-9b386b199/",
    linktree: "https://linktr.ee/junaidk.official7",
    instagram: "https://www.instagram.com/codeandfork/",
    youtube: "https://www.youtube.com/channel/UC45KoRlfYSY_SDAD8_9sywA",
    x: "https://x.com/JunaidK16475114",
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export const roles = [
  "Java · Kotlin · Python",
  "Microservices & Cloud-native",
  "DevSecOps & Enterprise Architecture",
  "Open-source contributor",
];

export const about = {
  summary:
    "Senior Software Engineer and Full-Stack Developer with 6+ years of experience building enterprise applications across open-source platforms, tax ERP, fintech, revenue automation, and mobile solutions, specialising in Java/J2EE, Kotlin, and Python, with expertise in secure APIs, microservices, cloud-native systems, technical leadership, and mentoring.",
  detail:
    "At DataQ Health, I contributed to OpenNMS’s open-source Horizon and its evolution into a cloud-native platform. At PRAL (FBR), I have delivered IRIS tax-system modernisation, NSTR, PRA and POS integrations. I also build Android apps and explore AI/ML with Python.",
  highlights: [
    "OpenNMS Horizon, Meridian, SPoG and cloud-native transformation",
    "Revenue automation and POS integrations & Tax Automation IRIS 2.0/3.0, NSTR and PRA",
    "Python and exploration of AI/ML technologies",
    "Technical leadership, mentoring and full-stack engineering.",
  ],
};

export type SkillGroup = { title: string; icon: string; items: string[] };
// export const skills: SkillGroup[] = [
//   { title: "Languages", icon: "{ }", items: ["Java (JDK 17+)", "Kotlin", "Python", "TypeScript", "JavaScript", "PL/SQL"] },
//   { title: "Backend & APIs", icon: "⚙", items: ["Spring Boot", "Spring Cloud", "J2EE", "Hibernate", "GraphQL", "gRPC", "WSO2", "Keycloak"] },
//   { title: "Architecture & Messaging", icon: "◇", items: ["Microservices", "Apache Kafka", "Apache Ignite", "Apache Karaf", "OSGi"] },
//   { title: "Cloud & DevOps", icon: "☁", items: ["AWS", "Azure", "Kubernetes", "Docker", "Helm", "RedHat", "Linux / Debian", "Liquibase"] },
//   { title: "Data & Observability", icon: "▦", items: ["Oracle PL/SQL", "MS SQL", "MySQL", "Cassandra", "Redis", "Elasticsearch", "Kibana", "Grafana"] },
//   { title: "Frontend", icon: "◐", items: ["AngularJS", "Vue.js", "TypeScript", "HTML / CSS"] },
//   { title: "Quality & Security", icon: "✓", items: ["JUnit", "Mockito", "Cucumber / BDD", "Gherkin", "Burp Suite", "Karma", "Jasmine"] },
//   { title: "Ways of working", icon: "↻", items: ["Agile / Scrum", "Mentoring", "Software analysis & design", "ServiceNow / CMDB"] },
// ];

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    icon: "💻",
    items: [
      "Java (JDK 17+)",
      "Kotlin",
      "Go (Golang)",
      "Groovy",
      "Python",
      "C",
      "C++",
      "C#",
      "TypeScript",
      "JavaScript",
      "PL/SQL",
      "VBScript",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "⚙️",
    items: [
      "Spring Boot",
      "Spring Cloud",
      "J2EE",
      "Hibernate",
      "JSP / JSF",
      "Node.js / Express.js",
      "REST APIs",
      "GraphQL",
      "gRPC",
      "SOAP",
      "OSGi",
      "Apache CXF",
      "Apache Tomcat",
    ],
  },
  {
    title: "Architecture & Messaging",
    icon: "🏗️",
    items: [
      "Microservices",
      "Cloud-Native Architecture",
      "Distributed Systems",
      "Apache Kafka",
      "Apache RabbitMQ",
      "RabbitMQ",
      "ActiveMQ",
      "Apache Ignite",
      "Apache Karaf",
      "Apache Camel",
      "Event-Driven Architecture",
      "System Design",
      "Enterprise Architecture",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    items: [
      "AWS",
      "Microsoft Azure",
      "Docker",
      "Kubernetes",
      "Helm",
      "Amazon EKS",
      "Azure AKS",
      "Red Hat",
      "Linux / Ubuntu / Debian",
      "Azure DevOps",
      "CI/CD",
      "Liquibase",
      "Terraform",
      "Apache Maven",
      "GitHub Actions",
    ],
  },
  {
    title: "Data & Observability",
    icon: "🗄️",
    items: [
      "Oracle PL/SQL",
      "Microsoft SQL Server",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Cassandra",
      "Redis",
      "Elasticsearch",
      "ELK Stack",
      "Prometheus",
      "Grafana",
      "Cortex",
      "ServiceNow",
      "JasperReports",
      "Apache Cassandra",
      "Apache Solr",
    ],
  },
  {
    title: "Frontend & Mobile",
    icon: "🎨",
    items: [
      "React.js",
      "Angular",
      "AngularJS",
      "Vue.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5 / CSS3",
      "Bootstrap",
      "jQuery",
      "Android Development",
      "Responsive Web Design",
    ],
  },
  {
    title: "Quality & Security",
    icon: "🛡️",
    items: [
      "JUnit",
      "Mockito",
      "Cucumber / BDD",
      "Gherkin",
      "Selenium",
      "Karma",
      "Jasmine",
      "Vitest",
      "Postman",
      "Burp Suite",
      "OWASP",
      "Application Security",
      "Secure API Development",
      "Keycloak",
    ],
  },
  {
    title: "Ways of Working",
    icon: "🚀",
    items: [
      "Agile / Scrum",
      "Open Source Contribution",
      "Software Analysis & Design",
      "Technical Leadership",
      "Technical Project Management",
      "Mentoring",
      "Code Reviews",
      "Git / GitHub / Bitbucket",
      "Jira",
      "ServiceNow",
      "Problem Solving",
      "Team Collaboration",
    ],
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
};
export const experience: Job[] = [
  {
    company: "PRAL, FBR",
    role: "Senior Software Engineer",
    period: "Sep 2025 – Present",
    current: true,
    summary: "Leading the development and modernization of secure, scalable enterprise applications, delivering robust APIs and high-performance full-stack solutions.",
    bullets: [
      "Led and mentored junior developers while engineering secure APIs using WSO2, digital signatures, and advanced security standards. Ensured code quality through JUnit, BDD, Burp Suite, Karma, and Jasmine.",
      "Designed and developed scalable backend and frontend solutions using Spring Boot, Spring Cloud, Apache Kafka, AngularJS, and TypeScript, with Oracle PL/SQL profiling and performance optimization.",
      "Leveraged Kubernetes, Docker, Redis, and Red Hat to strengthen application scalability and reliability, while using Grafana, Elasticsearch, and Kibana for monitoring, performance analysis, and system observability."
    ],
    stack: ["Spring Boot", "Kafka", "WSO2", "Kubernetes", "Oracle PL/SQL", "AngularJS"],
  },
  {
    company: "DataQ Health",
    role: "Software Engineer",
    period: "Jan 2024 – Dec 2025",
    summary: "Contributed to open-source software development at OpenNMS Group, helping transform Horizon into a scalable, cloud-native platform through microservices architecture and distributed systems engineering.",
    bullets: [
      "Actively contributed to the Lokahi project by OpenNMS Group, helping evolve OpenNMS Horizon into a cloud-native application through microservices architecture and distributed service integration.",
      "Worked with Apache Ignite, Apache Karaf, Apache Kafka, OSGi, GraphQL, Keycloak, Spring Boot, Spring Cloud, gRPC, and JDK 17+ to develop scalable, modular, and resilient services.",
      "Applied Cucumber, JUnit, Mockito, Gherkin, and Liquibase while leveraging Kubernetes, Helm, Linux/Debian, Cassandra, AWS, and ServiceNow for deployment, database management, and delivery workflows.",
      "Contributed to frontend development using Vue.js and TypeScript, with Grafana, Elasticsearch, and Kibana supporting monitoring, logging, and system observability",
    ],
    stack: ["Java 17+", "gRPC", "GraphQL", "Kafka", "Kubernetes", "Vue.js"],
  },
  {
    company: "PRAL, FBR",
    role: "Software Engineer",
    period: "May 2021 – Dec 2023",
    summary: "Engineered enterprise-grade software solutions for revenue collection, tax administration, and financial management systems, contributing to the design and delivery of mission-critical government applications.",
    bullets: [
      "Designed and developed high-performance enterprise applications using Java, J2EE, Spring Boot, Hibernate, and JavaScript frameworks, applying microservices architecture and scalable development practices.",
      "Participated in software analysis, technical design, and implementation across revenue management, tax automation, and enterprise web application domains.",
      "Developed and optimized database solutions using Oracle PL/SQL and Microsoft SQL Server (MSSQL), supporting complex business logic and data-intensive operations.",
      "Contributed throughout the complete software development lifecycle, from requirements analysis and implementation to testing and delivery, across key PRAL initiatives, including PRA, POS, IRIS 2.0, and the National Sales Tax Return (NSTR)."
    ],
    stack: ["Java / J2EE", "Spring Boot", "Hibernate", "Oracle", "MS SQL"],
  },
  {
    company: "Funprime Technology",
    role: "Android Developer",
    period: "Mar 2020 – Apr 2021",
    summary: "Developed Android applications focused on modern user experiences, intuitive interfaces, and feature-rich mobile functionality.",
    bullets: ["Designed and developed Android applications with contemporary UI/UX principles, responsive layouts, and modern mobile features.",
      "Successfully published the majority of developed applications on the Google Play Store, gaining hands-on experience in application packaging, release management, and production deployment."
    ],
    stack: ["Android", "Java / Kotlin"],
  },
];

export type Project = {
  name: string;
  kind: string;
  description: string;
  stack: string[];
  image?: string;
};
export const projects: Project[] = [
  {
    name: "OpenNMS Lokahi",
    kind: "Open-source · Cloud-native",
    description:
      "Next-generation, cloud-native, tenant-based network monitoring. Contributed to evolving open-source Horizon towards a microservices architecture.",
    stack: ["Java 17+", "gRPC", "Kafka", "Kubernetes", "Vue.js"],
    image: assetPath("/assets/img/lokahi.png"),
  },
  {
    name: "OpenNMS Horizon / Meridian",
    kind: "Open-source · Network monitoring",
    description: "Open-source network monitoring platform able to monitor IoT and software devices.",
    stack: ["Java", "OSGi", "Apache Karaf"],
    image: assetPath("/assets/img/Horizon-Meridian.png"),
  },
  {
    name: "IRIS 2.0",
    kind: "Enterprise · Tax automation",
    description:
      "A faster, easier and more efficient tax-automation system built on a microservices architecture at PRAL for FBR.",
    stack: ["Java", "Spring Boot", "Microservices", "Oracle"],
    image: assetPath("/assets/img/iris-2.0.png"),
  },
  {
    name: "PRA, POS & NSTR",
    kind: "Enterprise · Revenue systems",
    description:
      "Revenue, point-of-sale and national sales tax return systems delivered with the PRAL engineering team.",
    stack: ["J2EE", "Spring Boot", "Hibernate", "PL/SQL"],
    image: assetPath("/assets/img/pra.jpg"),
  },
];

export type Cert = {
  name: string;
  issuer: string;
  date: string;
  image: string;
  accent: string; // issuer-inspired glow colour (design choice only)
  verifyUrl?: string;
};
// Names, issuers and dates are read from the certificate images in the previous site.
export const certifications: Cert[] = [
  {
    name: "Agile Scrum Master (ASM®)",
    issuer: "Simplilearn SkillUP",
    date: "Dec 2023",
    image: assetPath("/assets/img/agile.jpg"),
    accent: "#f59e0b",
  },
  {
    name: "Getting Started with NodeJS",
    issuer: "Simplilearn SkillUP",
    date: "Oct 2023",
    image: assetPath("/assets/img/node.jpg"),
    accent: "#22c55e",
  },
  {
    name: "Machine Learning Algorithms",
    issuer: "Great Learning Academy",
    date: "Oct 2023",
    image: assetPath("/assets/img/ml.jpg"),
    accent: "#38bdf8",
  },
  {
    name: "Spring MVC, Spring Boot and Rest Controllers",
    issuer: "LearnQuest · Coursera",
    date: "Oct 2022",
    image: assetPath("/assets/img/coursea.jpg"),
    accent: "#3b82f6",
    verifyUrl: "https://coursera.org/verify/83MACH4H6JYZ",
  },
  {
    name: "Fundamentals of Digital Marketing",
    issuer: "Google Digital Garage",
    date: "Aug 2022",
    image: assetPath("/assets/img/google.jpg"),
    accent: "#a78bfa",
    verifyUrl: "https://learndigital.withgoogle.com/link/1qsdpcedm9s",
  },
    {
    name: "Content Marketing Certified",
    issuer: "HubSpot Academy",
    date: "Sep 2022",
    image: assetPath("/assets/img/hubspot.png"),
    accent: "#a78bfa",
  },
  {
    name: "Start Writing Prompt like a Pro ",
    issuer: "Google by Coursera",
    date: "Jul 2026",
    image: assetPath("/assets/img/prompt.png"),
    accent: "#a78bfa",
  },
  
];

export const education = [
  { school: "Arid Agriculture University", degree: "Master of Computer Science", note: "" },
  { school: "University of the Punjab", degree: "Bachelor's degree, Computer Science", note: "" },
];

export const achievements = [
  { title: "Open-Source Contributor", text: "Contributing to OpenNMS Lokahi, evolving Horizon into a cloud-native platform." },
  { title: "Inland Revenue System", text: "Delivered PRA, POS, IRIS 2.0 and NSTR projects at PRAL for FBR." },
  { title: "Team Lead & Mentor", text: "Leading and mentoring junior developers on secure API delivery." },
  { title: "Published Android Apps", text: "Shipped most of the Android apps built at Funprime Technology to Google Play." },
];

export const recommendations = [
  {
    name: "Ali Fida",
    role: "Ex Manager, PRAL FBR",
    text: "A talented Java developer and a great person to work with; methodical, innovative and consistently exceeding expectations.",
  },
  {
    name: "Kashif Sardar",
    role: "Team Lead, NADRA",
    text: "Mastery of Java, Spring Boot, GraphQL and gRPC with a strong work ethic and exceptional problem-solving skills.",
  },
  {
    name: "Abdul Ahad Mughal",
    role: "Integration Engineer, ABID",
    text: "An expert in Linux, Java, GraphQL, Spring Boot, gRPC, Apache Karaf, Kafka and OSGi who consistently delivers good outcomes.",
  }, 
  {
    name: "Syed Shafique Ali Bukhari",
    role: "Senior Quality Assurance Engineer, FBR PRAL",
    text: "A skilled and dedicated software engineer with strong coding abilities, excellent problem-solving skills, and a consistent focus on delivering efficient solutions.",
  },
   {
    name: "Musaid Ali",
    role: "Senior Software Engineer, Systems Limited",
    text: "An experienced Java engineer with expertise in Spring Boot, GraphQL, gRPC, Kafka, and cloud technologies, combining strong problem-solving skills, professionalism, and teamwork to deliver impactful results.",
  },
];
