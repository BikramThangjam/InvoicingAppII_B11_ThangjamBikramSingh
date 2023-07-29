from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username must be provided")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)
        
class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=60,  unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=20)
    
    USERNAME_FIELD = 'email'
    objects = UserManager()
    
class Invoice(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="invoices")
    client_name = models.CharField(max_length=200)
    date = models.DateField()


class Item(models.Model):
    id=models.AutoField(primary_key=True)
    invoice = models.ForeignKey(Invoice,on_delete=models.CASCADE, null=True,blank=True, related_name="items")
    description = models.TextField()
    rate = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    

    
