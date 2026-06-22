from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient
from .models import ContactMessage, Profile

class PublicApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        Profile.objects.create(name="Rajesh Kumar", title="Developer", email="test@example.com", location="Karachi", summary="Portfolio summary")
    def test_portfolio_endpoint(self):
        response = self.client.get(reverse("portfolio"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["personalInfo"]["name"], "Rajesh Kumar")
    @override_settings(CONTACT_NOTIFICATION_EMAIL="")
    def test_contact_message_is_stored(self):
        response = self.client.post(reverse("contact"), {"name":"Recruiter", "company":"Tech Co", "email":"hr@example.com", "message":"We would like to discuss a role."}, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
    @override_settings(GEMINI_API_KEY="")
    def test_chat_fallback_works_without_key(self):
        response = self.client.post(reverse("chat"), {"userMessage":"How can I contact Rajesh?", "messages":[]}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("test@example.com", response.data["reply"])
