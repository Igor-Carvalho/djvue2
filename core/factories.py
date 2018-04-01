"""Fábricas da aplicação core."""

import decimal
import random

import factory
from django.contrib import auth
from factory import django

from . import models


class UserFactory(django.DjangoModelFactory):
    """Fábrica de usuários."""

    username = factory.Faker('first_name')
    password = factory.Faker('ean')

    @factory.lazy_attribute
    def email(self):
        """Email aleatório."""
        return '{}@domain.com'.format(self.username)

    class Meta:
        """Meta opções da fábrica."""

        model = auth.get_user_model()
        django_get_or_create = ('username', 'email')


class ProdutoFactory(django.DjangoModelFactory):
    """TODO."""

    nome = factory.Faker('first_name')

    @factory.lazy_attribute
    def preco(self):
        """Preço."""
        return decimal.Decimal('{}.{}'.format(random.choice(range(1, 100)), random.choice(range(1, 100))))

    class Meta:
        """Meta opções da fábrica."""

        model = models.Produto
