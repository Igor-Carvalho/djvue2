"""Modelos da aplicação core."""

import hashlib

from auditlog.models import AuditlogHistoryField
from auditlog.registry import auditlog
from django.contrib.auth.models import AbstractUser
from django.db import models
from model_utils.models import TimeStampedModel


class User(TimeStampedModel, AbstractUser):
    """Usuário base do projeto."""

    history = AuditlogHistoryField()

    def gravatar_url(self):
        """Obtém a url gravatar em função do email fornecido."""
        return '//www.gravatar.com/avatar/{}'.format(hashlib.md5(self.email.encode('utf-8')).hexdigest())

    class Meta:
        """Model meta."""

        verbose_name = 'Usuário'


auditlog.register(User)


class Produto(TimeStampedModel):
    """Um produto."""

    nome = models.CharField(max_length=30)
    preco = models.DecimalField(decimal_places=2, max_digits=9)

    history = AuditlogHistoryField()

    class Meta:
        """Meta opções do modelo."""

        ordering = ['-id']

    def __str__(self):
        """toString."""
        return self.nome
