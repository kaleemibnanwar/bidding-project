from rest_framework import serializers
from .models import Job, Bid

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'deadline', 'owner', 'budget']

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'purposal', 'amount', 'bidder', 'job']