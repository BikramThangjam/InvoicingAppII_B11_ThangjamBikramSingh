from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

class ItemSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Item
        fields = "__all__"
        
class InvoiceSerializer(serializers.ModelSerializer): 
    items =  ItemSerializer(many=True, read_only=True)
    class Meta:
        model = Invoice
        fields = "__all__"

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["username","password","email","name"]
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'], 
            password=validated_data['password'],
            email= validated_data['email'],
            name = validated_data['name'],
                        
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        
        # Check if email and password are provided
        if not email or not password:
            raise serializers.ValidationError("Please provide both email and password.")
        
         # Validate user credentials using email and password
        user = authenticate(**data)
        if not user or not user.is_active:
            raise serializers.ValidationError("Invalid email or password")
        
        # Returning the user instance if authentication is successful
        return user
        
    