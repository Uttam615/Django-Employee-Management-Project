from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm


class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username','email','password']

    def clean(self):
        clean_data = super().clean()
        if clean_data.get("password") != clean_data.get("confirm_password"):
            raise forms.ValidationError("Password donot match")
        return clean_data
        

class LoginForm(AuthenticationForm):
    username = forms.CharField()
    password = forms.CharField(label='password',widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username','password']