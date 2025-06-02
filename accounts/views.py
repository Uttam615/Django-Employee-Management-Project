from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User
from .forms import RegisterForm,LoginForm
from django.contrib import messages
# Create your views here.

def registerView(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
                username = form.cleaned_data['username'],
                email = form.cleaned_data['email'],
                password = form.cleaned_data['password']
            )
            login(request,user)
            return redirect('classEmpList')
    else:    
        form = RegisterForm()

    return render(request,'register.html',{'form':form})



def loginView(request):
    if request.method == 'POST':
        form = LoginForm(request,data=request.POST)
        if form.is_valid():
                login(request,form.get_user())
                return redirect('classEmpList')
        messages.error(request,"Invalid username or password")
    else:
        form= LoginForm()
    return render(request,'login.html',{'form':form})

def logoutView(request):
     logout(request)
     return render(request,'logout.html')
