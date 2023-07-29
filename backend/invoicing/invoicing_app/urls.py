from django.urls import path
from .views import *
# from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('invoices', InvoiceListView.as_view(), name="invoices"),
    path('invoices/<int:invoice_id>', InvoiceView.as_view(), name="invoice"),
    path('invoices/new', NewInvoiceView.as_view(), name="new_invoice"),
    path('invoices/<int:invoice_id>/items', NewItemView.as_view(), name="new_item"),
    path('user/signin', SignInView.as_view(), name="login"),
    path('user/signup', SignUpView.as_view(), name="signup"),
]