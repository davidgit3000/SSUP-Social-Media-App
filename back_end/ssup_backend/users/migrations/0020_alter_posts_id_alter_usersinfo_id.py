# Generated by Django 4.2.4 on 2023-12-04 07:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_alter_posts_id_alter_usersinfo_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='usersinfo',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
