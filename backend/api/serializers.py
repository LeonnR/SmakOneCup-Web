from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin

from api.models import *


class RegistrationCustomFieldSerializers(serializers.ModelSerializer):
    class Meta:
        model = RegistrationCustomField
        fields = [
          'id',
          'field_level',
          'field_name',
          'choices',
        ]
        

class CustomFieldResultSerializers(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = CustomFieldResult
        fields=[
          'field',
          'team',
          'participant',
          'value'
        ]


class CompetitionSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    level_readable = serializers.CharField(source='get_level_display',read_only = True)
    status_readable = serializers.CharField(source='get_status_display',read_only = True)
    fee_type_readable = serializers.CharField(source='get_status_display',read_only = True)
    School_type_readable = serializers.CharField(source='get_status_display',read_only = True)
    custom_field = RegistrationCustomFieldSerializers(read_only=True, many=True)
    class Meta:
        model = Competition
        fields=[
          'id',
          'name',
          'level',
          'level_readable',
          'fee_type',
          'fee_type_readable',
          'School_type',
          'School_type_readable',
          'status',
          'status_readable',
          'Pas_Foto',
          'Identitas',
          'Akte_Lahir',
          'Surat_Sekolah',
          'Teacher',
          'Teacher_Number',
          'Teacher_Photo',
          'Nomor_Peserta',
          'Surat_Izin_Orangtua',
          'Surat_Penanggung_Resiko',
          'Regi_Fee',
          'WO_Fee',
          'Minimum_Age',
          'Maximum_Age',
          'Minimum_Team_Size',
          'Maximum_Team_Size',
          'Peraturan',
          'Official_Member',
          'Kuota_Team',
          'Contact_Person',
          'teams',
          'custom_field'
        ]


class ParticipantSerializer(QueryFieldsMixin,serializers.ModelSerializer):
    birthdate = serializers.DateField(
        format="%Y-%m-%d",
        input_formats= ["%Y-%m-%d"]
    )
    class Meta:
        model = Participant
        fields=[
          'id',
          'name',
          'birthdate',
          'age',
          'phone',
          'School',
          'Email',
          'team',
          'post_token',
        ]
        # read_only_fields = ['post_token']

# class ParticipantSerializerGet(QueryFieldsMixin,serializers.ModelSerializer):
#     birthdate = serializers.DateField(
#         format="%Y-%m-%d",
#         input_formats= ["%Y-%m-%d"]
#     )
#     class Meta:
#         model = Participant
#         fields=[
#           'id',
#           'name',
#           'birthdate',
#           'age',
#           'phone',
#           'School',
#           'Email',
#           'team',
#         ]



class TeamCreateSerializers(QueryFieldsMixin, serializers.ModelSerializer):
  class Meta:
        model = Team
        fields= [
          'id',
          'Team_Name',
          'School',
          'Members',
          'status',
          'Competition',
          'Surat_Sekolah',
          'Nomor_Rekening',
          'Email',
          'Team_Code',
          'Post_Token'
        ]
        read_only_fields = ['Post_Token']


class DocumentSerializer(QueryFieldsMixin,serializers.ModelSerializer):
    class Meta:
        model = Document
        fields=[
          'id',
          'owner',
          'akte_lahir',
          'pas_foto',
          'Kartu_Identitas',
          'Surat_Izin_Orangtua',
          'Surat_Penanggung_Resiko'
        ]

class TeacherSerializer(QueryFieldsMixin,serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields=[
          'id',
          'name',
          'email',
          'phone',
          'Foto',
          'team'
        ]


class InvoiceSerializer(QueryFieldsMixin,serializers.ModelSerializer):
  class Meta:
    model = Invoice
    fields = ['id','team','invoice_code','invoice_sum','detail','transaction_details','created_at','updated_at']


class TeamProtectedSerializer(QueryFieldsMixin,serializers.ModelSerializer):
    status_readable = serializers.CharField(source='get_status_display',read_only = True)
    invoice = InvoiceSerializer(many = False, read_only = True)
    class Meta:
        model = Team
        fields = [
          'id',
          'Team_Name',
          'School',
          'status',
          'status_readable',
          'Members',
          'Competition',
          'Surat_Sekolah',
          'Nomor_Rekening',
          'Team_Code',
          'invoice'
        ]
        
