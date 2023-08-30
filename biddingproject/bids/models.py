from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    budget = models.IntegerField()
    deadline = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')

    def __str__(self):
        return self.title

class Bid(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purposal = models.TextField()
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bids')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='bids')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bid of ${self.amount} on {self.job.title} by {self.bidder.username}"