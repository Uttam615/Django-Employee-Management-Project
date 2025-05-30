from django.urls import path
from .import views

urlpatterns = [
    path('employees/',views.employeeList,name='employee_list'),
    path('api/emp-create/',views.emp_create_api,name='emp-create-api'),
    path('create-employee/',views.emp_form_page,name='emp-form-page'),
    

    path('classEmpList/',views.ClassemployeeList,name='classEmpList'),
    path('class_emp_form/',views.class_form_emp_page,name='class_emp_form'),
    
    path('empList',views.EmpListApiView.as_view(),name='empList'),#Get Item what we created allown only Get method
    path('class/api-create/',views.empPostCreateApiView.as_view(),name='classapi-create'),#Api-using class and DRF

]




