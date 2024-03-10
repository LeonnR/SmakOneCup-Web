from rest_framework import permissions
    
class CreateOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if (request.method == 'POST'):
          return True
        if (request.user.is_authenticated):
          return True
        # Instance must have an attribute named `owner`.
        return False