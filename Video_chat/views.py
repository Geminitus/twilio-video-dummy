from django.shortcuts import render
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant



def generate_user_token(request):

    # Substitute your Twilio AccountSid and ApiKey details
    ACCOUNT_SID = 'SK53fff1b19287ba8960109d5bbdc0c56c'
    API_KEY_SID = '77d9e514a0c2fe8337dc219dc5e1a00e'
    API_KEY_SECRET = 'CQKVnuDRufzbyhbjhANkCFTIbHg5jc8f'

    # Create an Access Token
    token = AccessToken(ACCOUNT_SID, API_KEY_SID, API_KEY_SECRET)

    # Set the Identity of this token
    token.identity = 'example-user'

    # Grant access to Video
    grant = VideoGrant(room='cool room')
    token.add_grant(grant)

    # Serialize the token as a JWT
    jwt = token.to_jwt()
    print(jwt)