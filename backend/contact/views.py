from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from .models import ContactInfo, ContactMessage
from .serializers import ContactInfoSerializer, ContactMessageSerializer
from django.conf import settings

@api_view(["GET"])
def contact_info(request):
    info = ContactInfo.objects.first()
    serializer = ContactInfoSerializer(info)
    return Response(serializer.data)

@api_view(["POST"])
def send_contact_message(request):
    name = request.data.get("name")
    email = request.data.get("email")
    message = request.data.get("message")

    if not all([name, email, message]):
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    # Save message to database
    ContactMessage.objects.create(name=name, email=email, message=message)

    # Prepare email
    subject = f"New message from {name}"
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    recipient_list = ["ronakrajput.ire@gmail.com"]  # your Gmail

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.EMAIL_HOST_USER,  # must match your Gmail account
            recipient_list=recipient_list,
            fail_silently=False,
            auth_user=settings.EMAIL_HOST_USER,   # your Gmail
            auth_password=settings.EMAIL_HOST_PASSWORD,
            headers={"Reply-To": email}           # so you can reply directly to the user
        )
    except Exception as e:
        return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"success": "Message sent successfully"})
