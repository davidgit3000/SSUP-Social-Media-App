# Generated by Django 4.2.4 on 2023-12-03 06:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_rename_userid_posts_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='datePosted',
            field=models.DateField(default=datetime.datetime(2023, 12, 2, 22, 2, 32, 663421)),
        ),
    ]
