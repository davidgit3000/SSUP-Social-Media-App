# Generated by Django 4.2.4 on 2023-12-01 19:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_posts_username_posts_userid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='posts',
            old_name='userID',
            new_name='user',
        ),
    ]
