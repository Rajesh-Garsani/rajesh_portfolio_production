import type { PortfolioData } from "./types";

export const fallbackPortfolio: PortfolioData = {
  personalInfo: {
    name: "Rajesh Kumar", title: "Junior Full Stack Developer", email: "rkbscs153@gmail.com", phone: "+923498536690",
    location: "Karachi, Pakistan", github: "https://github.com/Rajesh-Garsani", linkedin: "",
    summary: "Full Stack Developer focused on Python, Django, Django REST Framework and React.js. I build REST APIs, authentication systems, database-driven applications and web automation solutions.",
  },
  skillsData: [
    { name: "Backend Development", icon: "Database", skills: ["Python", "Django", "Django REST Framework (DRF)", "RESTful API Design", "JWT Authentication", "Authorization Systems", "Secure Coding Practices"] },
    { name: "Frontend Development", icon: "Layers", skills: ["React.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "Axios"] },
    { name: "Databases", icon: "HardDrive", skills: ["PostgreSQL", "SQLite", "MongoDB", "Django ORM", "Database Design"] },
    { name: "Web Scraping & Automation", icon: "Cpu", skills: ["BeautifulSoup", "Scrapy", "Selenium", "Requests", "Data Extraction"] },
    { name: "Tools & Technologies", icon: "Terminal", skills: ["Git", "GitHub", "Docker", "Postman", "Linux", "CI/CD Basics"] },
    { name: "Core Competencies", icon: "Code", skills: ["OOP", "Data Structures", "Algorithms", "Problem Solving", "Clean Code", "Testing"] },
  ],
  experienceData: [{ role: "Python Developer", company: "Folio3", period: "Dec 2024 – Feb 2026", type: "Professional Experience", bullets: ["Worked with Python development workflows under senior engineers.", "Gained industry exposure in software development and collaborative engineering practices."] }],
  projectsData: [
    { id: "security-allocation", name: "Dynamic Event Security Allocation System", demoType: "security", tech: ["Python", "Django", "DRF", "SQLite", "React.js"], description: "A role-based web application concept for allocating security resources to events using risk and capacity information.", features: ["Resource allocation workflow", "Role-based dashboards", "Reports and notifications"], github: "https://github.com/Rajesh-Garsani" },
    { id: "learning-scraper", name: "Online Learning Platform with Web Scraping", demoType: "scraping", tech: ["Python", "Django", "DRF", "React.js", "BeautifulSoup", "Selenium"], description: "A learning portal project designed to aggregate and display course topics with search and progress tracking.", features: ["Content aggregation workflow", "REST API backend", "Progress tracking interface"], github: "https://github.com/Rajesh-Garsani" },
  ],
  educationData: [{ degree: "Bachelor of Science in Computer Science", institution: "Sindh Madressatul Islam University", location: "Karachi, Pakistan", period: "2019 – 2023", description: "Coursework in software development, databases, algorithms and web engineering." }],
  certificationsData: [{ id: "cert-1", title: "Advanced Python", issuer: "NAVTTC / Aptech", year: "2023" }],
};
