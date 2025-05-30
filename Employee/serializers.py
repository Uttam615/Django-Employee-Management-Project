from rest_framework import serializers
from.models import EmpDepartment,empList


class EmpDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpDepartment
        fields = ['id','department_name','managerId','manager_Name']



class EmpListSerializer(serializers.ModelSerializer):
    class Meta:
        model = empList
        fields = ['id','name','email','location','position','department','mobile_number','salary','joining_date']
