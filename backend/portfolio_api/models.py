from django.db import models
from django.core.validators import MaxLengthValidator

class OrderedModel(models.Model):
    order = models.PositiveIntegerField(default=0)
    class Meta:
        abstract = True
        ordering = ["order", "id"]

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    location = models.CharField(max_length=120)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    summary = models.TextField()
    available_for_work = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): return self.name

class SkillCategory(OrderedModel):
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=40, default="Code")
    skills = models.JSONField(default=list)
    def __str__(self): return self.name

class Experience(OrderedModel):
    role = models.CharField(max_length=120)
    company = models.CharField(max_length=120)
    period = models.CharField(max_length=60)
    type = models.CharField(max_length=60, blank=True)
    bullets = models.JSONField(default=list)
    is_published = models.BooleanField(default=True)
    def __str__(self): return f"{self.role} — {self.company}"

class Project(OrderedModel):
    DEMO_CHOICES = [("security", "Security allocation"), ("scraping", "Learning scraper")]
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=150)
    tech = models.JSONField(default=list)
    description = models.TextField()
    features = models.JSONField(default=list)
    demo_type = models.CharField(max_length=20, choices=DEMO_CHOICES)
    github = models.URLField(blank=True)
    live_demo = models.URLField(blank=True)
    is_published = models.BooleanField(default=True)
    def __str__(self): return self.name

class Education(OrderedModel):
    degree = models.CharField(max_length=160)
    institution = models.CharField(max_length=160)
    location = models.CharField(max_length=120)
    period = models.CharField(max_length=60)
    description = models.TextField(blank=True)
    def __str__(self): return self.degree

class Certification(OrderedModel):
    title = models.CharField(max_length=150)
    issuer = models.CharField(max_length=150)
    year = models.CharField(max_length=20)
    credential_url = models.URLField(blank=True)
    def __str__(self): return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    message = models.TextField(validators=[MaxLengthValidator(3000)])
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=250, blank=True)
    class Meta:
        ordering = ["-created_at"]
    def __str__(self): return f"{self.name} — {self.created_at:%Y-%m-%d}"
