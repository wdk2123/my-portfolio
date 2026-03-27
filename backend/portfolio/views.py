from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Profile
from .serializers import ProfileSerializer


class ProfileListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True, context={'request': request})
        return Response(serializer.data)


class ProfileDetailView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        profile.full_name = request.data.get("full_name", profile.full_name)
        profile.title = request.data.get("title", profile.title)
        profile.bio = request.data.get("bio", profile.bio)
        profile.email = request.data.get("email", profile.email)
        profile.phone = request.data.get("phone", profile.phone)
        profile.location = request.data.get("location", profile.location)
        profile.github = request.data.get("github", profile.github)
        profile.linkedin = request.data.get("linkedin", profile.linkedin)
        profile.twitter = request.data.get("twitter", profile.twitter)

        if "profile_image" in request.FILES:
            profile.profile_image = request.FILES["profile_image"]

        if "resume" in request.FILES:
            profile.resume = request.FILES["resume"]

        profile.save()

        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)