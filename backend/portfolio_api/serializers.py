from rest_framework import serializers
from .models import Profile, SkillCategory, Experience, Project, Education, Certification, ContactMessage

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["name", "title", "email", "phone", "location", "github", "linkedin", 'resume_file', "summary", "available_for_work"]

class SkillCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = ["name", "skills", "icon"]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["role", "company", "period", "type", "bullets"]

class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="slug")
    demoType = serializers.CharField(source="demo_type")
    class Meta:
        model = Project
        fields = ["id", "name", "tech", "description", "features", "demoType", "github", "live_demo"]

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["degree", "institution", "location", "period", "description"]

class CertificationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Certification
        fields = ["id", "title", "issuer", "year", "credential_url"]

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "company", "email", "message"]
    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Please enter at least 10 characters.")
        return value
