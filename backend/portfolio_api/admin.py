from django.contrib import admin
from .models import Profile, SkillCategory, Experience, Project, Education, Certification, ContactMessage

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "email", "updated_at")
@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    list_editable = ("order",)
@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "period", "is_published", "order")
    list_editable = ("is_published", "order")
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "demo_type", "is_published", "order")
    list_editable = ("is_published", "order")
    prepopulated_fields = {"slug": ("name",)}
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "period", "order")
@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "year", "order")
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "company", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "company", "message")
    readonly_fields = ("name", "email", "company", "message", "created_at", "ip_address", "user_agent")
