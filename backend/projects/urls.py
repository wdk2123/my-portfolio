from django.urls import path
from .views import (
    ProjectListView,
    ProjectDetailView,
    ProjectCreateView,
    ProjectUpdateView,
    ProjectDeleteView,
)

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('create/', ProjectCreateView.as_view(), name='project-create'),
    path('<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('update/<int:id>/', ProjectUpdateView.as_view(), name='project-update'),
    path('delete/<int:id>/', ProjectDeleteView.as_view(), name='project-delete'),
]