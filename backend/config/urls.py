from django.contrib import admin
from django.urls import include, path
from portfolio_api.views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health_check, name="health"),
    path("api/", include("portfolio_api.urls")),
]
