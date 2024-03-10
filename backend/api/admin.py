from django.contrib import admin
from django.http import HttpResponse
import csv
from api.models import *


# Register your models here.
admin.site.register(Competition)
admin.site.register(Document)
admin.site.register(Invoice)
admin.site.register(RegistrationCustomField)

class CustomFieldResultInline(admin.TabularInline):
    model = CustomFieldResult


class ExportCsvMixin:
    def export_as_csv(self, request, queryset):

        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            row = writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export Selected"
    
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin, ExportCsvMixin):
    actions = ["export_as_csv"]
    search_fields = ['Team_Name',]
    list_display = ("Team_Code","Competition","School","Teacher","Team_Name","Nomor_Rekening","status")
    list_filter = ("Competition", )
    ordering = ("Competition",)
    inlines = [CustomFieldResultInline,]
    def phone(self, obj):
        return obj.Teacher.phone
    pass

class DocumentAdmin(admin.TabularInline):
    model = Document
    
@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin, ExportCsvMixin):
    actions = ["export_as_csv"]
    search_fields = ['team__Team_Name',]
    list_display = ("__str__","name","birthdate","age","School","team","phone","Teacher")
    list_filter = ("team__Competition", )
    ordering = ("team",)
    inlines = [DocumentAdmin, CustomFieldResultInline, ]
    def code(self,obj):
        return obj.team.Team_Code
    def competition(self,obj):
        return obj.team.Competition
    def school(self,obj):
        return obj.team.School
    def Teacher(self,obj):
        return obj.team.Teacher
    pass

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin, ExportCsvMixin):
    actions = ["export_as_csv"]
    search_fields = ['team__Team_Name',]
    list_display = ("name","team","phone")
    list_filter = ("team__Competition", )
    ordering = ("team",)
    def competition(self,obj):
        return obj.team.Competition
    def school(self,obj):
        return obj.team.School
    def contact_person(self,obj):
        return obj.first_name
    pass
