from django.db import models

# Create your models here.

class EmpDepartment(models.Model):
    department_name = models.CharField(max_length=50)
    managerId = models.IntegerField()
    manager_Name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.id} | {self.department_name}"


class empList(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    location = models.CharField(max_length=50)
    position = models.CharField(max_length=50)
    department = models.ForeignKey(EmpDepartment,on_delete=models.CASCADE)
    mobile_number = models.BigIntegerField()
    salary = models.DecimalField(max_digits=10,decimal_places=2)
    joining_date = models.DateField()

    def __str__(self):
        return f"{self.id} | {self.name}"






