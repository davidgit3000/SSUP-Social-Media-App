# Generated by Django 4.2.4 on 2023-12-04 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_alter_posts_dateposted_alter_usersinfo_last_login'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='isLiked',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
