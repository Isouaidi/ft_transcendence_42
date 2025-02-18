from rest_framework import serializers
from .models import User, Invitation, FriendsList, Message, RelationsBlocked, GameInvitation, GameSettings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profilePicture', 'isFrom42', 'status', 'langue', 'dauth', 'myid42' ,'sup', 'tournamentName', 'tournamentsWin')

class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ('expeditor', 'receiver', 'message', 'parse')


class FriendsListSerializer(serializers.ModelSerializer):
    user1 = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    user2 = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = FriendsList
        fields = ['user1', 'user2', 'parse']

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'message', 'date']


class RelationsBlockedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelationsBlocked
        fields = ('userWhoBlocks', 'userBlocked')

class GameInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInvitation
        fields = ('leader', 'userInvited', 'roomId')

class GameSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSettings
        fields = ('user', 'up', 'down', 'paddleSkin', 'boardSkin', 'ballSkin')


