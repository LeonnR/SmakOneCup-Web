from django.urls import include,path
from rest_framework import routers

from api.views import *

# urutan: team --> participant --> docu --> invoice

router = routers.SimpleRouter()
router.register(r'Competition', CompetitionViewSet)
router.register(r'Team', TeamViewSet)
router.register(r'Participant', ParticipantViewSet)
router.register(r'Document', DocumentViewSet)
router.register(r'Teacher', TeacherViewSet)
router.register(r'Invoice', InvoiceViewSet)
router.register(r'CustomFieldResult', CustomFieldResultViewSet)
router.register(r'mootawebhook',MootaViewSet,basename="moota")
router.register(r'auth',TokenViewSet,basename="token")
router.register(r'cron',CronViewSet,basename="Cron")
router.register(r'export_data/kwitansi', ExportKwitansiViewSet, basename="ExportKwitansi")
router.register(r'export_data/peserta', ExportPesertaViewSet, basename="ExportPeserta")


urlpatterns = [
    path('', include(router.urls)),
    path("api-auth/", include("rest_framework.urls"))  
]