from django.db import models
from django.db.models.fields import CharField, DateField
from django.db.models.fields.related import ForeignKey

# Create your models here.


class Department(models.Model):
    name = models.CharField(max_length=100)

    def dict(self):
        return {"id": self.id, "name": self.name}
    

class Employee(models.Model):
    name = models.CharField(max_length=100)
    department = ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    joinedDate = DateField(auto_now_add=True)
    photo = CharField(blank=True, null=True, max_length=100)

    def dict(self):
        return {
            "id": self.id, 
            "name": self.name,
            "department": self.department.id, 
            "joinedDate": self.joinedDate, 
            "photo": self.photo
        }