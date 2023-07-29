from django.views import View
from .serializers import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
import json

# Create your views here.

# ****************INVOICE API***********************

#Get the list of invoices
class InvoiceListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, req):
        invoices = Invoice.objects.filter(user = req.user.id)
              
        serialized_invoices = InvoiceSerializer(invoices, many=True)  
        return JsonResponse(serialized_invoices, safe=False, status=200)
        
        # items = Item.objects.all()
        # serializer = ItemSerializer(items, many=True).data
        # return JsonResponse(serializer, safe=False, status=200)
 
# Get invoice by Id   
class InvoiceView(View):
    permission_classes = [IsAuthenticated]
    def get(self, req, invoice_id):
        invoice = Invoice.objects.filter( id = invoice_id).first()
        if invoice:
            serialized_invoice = InvoiceSerializer(invoice).data
            return JsonResponse(serialized_invoice, safe=False)                
        else:
            return JsonResponse({'message': 'Invoice not found'}, status=404)
        

# Create new invoice
class NewInvoiceView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, req):
        invoice_data = json.loads(req.body)  
        invoice_data["user"] = req.user.id   
        serialized_invoice = InvoiceSerializer(data = invoice_data)       
        if serialized_invoice.is_valid():
            serialized_invoice.save()
            return JsonResponse(serialized_invoice.data, safe=False, status = 201)
        else:
            return JsonResponse({'Error':serialized_invoice.errors}, status=500)


# *******************INVOICE ITEMS API*************************   

# Adds new items to invoice
class NewItemView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, req, invoice_id):
        itemData = json.loads(req.body) 
        itemData["invoice"] = invoice_id    
        serialized_item = ItemSerializer(data = itemData)
        
        if serialized_item.is_valid(): 
            serialized_item.save()
            return JsonResponse({"message":"New Item added","data":serialized_item.data}, status=201)
        else:
            return JsonResponse({"message":"Something went wrong! Cannot add the item."}, status=400)


class SignUpView(APIView):
    def post(self, req):
        data = json.loads(req.body)
        userExist = User.objects.filter(username=data["username"])      
        if not userExist:
            serializer = SignUpSerializer(data=data)
            
            if serializer.is_valid():
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                return JsonResponse({
                        "message": "Sign up successful!",
                        "token": {
                            "refresh_token": str(refresh),
                            "access_token": str(refresh.access_token),
                        },
                        "state":True                   
                    }, status=201
                )
            return JsonResponse({
                    "message": serializer.errors,
                    "state":False 
                }, status=status.HTTP_400_BAD_REQUEST, safe=False
            )
        
        return JsonResponse({"message": "Account already exist","state":False}, status=status.HTTP_400_BAD_REQUEST)

class SignInView(APIView):
    def post(self, req):
        data = json.loads(req.body)  
        serializer = LoginSerializer(data=data)
        
        if serializer.is_valid():
            # The serializer's validate() method returns the authenticated user
            user = serializer.validated_data
            
            # Generating JWT auth token for the authenticated user
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                "message": "Sign in successful!",
                "user_id": user.id,
                "token": {
                    "refresh_token": str(refresh),
                    "access_token": str(refresh.access_token)
                },
                "state":True               
            }, status=200) 
        return JsonResponse({"message":"Invalid email or password", "state":False}, status=status.HTTP_400_BAD_REQUEST) 
        
            
        
        
        
                
            
