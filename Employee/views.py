
# views.py

import json
from decimal import Decimal, InvalidOperation
from datetime import datetime
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import empList, EmpDepartment
from rest_framework import status
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from.serializers import EmpListSerializer
from django.http import Http404
from django.utils.decorators import method_decorator






def employeeList(request):
    employees = empList.objects.select_related('department').all()
    return render(request,'EmployeeList.html',{'employees':employees})







def emp_form_page(request):
    return render(request,'empcreate.html')


@csrf_exempt
def emp_create_api(request):
    if request.method != 'POST':
        return JsonResponse({"message":"POST method only allowed"},status=status.HTTP_405_METHOD_NOT_ALLOWED)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error":"invalid Json"},status=status.HTTP_400_BAD_REQUEST)
    
    error = {}
    
    name = data.get('name','').strip()
    email = data.get('email','').strip()
    location = data.get('location','').strip()
    position = data.get('position','').strip()
    department_id = data.get('department_id','')
    mobile_number = data.get('mobile_number','')
    salary = data.get('salary','')
    joining_date = data.get('joining_date','')

    if not name:
        error['name'] = 'Name is required'
    if not email:
        error['email'] = 'Email required'
    if not department_id:
        error['department_id'] ='Dept_id required'
    if not mobile_number:
        error['mobile_number'] = 'Mobile Number required'
    if not salary:
        error['salary']='Salary required'
    if not joining_date:
        error['joining_date'] = 'Joining Date required'

    department = None
    if department_id:
        try:
            department = EmpDepartment.objects.get(pk=int(department_id))
        except (EmpDepartment.DoesNotExist,ValueError):
            error['department_id'] = 'Invalid Department ID'
        
    try:
        mobile_number_int = int(mobile_number)
    except(ValueError,TypeError):
        error['mobile_number']='Mobile number number must be integer'

    try:
        salary_decimal = Decimal(salary)
    except(InvalidOperation,ValueError,TypeError):
        error['salary'] = "Salary format Wrong"

    try:
        joining_date_obj = datetime.strptime(joining_date,'%Y-%m-%d').date()
    except(TypeError,ValueError):
        error['joining_date'] ="Joining Date must be in YYYY-MM-DD format"
    if error:
        return JsonResponse({'errors':error},status=status.HTTP_400_BAD_REQUEST)
    
    emp = empList.objects.create(
        name=name,
        email=email,
        location=location,
        position=position,
        department=department,
        mobile_number=mobile_number_int,
        salary = salary_decimal,
        joining_date=joining_date_obj,
    )
    return JsonResponse({'message':'Employee Created','id':emp.id},status=status.HTTP_201_CREATED)




#Class Base view With DRF and serializer
class EmpListApiView(APIView):
    def get(self,requets):
        employee = empList.objects.select_related('department').all()
        serializer = EmpListSerializer(employee,many=True)
        return Response(serializer.data)
    
def ClassemployeeList(request):
    employees = empList.objects.select_related('department').all()
    return render(request,'classEmpList.html',{'employees':employees})

    

class empPostCreateApiView(APIView):
    def post(self,request):
        serializer = EmpListSerializer(data =  request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"New Data is created",'id':serializer.data['id']},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
def class_form_emp_page(request):
    return render(request,'classEmpCreate.html')

@method_decorator(csrf_exempt, name='dispatch')
class empUpdateDeleteApi(APIView):

    def get_object(self,id):
        try:
            return empList.objects.get(id=id)
        except empList.DoesNotExist:
            return None
        
    def put(self,request,id):
        employee = self.get_object(id=id)
        if not employee:
            return Response({'error':"Employee not found"},status=status.HTTP_404_NOT_FOUND)
        serializer = EmpListSerializer(employee, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Update Data","data":serializer.data},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        employee = self.get_object(id=id)
        if not employee:
            return Response({"message":"Data Not found"},status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response({'message':"Deleted successfully"},status=status.HTTP_200_OK)
    

def update_emp(request):
    return render(request,'updateEmp.html')

def delete_emp(request):
    return render(request,'empDelete.html')
    

        

    






