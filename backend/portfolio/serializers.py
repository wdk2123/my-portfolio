from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'title',
            'bio',
            'email',
            'phone',
            'location',
            'github',
            'linkedin',
            'twitter',
            'profile_image',
            'resume',
            'profile_image_url',
            'resume_url',
            'updated_at',
        ]

    def get_profile_image_url(self, obj):
        request = self.context.get('request')
        if obj.profile_image and hasattr(obj.profile_image, 'url'):
            return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url
        return None

    def get_resume_url(self, obj):
        request = self.context.get('request')
        if obj.resume and hasattr(obj.resume, 'url'):
            return request.build_absolute_uri(obj.resume.url) if request else obj.resume.url
        return None