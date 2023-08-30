from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.http import HttpResponseRedirect

from biddingproject.settings import EMAIL_CONFIRM_REDIRECT_BASE_URL, PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL, APP_URL


def email_confirm_redirect(request, key):
    return HttpResponseRedirect(f"{EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/")

def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )
