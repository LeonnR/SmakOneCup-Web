from django.template.loader import render_to_string
from django.conf import settings
from django.core.mail import send_mail


def rupiah_string(value):
    return 'Rp '+ '{:,}'.format(int(value)).replace(',','.')

def send_email_waiting_payment(team, amount):
    subject = f'Menunggu Pembayaran Registrasi Lomba {team.Competition.name} Smakonecup'
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [team.Email]
    html_email = render_to_string('email/waiting_payment.html',
        context={
            "competition_name": team.Competition.name,
            "amount": rupiah_string(amount),
            "email": team.Email,
            "name": team.Team_Name,
            "token_tim" : team.Team_Code,
    })
    send_mail(subject, html_email, email_from, recipient_list, html_message=html_email)
    
def send_email_payment_verified(team, amount):
    subject = f'Pembayaran Pendaftaran Lomba {team.Competition.name} Smakonecup Diterima'
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [team.Email]
    html_email = render_to_string('email/payment_verified.html',
        context={
            "competition_name": team.Competition.name,
            "email": team.Email,
            "name": team.Team_Name,
            "team_name": team.Team_Name,
            "amount": rupiah_string(amount),
    })
    send_mail(subject, html_email, email_from, recipient_list, html_message=html_email)
    
def send_email_invoice_cancelled(team):
    subject = f'Pendaftaran Lomba {team.Competition.name} Smakonecup Dibatalkan'
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [team.Email]
    html_email = render_to_string('email/cancelled_invoice.html',
        context={
            "competition_name": team.Competition.name,
            "email": team.Email,
            "name": team.Team_Name,
            "team_name": team.Team_Name,
    })
    send_mail(subject, html_email, email_from, recipient_list, html_message=html_email)