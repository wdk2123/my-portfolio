from django.urls import path
from .views import (
    SkillListView,
    SkillCreateView,
    SkillUpdateView,
    SkillDeleteView,
)

urlpatterns = [
    path('', SkillListView.as_view(), name='skill-list'),
    path('create/', SkillCreateView.as_view(), name='skill-create'),
    path('update/<int:id>/', SkillUpdateView.as_view(), name='skill-update'),
    path('delete/<int:id>/', SkillDeleteView.as_view(), name='skill-delete'),
]