from django.urls import path
from .views import contact_info, send_contact_message

urlpatterns = [
    path("info/", contact_info),
    path("message/", send_contact_message, name="send_contact_message"),
]
