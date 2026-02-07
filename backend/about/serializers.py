from rest_framework import serializers
from .models import AboutInfo, Value

class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = "__all__"

class AboutSerializer(serializers.ModelSerializer):
    values = ValueSerializer(many=True, source="value_set")

    class Meta:
        model = AboutInfo
        fields = "__all__"
