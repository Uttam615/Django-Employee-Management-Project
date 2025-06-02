from django.urls import path
from .import views


urlpatterns = [
    path("registerForm/",views.registerView,name='registerForm'),
    path('login/',views.loginView,name='login'),
    path('logout/',views.logoutView,name='logout'),

]

