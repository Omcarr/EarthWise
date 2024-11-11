from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=200)
    price = models.CharField(max_length=50)
    description = models.TextField(default="No description available") 

    def __str__(self):
        return self.title


class EcoProduct(models.Model):
    product = models.ForeignKey(Product, related_name='eco_alternatives', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.CharField(max_length=50)
    description = models.TextField(default="No description available") 
    image = models.ImageField(upload_to='eco_products/')
    url = models.URLField(max_length=200, blank=True, null=True)  # New URL field
    eco_rating = models.PositiveIntegerField(default=1)


    def __str__(self):
        return self.name