import datetime
import hmac
import json
import math
import hashlib
import requests
import os
import io
import xlsxwriter

from datetime import timedelta
from django.conf import settings
from django.http.response import JsonResponse, HttpResponse
from django.utils import timezone
from django.core.serializers import serialize
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from api.serializers import *
from api.models import *
from api.utils import CostCalculator


def checkAge(birth_date, minimum_age, maximum_age):
    parse_date = birth_date.split("-")
    dob = datetime.date(int(parse_date[0]), int(parse_date[1]), int(parse_date[2]))
    today = datetime.date(2021, 10, 1)
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    if(age >= minimum_age and age <= maximum_age):
        return True
    else:
        return False

class MootaViewSet(viewsets.ViewSet):
    http_method_names = ['post']
    
    def create(self, request):
        secret = os.getenv('MOOTA_WEBHOOK_TOKEN', '').encode()
        hm = hmac.new(secret, request.body, hashlib.sha256)
        hmac_calculated = hm.hexdigest()
        
        try:
            signature = request.headers["Signature"]
            if signature != hmac_calculated:
                return Response(status = status.HTTP_400_BAD_REQUEST, data = "Invalid Signature")
            
            data = request.data[0]
            
            # Skip non credit mutation (uang masuk)
            if data['type'] != 'CR':
                return Response(data = "OK")
            
            # Remove balance info from mutation
            if 'balance' in data:
                del data['balance']
                
            amount = int(data["amount"])
            invoices = Invoice.objects.filter(team__status = "AP")
            for invoice in invoices:
                if((invoice.invoice_code in data["description"] and amount >= math.floor(invoice.invoice_sum/1000)*1000) or invoice.invoice_sum == amount):
                    team = invoice.team
                    team.status = "PA"
                    team.save()
                    invoice.transaction_details = json.dumps(data)
                    invoice.save()
                    break
                
            return Response(data = "OK")
        except KeyError:
            return Response(status = status.HTTP_400_BAD_REQUEST, data = "Signature not provided")

# Create your views here.
class CompetitionViewSet(viewsets.ModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        competitions = Competition.objects.all()
        exclude_competition = []
        for i in competitions:
            # print(i.name)
            # participant_filter = Participant.objects.filter(team = i.teams.exclude(status = "UP").exclude(status = "RE"))
            # print(participant_filter)
            if  "Model United Nation WHO" in i.name :
                Participant_filter = Participant.objects.filter(team__Competition = i.id)
                participant_count = Participant_filter.exclude(team__status__in=['UP', "RE"]).count()
                if (participant_count>= i.Kuota_Team):
                    exclude_competition.append(i.id)
            elif "Model United Nation DISEC" in i.name:
                Participant_filter = Participant.objects.filter(team = i.id)
                participant_count = Participant_filter.exclude(team__status__in=['UP', "RE"]).count()
                if (participant_count>= i.Kuota_Team):
                    exclude_competition.append(i.id)
            else:
                team_count = i.teams.exclude(status = "UP").exclude(status = "RE").count() 
                if (team_count>= i.Kuota_Team):
                    exclude_competition.append(i.id)

        return competitions.exclude(id__in = exclude_competition)


# class TeamViewSet(viewsets.ModelViewSet):
#     queryset = Team.objects.all()
#     serializer_class = TeamSerializers
#     permission_classes = []
#     def get_serializer_class(self):
#         if self.action == "create" :
#             return TeamCreateSerializers
#         return TeamSerializers

class TeamViewSet(mixins.CreateModelMixin,viewsets.GenericViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamCreateSerializers
    permission_classes = []
    # def get(self, *args):
    #     serialized_data = serialize('json', Team.objects.all())
    #     serialized_data = json.loads(serialized_data)
    #     return JsonResponse(serialized_data, safe=False)

class ParticipantViewSet(mixins.CreateModelMixin,viewsets.GenericViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = []
    # http_method_names = ["post","get","patch"]

    def create(self, request, *args, **kwargs):
        
        post_token = request.data.get('post_token')
        if not post_token:
            return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
        
        team = Team.objects.filter(Post_Token = post_token)
        if len(team) == 0:
            return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
        
        request.data._mutable = True
        request.data['team'] = team[0].id
        request.data._mutable = False
        
        return super().create(request, *args, **kwargs)
    
    # def list(self, request, *args, **kwargs):
    def get(self, request, *args, **kwargs):

        try:
            team_code = kwargs('team_code')
            team_object = Team.objects.get(Team_Code=team_code)
            participant = Participant.objects.filter(team=team_object.id)
            # print(participants)
        except:
             return Response(data={'error': ["Participant's Team not found"]}, status=status.HTTP_400_BAD_REQUEST)
        #return HttpResponse(team_object.id)
        serialized_data = serialize('json', participant)
        serialized_data = json.loads(serialized_data)
        return JsonResponse(serialized_data, safe=False)

    # def update(self, request, *args, **kwargs):
    #    #team_code = kwargs['team_code']
    #    #team_object = Team.objects.get(Team_Code=team_code)
    #    #participant = Participant.objects.filter(team=team_object.id)

    #    return Response(status=status.HTTP_200_OK)

    
    # def update(self, request, *args, **kwargs):
    #     post_token = request.data.get('post_token')
    #     if not post_token:
    #         return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
    #     # print(post_token)
    #     team = Team.objects.filter(Post_Token = post_token)
    #     if len(team) == 0:
    #         return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
        
    #     return super().update(request, *args, **kwargs)

class DocumentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = []
    # http_method_names = [""]
    
    def create(self, request, *args, **kwargs):
        post_token = request.data.get('post_token')
        if not post_token:
            return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
        
        participant = Participant.objects.filter(post_token = post_token)
        if len(participant) == 0:
            return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
        
        request.data._mutable = True
        request.data['owner'] = participant[0].id
        request.data._mutable = False
        
        return super().create(request, *args, **kwargs)

    # def list(self, request, *args, **kwargs):
    #     try:
    #         name = request.GET.get('name')
    #         team_code = request.GET.get('team_code')
    #         team_object = Team.objects.get(Team_Code=team_code)
    #         owner = Participant.objects.get(name=name, team=team_object.id)
    #         documents = Document.objects.filter(owner=owner)
    #     except Exception as e:
    #         return Response(data={'error': ['Participant not found or data conflict']}, status=status.HTTP_400_BAD_REQUEST)
    #     # print(documents)
    #     serializer = DocumentSerializer(documents, many=True)
    #     serialized_data = serializer.data
    #     return Response(serialized_data, status=status.HTTP_200_OK)

    # def update(self, request, *args, **kwargs):
    #     post_token = request.data.get('post_token')
    #     if not post_token:
    #         return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
    #     # print(post_token)
    #     team = Team.objects.filter(Post_Token = post_token)
    #     if len(team) == 0:
    #         return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
        
    #     return super().update(request, *args, **kwargs)


class TeacherViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = []
    
    def create(self, request, *args, **kwargs):
        post_token = request.data.get('post_token')
        if not post_token:
            return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
        
        team = Team.objects.filter(Post_Token = post_token)
        if len(team) == 0:
            return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
        
        request.data._mutable = True
        request.data['team'] = team[0].id
        request.data._mutable = False
        
        return super().create(request, *args, **kwargs)
    
    # def list(self, request, *args, **kwargs):
    #     try:
    #         name = request.GET.get('name')
    #         team_code = request.GET.get('team_code')
    #         team_object = Team.objects.get(Team_Code=team_code)
    #         teacher = Teacher.objects.filter(name=name, team=team_object.id)
    #     except Exception as e:
    #         return Response(data={'error': ['Teacher not found']}, status=status.HTTP_400_BAD_REQUEST)

    #     serializer = TeacherSerializer(teacher, many=True)
    #     serialized_data = serializer.data
    #     return Response(serialized_data, status=status.HTTP_200_OK)
    
    # def update(self, request, *args, **kwargs):
    #     post_token = request.data.get('post_token')
    #     if not post_token:
    #         return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
    #     # print(post_token)
    #     team = Team.objects.filter(Post_Token = post_token)
    #     if len(team) == 0:
    #         return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
        
    #     return super().update(request, *args, **kwargs)

class InvoiceViewSet(mixins.CreateModelMixin,viewsets.GenericViewSet):
    queryset = Invoice.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = []
    serializer_class = InvoiceSerializer
    
    def create(self, request):
        # print(request.data)
        # Teams_Test = Team.objects.get(id=request.data["team"])
        # print(Teams_Test)
        # print(T.__dict__)
        # c = Team.objects.get(id = request.data["team"])
        # competition_selecteds = Competition.objects.get(id=c.Competition_id)
        # print(c.Competition.name)
        # print(c.Competition_id)
        # print(competition_selecteds)
        # print(competition_selecteds.__dict__)
        # Team_All = Team.objects.all()
        # filterTeam = Team_All.filter(Competition = competition_selecteds.id)
        # print(filterTeam.exclude(status = "UP"))
        
        try:
            # Check valid post token based on team
            post_token = request.data.get('post_token')
            if not post_token:
                return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
            
            team = Team.objects.filter(Post_Token = post_token)
            if len(team) == 0:
                return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
            
            Team_Selected = team[0]
            rep = []
            
            # Competition That request Team choose
            competition_selected = Competition.objects.get(id=Team_Selected.Competition_id)
            
            # Filter Team for quota
            All_Team = Team.objects.all()
            Filtered_Team = All_Team.filter(Competition = competition_selected.id)
            Team_Kuota_RN = Filtered_Team.exclude(status = "UP").exclude(status = "RE")
            if Team_Kuota_RN.count() >= competition_selected.Kuota_Team:
                rep.append("Kuota Lomba Penuh")
            if Team_Selected.Members < competition_selected.Minimum_Team_Size:
                rep.append("Anggota tim terlalu sedikit")
            if Team_Selected.Members > competition_selected.Maximum_Team_Size:
                rep.append("Peserta terlalu banyak")
            if len(rep) == 0:
                request.data._mutable = True
                request.data['team'] = Team_Selected.id
                request.data["transaction_details"] = ""
                request.data["invoice_sum"],request.data["detail"] = CostCalculator.calculate_cost(Team_Selected)
                request.data._mutable = False
                p = super().create(request)
                Team_Selected.status = "AP"
                Team_Selected.save()
                return p
            else:
                return Response(data={"error":rep}, status=status.HTTP_400_BAD_REQUEST)
            # return super().create(request)
        except Team.DoesNotExist:
            return Response(data={"error": ["Form Not Found"]}, status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            return Response(data={"error": ["Request Incomplete"]}, status=status.HTTP_400_BAD_REQUEST)
        # # request.data = request.data.copy()
        # print(request.data["team"])
        # # request.data["transaction_detail"] = ""
        # request.data["invoice_sum"],request.data["detail"] = CostCalculator.calculate_cost(Team)
        # p = super().create(request)
        # return p

class CustomFieldResultViewSet(mixins.CreateModelMixin,viewsets.GenericViewSet):
    queryset = CustomFieldResult.objects.all()
    serializer_class = CustomFieldResultSerializers
    permission_classes = []
    
    def create(self, request, *args, **kwargs):
        field_level = request.data.get('field_level')
        if field_level not in ['TE', 'PA']:
            return Response(data={'error': ['Invalid field level']}, status=status.HTTP_400_BAD_REQUEST)
        
        post_token = request.data.get('post_token')
        if not post_token:
            return Response(data={'error': ['Required token']}, status=status.HTTP_400_BAD_REQUEST)
        
        request.data._mutable = True
        
        if field_level == 'TE':
            team = Team.objects.filter(Post_Token = post_token)
            if len(team) == 0:
                return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
            request.data['team'] = team[0].id
            if 'participant' in request.data:
                del request.data['participant']    
            
        elif field_level == 'PA':
            participant = Participant.objects.filter(post_token = post_token)
            if len(participant) == 0:
                return Response(data={'error': ['Invalid token']}, status=status.HTTP_400_BAD_REQUEST)
            request.data['participant'] = participant[0].id
            if 'team' in request.data:
                del request.data['team']    
        
        request.data._mutable = False
        
        return super().create(request, *args, **kwargs)


class TokenViewSet(viewsets.ViewSet):
    http_method_names = ['get','post']
    def list(self, request):
        try:
            token = request.headers["AppToken"]
            Team_Token = Team.objects.get(Team_Code = token)
            if (Team_Token == None):
                return Response(status= status.HTTP_403_FORBIDDEN, data= "Invalid Token")
            return Response(TeamProtectedSerializer(Team_Token).data)
        except Team.DoesNotExist:
            return Response(status= status.HTTP_403_FORBIDDEN, data= "Invalid Token")
        except KeyError:
            return Response(status= status.HTTP_400_BAD_REQUEST, data= "No Form Code Given")


class CronViewSet(viewsets.ViewSet):
    http_method_names =  ['get']
    def list(self, request):
        
        # Cron for checking payment
        bank_id = os.getenv("MOOTA_BANK_ID", '')
        bearer_token = os.getenv("MOOTA_TOKEN", '')
        bearer_token_v2 = os.getenv("MOOTA_TOKEN_V2", '')
        
        current_time = timezone.now()
        yesterday_time = current_time - timedelta(days=1)
        
        page = 1
        mutations = []
        
        if bearer_token_v2 != '':
            while True:
                try:
                    response = requests.get(f"{os.getenv('MOOTA_URL')}/api/v2/mutation", 
                        params={
                            "type": "CR",
                            "bank": bank_id,
                            "start_date": yesterday_time.strftime("%Y-%m-%d"),
                            "end_date": current_time.strftime("%Y-%m-%d"),
                            "page": page,
                            "per_page": 100,
                        }, headers={"Authorization": f"Bearer {bearer_token_v2}"}).json()
                except requests.exceptions.JSONDecodeError:
                    break
                
                mutations += response["data"]
                if(response['last_page'] <= page):
                    break
                page += 1
                
        elif bearer_token != '':
            while True:
                try:
                    response = requests.get(f"{os.getenv('MOOTA_URL')}/api/v1/bank/{bank_id}/mutation/",
                        params={"page":page}, 
                        headers={"Authorization": f"Bearer {bearer_token}"}).json()
                except requests.exceptions.JSONDecodeError:
                    break
                
                mutations += response["data"]
                if(response['last_page'] <= page):
                    break
                page += 1
        
        waiting_payment_invoice = Invoice.objects.filter(team__status = "AP")
        
        # Check for every mutation if there is invoice exists
        for mutation in mutations:
            # Skip all mutation not credit (uang masuk)
            if mutation['type'] != 'CR':
                continue
            
            # Remove bank info from mutation
            if 'bank' in mutation:
                del mutation['bank']
                
            # Remove balance info from mutation
            if 'balance' in mutation:
                del mutation['balance']
                
            mutation_amount = int(mutation['amount'][:-3]) # Normalize string "10000.00"
            for invoice in waiting_payment_invoice:
                if((invoice.invoice_code in mutation["description"] and mutation_amount >= math.floor(invoice.invoice_sum/1000)*1000) or invoice.invoice_sum == mutation_amount):
                    team = invoice.team
                    team.status = "PA"
                    team.save()
                    invoice.transaction_details = json.dumps(mutation)
                    invoice.save()
                    break
                
        # Disable invoice cancel when moota not available
        cancel_hold_start = datetime.time(23,55)
        cancel_hold_end = datetime.time(4,0)
        current_time = datetime.datetime.now().time()
        
        if current_time >= cancel_hold_start or current_time <= cancel_hold_end:
            return Response()
                
        # Cron for cancel unpaid invoice
        unpaid_invoice = Invoice.objects.filter(
            team__status = "AP",
            created_at__lte = timezone.now() - timedelta(days=1),
            )

        for invoice in unpaid_invoice:
            team = invoice.team
            team.status = "UP"
            team.save()
            
        return Response()
    

class ExportKwitansiViewSet(viewsets.ViewSet):
    http_method_names = ['get']
    permission_classes = [IsAdminUser]
    
    def list(self, request):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet()
        
        worksheet.write(0, 0, "Jenis Lomba")
        worksheet.write(0, 1, "Uang Pendaftaran")
        worksheet.write(0, 2, "Uang WO")
        worksheet.write(0, 3, "Nama Peserta")
        worksheet.write(0, 4, "Nama Sekolah")
        worksheet.write(0, 5, "Jumlah Uang")
        worksheet.write(0, 6, "Info Rekening")
        worksheet.write(0, 7, "Team Code")
        worksheet.write(0, 8, "Email")
        worksheet.write(0, 9, "Team Status")
        worksheet.write(0, 10, "Payment Details")
        
        row_count = 1
        
        competitions = Competition.objects.all()
        for competition in competitions:
            teams = Team.objects.filter(Competition = competition)
            for team in teams:
                invoice = Invoice.objects.filter(team = team)
                if len(invoice) > 0:
                    invoice = invoice[0]
                    worksheet.write(row_count, 5, invoice.invoice_sum)
                    worksheet.write(row_count, 10, invoice.transaction_details)
                
                worksheet.write(row_count, 0, f"{competition.name} - {competition.level} - {competition.status}")
                worksheet.write(row_count, 1, competition.Regi_Fee)
                worksheet.write(row_count, 2, competition.WO_Fee)
                worksheet.write(row_count, 3, team.Team_Name)
                worksheet.write(row_count, 4, team.School)
                worksheet.write(row_count, 6, team.Nomor_Rekening)
                worksheet.write(row_count, 7, team.Team_Code)
                worksheet.write(row_count, 8, team.Email)
                worksheet.write(row_count, 9, team.status)
                row_count += 1
        
        # Close the workbook before sending the data.
        workbook.close()

        # Rewind the buffer.
        output.seek(0)

        # Set up the Http response.
        filename = 'kwitansi_soc_regis.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response

class ExportPesertaViewSet(viewsets.ViewSet):
    http_method_names = ['get']
    permission_classes = [IsAdminUser]
    
    def list(self, request):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})   
        merge_format = workbook.add_format({
            'align': 'center',
            'valign': 'vcenter',
        })     
        
        competitions = Competition.objects.all()
        worksheet_number = 1
        for competition in competitions:
            
            worksheet_raw = (f"{worksheet_number}. {competition.level} - {competition.name}")[:26-1].strip() + ".."
            
            worksheet = workbook.add_worksheet(f"{worksheet_raw}")

            worksheet_number += 1
        
            # Competition Model
            worksheet.write(0, 0, "Jenis Lomba")
            worksheet.write(0, 1, "Require Pas Foto")
            worksheet.write(0, 2, "Require Identitas")
            worksheet.write(0, 3, "Require Akte Lahir")
            worksheet.write(0, 4, "Require Surat Sekolah")
            worksheet.write(0, 5, "Require Teacher Number")
            worksheet.write(0, 6, "Require Teacher Photo")
            worksheet.write(0, 7, "Require Nomor Peserta")
            worksheet.write(0, 8, "Require Surat Izin Orang Tua")
            worksheet.write(0, 9, "Require Surat Penanggung Resiko")
            worksheet.write(0, 10, "Uang Pendaftaran")
            worksheet.write(0, 11, "Uang WO")
            worksheet.write(0, 12, "Minimum Age")
            worksheet.write(0, 13, "Maximum Age")
            worksheet.write(0, 14, "Minimum Team Size")
            worksheet.write(0, 15, "Maximum Team Size")
            worksheet.write(0, 16, "Kuota")
            worksheet.write(0, 17, "Contact Person")
            
            # Team Model
            worksheet.write(0, 18, "Nama Tim")
            worksheet.write(0, 19, "Nama Sekolah")
            worksheet.write(0, 20, "Team Status")
            worksheet.write(0, 21, "Members Count")
            worksheet.write(0, 22, "Email")
            worksheet.write(0, 23, "Surat Sekolah")
            worksheet.write(0, 24, "Team Code")
            worksheet.write(0, 25, "Nomor Rekening")
            
            # Teacher Model
            worksheet.write(0, 26, "Teacher Name")
            worksheet.write(0, 27, "Teacher Email")
            worksheet.write(0, 28, "Teacher Phone")
            worksheet.write(0, 29, "Teacher Photo")
            
            # Invoice Model
            worksheet.write(0, 30, "Jumlah Uang")
            worksheet.write(0, 31, "Invoice Code")
            worksheet.write(0, 32, "Transaction Details")
            
            # Team custom fields
            team_custom_fields = RegistrationCustomField.objects.filter(
                field_level = 'TE',
                competition = competition,
            )
            
            team_custom_field_count = len(team_custom_fields)
            for i in range(team_custom_field_count):
                worksheet.write(0, 33+i, f"Custom Field: {team_custom_fields[i].field_name}")
            
            # Participant Model
            worksheet.write(0, 34+team_custom_field_count, "Nama Peserta")
            worksheet.write(0, 35+team_custom_field_count, "BirthDate Peserta")
            worksheet.write(0, 36+team_custom_field_count, "Umur Peserta")
            worksheet.write(0, 37+team_custom_field_count, "No HP Peserta")
            worksheet.write(0, 38+team_custom_field_count, "Sekolah Peserta")
            worksheet.write(0, 39+team_custom_field_count, "Email Peserta")
            
            # Document Model
            worksheet.write(0, 40+team_custom_field_count, "Akte Lahir")
            worksheet.write(0, 41+team_custom_field_count, "Pas Foto")
            worksheet.write(0, 42+team_custom_field_count, "Kartu Identitas")
            worksheet.write(0, 43+team_custom_field_count, "Surat Izin Orang Tua")
            worksheet.write(0, 44+team_custom_field_count, "Surat Penanggung Risiko")
            worksheet.write(0, 45+team_custom_field_count, "Document Verified Status")
            
            # Participant custom fields
            participant_custom_fields = RegistrationCustomField.objects.filter(
                field_level = 'PA',
                competition = competition,
            )
            
            participant_custom_field_count = len(participant_custom_fields)
            for i in range(participant_custom_field_count):
                worksheet.write(0, 46+team_custom_field_count+i, f"Custom Field: {participant_custom_fields[i].field_name}")
            
            row_count = 1
            
            # Competition model
            worksheet.write(row_count, 0, f"{competition.name} - {competition.level}")
            worksheet.write(row_count, 1, competition.Pas_Foto)
            worksheet.write(row_count, 2, competition.Identitas)
            worksheet.write(row_count, 3, competition.Akte_Lahir)
            worksheet.write(row_count, 4, competition.Surat_Sekolah)
            worksheet.write(row_count, 5, competition.Teacher_Number)
            worksheet.write(row_count, 6, competition.Teacher_Photo)
            worksheet.write(row_count, 7, competition.Nomor_Peserta)
            worksheet.write(row_count, 8, competition.Surat_Izin_Orangtua)
            worksheet.write(row_count, 9, competition.Surat_Penanggung_Resiko)
            worksheet.write(row_count, 10, competition.Regi_Fee)
            worksheet.write(row_count, 11, competition.WO_Fee)
            worksheet.write(row_count, 12, competition.Minimum_Age)
            worksheet.write(row_count, 13, competition.Maximum_Age)
            worksheet.write(row_count, 14, competition.Minimum_Team_Size)
            worksheet.write(row_count, 15, competition.Maximum_Team_Size)
            worksheet.write(row_count, 16, competition.Kuota_Team)
            worksheet.write(row_count, 17, competition.Contact_Person)
            
            teams = Team.objects.filter(Competition = competition)
            for team in teams:  
                start_team_index = row_count
                
                # Participant model
                participants = Participant.objects.filter(team = team)
                for participant in participants:
                    worksheet.write(row_count, 34+team_custom_field_count, participant.name)
                    worksheet.write(row_count, 35+team_custom_field_count, participant.birthdate)
                    worksheet.write(row_count, 36+team_custom_field_count, participant.age)
                    worksheet.write(row_count, 37+team_custom_field_count, participant.phone)
                    worksheet.write(row_count, 38+team_custom_field_count, participant.School)
                    worksheet.write(row_count, 39+team_custom_field_count, participant.Email)
                    
                    # Document model
                    document = Document.objects.filter(owner = participant)
                    if len(document) > 0:
                        document = document[0]
                        if document.akte_lahir:
                            worksheet.write_url(row_count, 40+team_custom_field_count, request.build_absolute_uri(document.akte_lahir.url))
                        if document.pas_foto:
                            worksheet.write_url(row_count, 41+team_custom_field_count, request.build_absolute_uri(document.pas_foto.url))
                        if document.Kartu_Identitas:
                            worksheet.write_url(row_count, 42+team_custom_field_count, request.build_absolute_uri(document.Kartu_Identitas.url))
                        if document.Surat_Izin_Orangtua:
                            worksheet.write_url(row_count, 43+team_custom_field_count, request.build_absolute_uri(document.Surat_Izin_Orangtua.url))
                        if document.Surat_Penanggung_Resiko:
                            worksheet.write_url(row_count, 44+team_custom_field_count, request.build_absolute_uri(document.Surat_Penanggung_Resiko.url))
                        worksheet.write(row_count, 45, document.verified)
                        
                    # Custom field result participant
                    for i in range(participant_custom_field_count):
                        result = CustomFieldResult.objects.filter(field=participant_custom_fields[i], participant=participant)
                        if len(result) > 0:
                            worksheet.write(row_count, 46+team_custom_field_count+i, result[0].value)
               
                    row_count += 1
                
                # Prevent error row count on empty participant
                if len(participants) == 0 :
                    row_count += 1
                
                # Merge cell if participant more than 1
                if len(participants) > 1:
                    # Team model
                    worksheet.merge_range(start_team_index, 19, row_count-1, 19, None)
                    worksheet.merge_range(start_team_index, 20, row_count-1, 20, None)
                    worksheet.merge_range(start_team_index, 21, row_count-1, 21, None)
                    worksheet.merge_range(start_team_index, 22, row_count-1, 22, None)
                    worksheet.merge_range(start_team_index, 23, row_count-1, 23, None)
                    worksheet.merge_range(start_team_index, 24, row_count-1, 24, None)
                    worksheet.merge_range(start_team_index, 25, row_count-1, 25, None)
                    worksheet.merge_range(start_team_index, 26, row_count-1, 26, None)
                
                    # Teacher model
                    worksheet.merge_range(start_team_index, 27, row_count-1, 27, None)
                    worksheet.merge_range(start_team_index, 28, row_count-1, 28, None)
                    worksheet.merge_range(start_team_index, 29, row_count-1, 29, None)
                    worksheet.merge_range(start_team_index, 30, row_count-1, 30, None)
                
                    # Invoice model
                    worksheet.merge_range(start_team_index, 31, row_count-1, 31, None)
                    worksheet.merge_range(start_team_index, 32, row_count-1, 32, None)
                    worksheet.merge_range(start_team_index, 33, row_count-1, 33, None)
                    
                    # Custom Field Result model
                    for i in range(team_custom_field_count):
                         worksheet.merge_range(start_team_index, 34+i, row_count-1, 34+i, None)
                
                # Write team models     
                worksheet.write(start_team_index, 19, team.Team_Name, merge_format)
                worksheet.write(start_team_index, 20, team.School, merge_format)
                worksheet.write(start_team_index, 21, team.status, merge_format)
                worksheet.write(start_team_index, 22, team.Members, merge_format)
                worksheet.write(start_team_index, 23, team.Email, merge_format)
                if team.Surat_Sekolah:
                    worksheet.write_url(start_team_index, 24, request.build_absolute_uri(team.Surat_Sekolah.url), cell_format=merge_format)
                worksheet.write(start_team_index, 25, team.Team_Code, merge_format)
                worksheet.write(start_team_index, 26, team.Nomor_Rekening, merge_format)
            
                # Write teacher models
                teacher = Teacher.objects.filter(team = team)
                if len(teacher) > 0 :
                    teacher = teacher[0]
                    worksheet.write(start_team_index, 27, teacher.name, merge_format)
                    worksheet.write(start_team_index, 28, teacher.email, merge_format)
                    worksheet.write(start_team_index, 29, teacher.phone, merge_format)
                    if teacher.Foto:
                        worksheet.write_url(start_team_index, 30, request.build_absolute_uri(teacher.Foto.url), cell_format=merge_format)
            
                # Write invoice models
                invoice = Invoice.objects.filter(team = team)
                if len(invoice) > 0:
                    invoice = invoice[0]
                    worksheet.write(start_team_index, 31, invoice.invoice_sum, merge_format)
                    worksheet.write(start_team_index, 32, invoice.invoice_code, merge_format)
                    worksheet.write(start_team_index, 33, invoice.transaction_details, merge_format)
                
                # Custom field result team
                for i in range(team_custom_field_count):
                    result = CustomFieldResult.objects.filter(field=team_custom_fields[i], team=team)
                    if len(result) > 0:
                        worksheet.write(start_team_index, 34+i, result[0].value, merge_format)
                   
        
        # Close the workbook before sending the data.
        workbook.close()

        # Rewind the buffer.
        output.seek(0)

        # Set up the Http response.
        filename = 'main_database_soc_regis.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response