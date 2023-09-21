from django.urls import path, re_path
from . import views

urlpatterns = [
    path('process_url/<str:viewkey>/', views.get_music_by_viewkey, name="get_music_by_viewkey"),
    path('search/<str:search_string>/', views.get_search_results, name="get_search_results"),
]