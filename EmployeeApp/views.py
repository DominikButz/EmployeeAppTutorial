from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from .models import Employee, Department
from .serializers import EmployeeSerializer, DepartmentSerializer
from django.core.files.storage import default_storage


@csrf_exempt
def departmentApi(request, id=0):
    if request.method == "GET":
        departments = Department.objects.all()
        departmentsSerializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departmentsSerializer.data, safe=False)
    elif request.method == "POST":
        departmentData = JSONParser().parse(request)
        departmentSerializer = DepartmentSerializer(
            data=departmentData, many=False)
        if departmentSerializer.is_valid():
            newDepartment = departmentSerializer.save()
            return JsonResponse(newDepartment.dict(), safe=False)
        else:
            return JsonResponse("Failed to add", safe=False)
    elif request.method == "PUT":
        departmentData = JSONParser().parse(request)
        department = Department.objects.get(pk=departmentData["id"])
        departmentSerializer = DepartmentSerializer(
            department, data=departmentData)
        if departmentSerializer.is_valid():
            updatedDep = departmentSerializer.save()
            return JsonResponse(updatedDep.dict(), safe=False)
        else:
            errors = departmentSerializer.errors
            return JsonResponse(errors, safe=False)
    elif request.method == "DELETE":
        department = Department.objects.get(pk=id)
        department.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def employeeApi(request, id=0):
    if request.method == "GET":
        employees = Employee.objects.all()
        employeesSerializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employeesSerializer.data, safe=False)
    elif request.method == "POST":
        employeeData = JSONParser().parse(request)
        print(f"employee data {employeeData}")
        employeeSerializer = EmployeeSerializer(data=employeeData, many=False)
        if employeeSerializer.is_valid():
            newEmployee = employeeSerializer.save()  
            return JsonResponse(newEmployee.dict(), safe=False)
        else:
            errors = employeeSerializer.errors
            print(f"serializer data {errors}")
            return JsonResponse(errors, safe=False)
    elif request.method == "PUT":
        employeeData = JSONParser().parse(request)
        employee = Employee.objects.get(pk=employeeData["id"])
        employeeSerializer = EmployeeSerializer(
            employee, data=employeeData)
        if employeeSerializer.is_valid():
            deleteOldProfilePicIfNeeded(employee, employeeData)
            updatedEmployee = employeeSerializer.save()
            return JsonResponse(updatedEmployee.dict(), safe=False)
        else:
            errors = employeeSerializer.errors
            return JsonResponse(errors, safe=False)
    elif request.method == "DELETE":
        employee = Employee.objects.get(pk=id)
        employee.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def saveImage(request):
    ''' saves an image file. The file key nees to be 'photo' '''
    print(f"request files {request.FILES}")
    file = request.FILES["photo"]
    fileName = default_storage.save(file.name, file)
    return JsonResponse({"fileName": fileName}, safe=False)


def deleteOldProfilePicIfNeeded(employee=Employee, newData=dict):
    ''' Deletes the old profile photo if it was replaced by new one '''
    oldImageFilename = employee.photo
    newImageFilename = newData["photo"] or None
    print(f"old file name: {oldImageFilename}")
    print(f"new file name {newImageFilename}")
    if oldImageFilename is not None and oldImageFilename != "" and oldImageFilename != "anonymous.PNG" and (oldImageFilename != newImageFilename):
        default_storage.delete(oldImageFilename)