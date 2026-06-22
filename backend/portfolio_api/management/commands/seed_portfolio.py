from django.core.management.base import BaseCommand
from portfolio_api.models import Profile, SkillCategory, Experience, Project, Education, Certification

class Command(BaseCommand):
    help = "Seed editable starter portfolio data. Review claims and links in Django Admin before publishing."
    def handle(self, *args, **options):
        Profile.objects.update_or_create(id=1, defaults={
            "name": "Rajesh Kumar", "title": "Junior Full Stack Developer", "email": "rkbscs153@gmail.com",
            "phone": "+923498536690", "location": "Karachi, Pakistan", "github": "https://github.com/Rajesh-Garsani",
            "linkedin": "", "summary": "Full Stack Developer focused on Python, Django, Django REST Framework and React.js. I build REST APIs, authentication systems, database-driven applications and web automation solutions.",
        })
        categories = [
            ("Backend Development", "Database", ["Python", "Django", "Django REST Framework (DRF)", "RESTful API Design", "JWT Authentication", "Authorization Systems", "Secure Coding Practices"]),
            ("Frontend Development", "Layers", ["React.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "Axios"]),
            ("Databases", "HardDrive", ["PostgreSQL", "SQLite", "MongoDB", "Django ORM", "Database Design"]),
            ("Web Scraping & Automation", "Cpu", ["BeautifulSoup", "Scrapy", "Selenium", "Requests", "Data Extraction"]),
            ("Tools & Technologies", "Terminal", ["Git", "GitHub", "Docker", "Postman", "Linux", "CI/CD Basics"]),
            ("Core Competencies", "Code", ["OOP", "Data Structures", "Algorithms", "Problem Solving", "Clean Code", "Testing"]),
        ]
        for order, (name, icon, skills) in enumerate(categories):
            SkillCategory.objects.update_or_create(name=name, defaults={"icon": icon, "skills": skills, "order": order})
        Experience.objects.update_or_create(role="Python Developer", company="Folio3", defaults={"period": "Dec 2024 – Feb 2026", "type": "Professional Experience", "order": 0, "bullets": ["Worked with Python development workflows under senior engineers.", "Gained industry exposure in software development and collaborative engineering practices."], "is_published": True})
        projects = [
            {"slug":"security-allocation", "name":"Dynamic Event Security Allocation System", "demo_type":"security", "tech":["Python","Django","DRF","SQLite","React.js"], "description":"A role-based web application concept for allocating security resources to events using risk and capacity information.", "features":["Resource allocation workflow", "Role-based dashboards", "Report generation and notifications"], "order":0},
            {"slug":"learning-scraper", "name":"Online Learning Platform with Web Scraping", "demo_type":"scraping", "tech":["Python","Django","DRF","React.js","BeautifulSoup","Selenium"], "description":"A learning portal project designed to aggregate and display course topics with search and progress tracking.", "features":["Content aggregation workflow", "REST API backend", "Progress tracking interface"], "order":1},
        ]
        for project in projects:
            Project.objects.update_or_create(slug=project["slug"], defaults={**project, "github":"https://github.com/Rajesh-Garsani", "is_published":True})
        Education.objects.update_or_create(degree="Bachelor of Science in Computer Science", institution="Sindh Madressatul Islam University", defaults={"location":"Karachi, Pakistan", "period":"2019 – 2023", "order":0, "description":"Coursework in software development, databases, algorithms and web engineering."})
        Certification.objects.update_or_create(title="Advanced Python", issuer="NAVTTC / Aptech", defaults={"year":"2023", "order":0})
        self.stdout.write(self.style.SUCCESS("Starter portfolio content seeded. Edit and verify all public details in /admin/ before publishing."))
