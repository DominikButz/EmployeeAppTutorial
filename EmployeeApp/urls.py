from django.urls import path
#from django.conf.urls import url
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('department', views.departmentApi, name='department'),
    path('department/<int:id>', views.departmentApi, name='departmentId'),
    path('employee', views.employeeApi, name='employee'),
    path('employee/<int:id>', views.employeeApi, name='employeeId'),
    path('employee/saveImage', views.saveImage, name='saveImage')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
