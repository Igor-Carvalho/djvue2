"""Views da aplicação core."""

from django.contrib import auth
from django.views import generic
from rest_framework import permissions, serializers, viewsets

from . import models, pagination
from .serializers import UserSerializer


class IndexView(generic.TemplateView):
    """TODO."""

    template_name = 'core/index.html'


index = IndexView.as_view()


class UserViewSet(viewsets.ModelViewSet):
    """User viewset."""

    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)
    queryset = auth.get_user_model().objects.all()


class ProdutoSerializer(serializers.ModelSerializer):
    """TODO."""

    class Meta:
        """TODO."""

        model = models.Produto
        fields = '__all__'


class ProdutoViewSet(viewsets.ModelViewSet):
    """TODO."""

    serializer_class = ProdutoSerializer
    queryset = models.Produto.objects.all()
    pagination_class = pagination.CorePaginator
