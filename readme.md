# Employee App Tutorial

This is a modified version of this [tutorial](https://www.youtube.com/watch?v=f5ygXQKF6M8).

Changes:

* Added Redux for state management
* employee.department should be a Foreign Key field, not a text field. 

**Important**

* Before running this tutorial app, make sure to cd to the employee_app_frontend folder and run 'npm install' to install all required react js packages
* add an .env file in the employee_app_frontend and add two global constants:
REACT_APP_API = http://localhost:8000/
REACT_APP_PHOTOPATH = http://localhost:8000/media/
* create a media folder in the root folder. For the default profile picture to appear, make sure to add a file called "anonymous.PNG" to the media folder. 
* Create a django environment as shown in the tutorial and run 'python[3] manage.py makemigrations' and then 'python[3] manage.py migrate' as usual
* Don't forget to type python[3] manage.py runserver in the root folder and 'npm start' in the employee_app_frontend folder


 