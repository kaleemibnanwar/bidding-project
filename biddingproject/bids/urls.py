from django.urls import path
from .views import (
    job_list,
    my_job_list,
    job_detail,
    job_create,
    job_update,
    job_delete,
    my_bid_list,
    bid_list,
    bid_detail,
    bid_create,
    bid_delete,
)

urlpatterns = [
    path('jobs/', job_list, name='job-list'),
    path('jobs/my', my_job_list, name='job-list'),
    path('jobs/<int:pk>/', job_detail, name='job-detail'),
    path('jobs/create/', job_create, name='job-create'),
    path('jobs/<int:pk>/update/', job_update, name='job-update'),
    path('jobs/<int:pk>/delete/', job_delete, name='job-delete'),
    path('bids/my', my_bid_list, name='bid-list'),
    path('jobs/<int:job_pk>/bids/', bid_list, name='bid-list'),
    path('jobs/<int:job_pk>/bids/create/', bid_create, name='bid-create'),
    path('bids/<int:pk>/', bid_detail, name='bid-detail'),
    path('bids/<int:pk>/delete/', bid_delete, name='bid-delete'),
]
