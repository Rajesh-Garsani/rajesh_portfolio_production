from django.urls import path
from .views import PortfolioAPIView, ContactCreateAPIView, ChatAPIView
urlpatterns = [
    path("portfolio/", PortfolioAPIView.as_view(), name="portfolio"),
    path("contact/", ContactCreateAPIView.as_view(), name="contact"),
    path("chat/", ChatAPIView.as_view(), name="chat"),
]
