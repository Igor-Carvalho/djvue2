"""Rotas da API."""

from rest_framework import routers

from core.views import ProdutoViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('produtos', ProdutoViewSet)

urls = router.urls, 'djvue', 'v1'
