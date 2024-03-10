import uuid
import secrets

from django.db import models
from django.core.exceptions import ValidationError

from api.mail import send_email_invoice_cancelled, send_email_payment_verified, send_email_waiting_payment


def file_size(value):
    limit = 3 * 1024 * 1024
    if value.size > limit:
        raise ValidationError('File too large. Size should not exceed 3 MB.')

# set upload path and filename
def upload_to(instance, filename):  
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'Pas_Foto/{filename}'.format(filename=filename)

def upload_to1(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'akte_lahir/{filename}'.format(filename=filename)

def upload_to2(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'Kartu_Identitas/{filename}'.format(filename=filename)

def upload_to3(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'Surat_Sekolah/{filename}'.format(filename=filename)

def upload_to4(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'Foto_Guru/{filename}'.format(filename=filename)

def upload_to6(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'Surat_Izin_Orangtua/{filename}'.format(filename=filename)

def upload_to7(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
    return 'Surat_Penanggung_Resiko/{filename}'.format(filename=filename)

def generate_secrets_token():
    return secrets.token_hex(64)

# def upload_to(instance, filename):
#     ext = filename.split('.')[-1]
#     filename = "%s.%s" % (uuid.uuid4().hex[:80], ext)
#     return os.path.join('uploads/', filename)

class Competition(models.Model):
    class LevelChoices(models.TextChoices):
        SMP = 'SMP','smp'
        SMA = 'SMA','sma'
        UMUM = 'UMUM','Umum'
    # LEVEL_CHOICES = [
    #     ('SMP','SMP'),
    #     ('SMA','SMA'),
    #     ('UMU','Umum')
    # ]
    class StatusChoices(models.TextChoices):
        Online = 'ONLINE', 'Online'
        Offline = 'OFFLINE', 'Offline'
    
    class FeeTypeChoices(models.TextChoices):
        PF = 'PF','Per Person Fee'
        TF = 'TF','Per Team Fee'
    class SchoolTypeChoices(models.TextChoices):
        PS = 'PS','Per Person School'
        TS = 'TS','Per Team School'

    name = models.CharField(max_length=80)
    # level = models.CharField(
    #     max_length=3,
    #     choices=LEVEL_CHOICES,
    #     default='SMP'
    # )
    level = models.CharField(
        verbose_name="Level yang dipilih",
        max_length=50,
        choices=LevelChoices.choices,
        default = "SMP"
    )
    fee_type = models.CharField(
        verbose_name="Fee Type",
        max_length=20,
        choices=FeeTypeChoices.choices,
        default='TF'
    )
    School_type = models.CharField(
        verbose_name="School Type",
        max_length=30,
        choices=SchoolTypeChoices.choices,
        default='TS'
    )
    status = models.CharField(
        verbose_name="Status yang dipilih",
        max_length=7,
        choices=StatusChoices.choices,
        default = "Online"
    )
    Pas_Foto = models.BooleanField(default=True)
    Identitas = models.BooleanField(default=True)
    Akte_Lahir = models.BooleanField(default=True)
    Surat_Sekolah = models.BooleanField(default=True)
    Teacher = models.BooleanField(default=True)
    Teacher_Number = models.BooleanField(default=False)
    Teacher_Photo = models.BooleanField(default=False)
    Nomor_Peserta = models.BooleanField(default=False)
    Surat_Izin_Orangtua = models.BooleanField(default=False)
    Surat_Penanggung_Resiko = models.BooleanField(default=False)
    Regi_Fee = models.PositiveIntegerField()
    WO_Fee = models.PositiveIntegerField()
    Minimum_Age = models.PositiveIntegerField(default=0)
    Maximum_Age = models.PositiveIntegerField(default=99)
    Minimum_Team_Size = models.PositiveIntegerField(default=0)
    Maximum_Team_Size = models.PositiveIntegerField(default=20)
    Peraturan =  models.TextField(null = True, blank=True)
    # Peraturan =  models.JSONField(null = True)
    Official_Member = models.PositiveIntegerField(default=0)
    Kuota_Team = models.PositiveIntegerField(default=200)
    # Contact_Person = models.JSONField(null = True)
    Contact_Person = models.TextField(null = True, blank=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.get_level_display()} - {self.get_fee_type_display()}"
    
class RegistrationCustomField(models.Model):
    FIELD_LEVEL = [
        ('TE', 'TEAM'),
        ('PA', 'PARTICIPANT')
    ]
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='custom_field')
    field_level = models.CharField(max_length=4, choices=FIELD_LEVEL)
    field_name = models.CharField(max_length=64)
    choices = models.CharField(max_length=256) # choices separated by $ (dollar sign)
    
    def __str__(self) -> str:
        return f"{self.competition.name} - {self.field_name}"

class Team(models.Model):
    FORM_STATUS = [
        ('UP','UNPAID'),
        ('AP','AWAITING PAYMENT'),
        ('PA','PAID'),
        ('AR','AWAITING REVIEW'),
        ('ED','EXTRA DATA ARE NEEDED'),
        ('RE','REJECTED'),
        ('AC','ACCEPTED')
    ]
    status = models.CharField(
        max_length= 2,
        choices=FORM_STATUS,
        default='UP'
    )
    Team_Name = models.CharField(max_length=200, blank=True)
    School = models.CharField(max_length=200, blank=True)
    Members = models.IntegerField(blank=True)
    Email = models.EmailField(max_length=300, null=True)
    Competition = models.ForeignKey(
        Competition,
        on_delete= models.RESTRICT,
        related_name="teams",
        default=None)
    Surat_Sekolah = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to3
    )
    Team_Code = models.CharField(max_length = 12,default="")
    Nomor_Rekening = models.CharField(max_length = 150,default="")
    Post_Token = models.CharField(max_length=128, default=generate_secrets_token, editable=False)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_status = self.status

    def save(self, *args, **kwargs):
        # Only do this part if the PK is not set yet
        if self.pk is None:
            # Generate a random string for valid_coupons
            while(True):
                self.Team_Code = uuid.uuid4().hex[:12].upper()
                if not type(self).objects.filter(Team_Code=self.Team_Code).exists():
                    break
                # if not type(self).objects.filter(Team_Name=self.Team_Name).exists():
                #     break
        
        # Send email when status changed on existing invoice
        if self.pk is not None:
            if self.status == 'PA' and self.__original_status != 'PA' and self.invoice != None:
                send_email_payment_verified(self, self.invoice.invoice_sum)
                
            if self.status == 'UP' and self.__original_status != 'UP' and self.invoice != None:
                send_email_invoice_cancelled(self)
                
            if self.status == 'AP' and self.__original_status != 'AP' and self.invoice != None:
                send_email_waiting_payment(self, self.invoice.invoice_sum)
                

        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.Team_Name} - {self.Competition} - {self.get_status_display()}"


class Participant(models.Model):
    name = models.CharField(max_length=255, blank=True)
    birthdate = models.DateField(blank=True)
    age = models.PositiveIntegerField(blank=True)
    phone = models.CharField(max_length=100, blank= True)
    School = models.CharField(max_length=100, blank= True)
    Email = models.EmailField(blank= True)
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name= "Participant",
        blank=True)
    post_token = models.CharField(max_length=128, default=generate_secrets_token, editable=False, blank=True)

    def __str__(self):
        return f"{self.name} {self.team}"

class Document(models.Model):
    # class Type_Documents(models.TextChoices):
    #     PF = 'PF','Pas Foto'
    #     ID = 'ID','Kartu Identitas'
    #     AK = 'AK','Akte Kelahiran'

    owner = models.OneToOneField(
        Participant,
        on_delete= models.CASCADE,
        related_name = "documents",
        default= None
    )
    # Type_Docs = models.CharField(
    #     verbose_name="Status yang dipilih",
    #     max_length=20,
    #     choices=Type_Documents.choices,
    #     default = "Online"
    # )
    key = models.CharField(max_length=255,default='')
    akte_lahir = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to1,
    )
    pas_foto = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to,
        
    )
    Kartu_Identitas = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to2,
    )
    Surat_Izin_Orangtua = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to6,
    )
    Surat_Penanggung_Resiko = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to7,
    )
    verified = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.owner}"

class Teacher(models.Model):
    name = models.CharField(max_length=255, blank= True)
    email = models.EmailField(blank= True)
    phone = models.CharField(max_length=20, blank= True)
    # line = models.CharField(max_length=50, null= True, blank= True)
    # whatsapp = models.CharField(max_length=20, null= True, blank=True)
    Foto = models.FileField(
        blank=True,
        # validators=[FileExtensionValidator(['pdf','jpg','jpeg','png']),file_size],
        upload_to= upload_to4)
    team = models.OneToOneField(
        Team,
        on_delete= models.CASCADE,
        related_name = "Teacher",
        default= None
    )
    def __str__(self):
        return f"{self.name} {self.team}"

class Invoice(models.Model):
    team = models.OneToOneField(
        Team,
        on_delete = models.CASCADE,
        related_name = "invoice",
        default = None
    )
    invoice_sum = models.PositiveIntegerField(null=True)
    invoice_code = models.CharField(max_length = 8,default="")
    detail = models.TextField(blank=True,null=True) 
    transaction_details = models.CharField(max_length=1000, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """If PK is not set """
        if self.pk is None:
            while(True):
                self.invoice_code = uuid.uuid4().hex[:8].upper()
                if not type(self).objects.filter(invoice_code=self.invoice_code).exists():
                    break
        super().save(*args, **kwargs) 

    def __str__(self):
        return f"{self.invoice_code} {self.team}"


class CustomFieldResult(models.Model):
    field = models.ForeignKey(RegistrationCustomField, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, blank=True)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, null=True, blank=True)
    value = models.CharField(max_length=64)
    
    def __str__(self) -> str:
        return f"{self.field}: {self.value}"
