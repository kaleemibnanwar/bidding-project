from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Bid, Job
from .serializers import JobSerializer, BidSerializer
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy

# Job Views

@api_view(['GET'])
@login_required
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@login_required
def my_job_list(request):
    jobs = Job.objects.filter(owner=request.user).all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def job_detail(request, pk):
    job = Job.objects.get(pk=pk)
    serializer = JobSerializer(job)
    return Response(serializer.data)

@api_view(['POST'])
@login_required
def job_create(request):
    request.data['owner'] = request.user.id
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@login_required
def job_update(request, pk):
    job = Job.objects.get(pk=pk)
    serializer = JobSerializer(instance=job, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@login_required
def job_delete(request, pk):
    job = Job.objects.get(pk=pk)
    job.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@login_required
def bid_list(request, job_pk):
    bids = Bid.objects.filter(job__pk=job_pk).all()
    serializer = BidSerializer(bids, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
def my_bid_list(request):
    bids = Bid.objects.filter(bidder=request.user).all()
    serializer = BidSerializer(bids, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
def bid_detail(request, pk):
    bid = Bid.objects.get(pk=pk)
    serializer = BidSerializer(bid)
    return Response(serializer.data)


@api_view(['POST'])
@login_required
def bid_create(request, job_pk):
    serializer = BidSerializer(data=request.data)
    request.data['bidder'] = request.user.id
    if serializer.is_valid():
        serializer.save(bidder=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@login_required
def bid_delete(request, pk):
    bid = Bid.objects.get(pk=pk)
    bid.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
