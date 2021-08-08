from rest_framework import serializers
from .models import Department, Employee


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name"]


class EmployeeSerializer(serializers.ModelSerializer):
    # department = DepartmentSerializer()

    class Meta:
        model = Employee
        fields = ["id", "name", "department", "joinedDate", "photo"]

    # def create(self, validated_data):
    #     print(f" validated data {validated_data}")
    #     validated_data["department"] = validated_data["department"]["id"]
    #     employee = Employee.objects.create(**validated_data)
    #     return employee

    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['child'] = DepartmentSerializer(instance.child).data
    #     return response
