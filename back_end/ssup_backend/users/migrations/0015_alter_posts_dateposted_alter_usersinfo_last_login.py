# Generated by Django 4.2.4 on 2023-12-04 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_posts_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='datePosted',
            field=models.DateTimeField(default='Monday, 04 December $Y'),
        ),
        migrations.AlterField(
            model_name='usersinfo',
            name='last_login',
            field=models.DateTimeField(default='Monday, 04 December $Y'),
        ),
    ]
