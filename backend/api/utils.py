import datetime
import random
import json

from api.models import Invoice

class CostCalculator:
    def calculate_cost(Team):
        s = []
        competition = Team.Competition
        print(Team.Competition)
        cost = 0
        if "English Debate Competition" in competition.name:
            early_bird_end = datetime.date(2023, 10, 4)
            today = datetime.date.today()
            if(today <= early_bird_end):
                sub_count = max(0,(Team.Members)- 3)
                cost = cost + (competition.Regi_Fee - 50000) + sub_count*70000 + competition.WO_Fee
                s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee})
                s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                s.append({"type":"Biaya Peserta Cadangan","quantity":sub_count,"each":70000,"sum":sub_count*70000})
                s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-50000,"sum": -50000})
            elif(today > early_bird_end):
                sub_count = max(0,(Team.Members)- 3)
                cost = cost + competition.Regi_Fee + sub_count*70000 + competition.WO_Fee
                s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee})
                s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                s.append({"type":"Biaya Peserta Cadangan","quantity":sub_count,"each":70000,"sum":sub_count*70000})
        elif "Model United Nation DISEC" in competition.name:
            early_bird_end = datetime.date(2023, 10, 2 )
            today = datetime.date.today()
            if(today <= early_bird_end):
                if((Team.Members) >= 8):
                    cost = cost + ((competition.Regi_Fee - 50000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-30000,"sum":(Team.Members)*-30000})
                elif((Team.Members) >= 5):
                    cost = cost + ((competition.Regi_Fee - 40000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                elif((Team.Members) < 5):
                    cost = cost + ((competition.Regi_Fee - 20000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
            elif(today > early_bird_end):
                if((Team.Members) >= 8):
                    cost = cost + ((competition.Regi_Fee - 40000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-40000,"sum":(Team.Members)*-40000})
                if((Team.Members) >= 5):
                    cost = cost + ((competition.Regi_Fee - 20000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                if((Team.Members) < 5):
                    cost = cost + (competition.Regi_Fee * Team.Members) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":(competition.Regi_Fee*Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
        elif "Model United Nation UNESCO" in competition.name:
            early_bird_end = datetime.date(2023, 10, 2 )
            today = datetime.date.today()
            if(today <= early_bird_end):
                if((Team.Members) >= 8):
                    cost = cost + ((competition.Regi_Fee - 50000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-30000,"sum":(Team.Members)*-30000})
                elif((Team.Members) >= 5):
                    cost = cost + ((competition.Regi_Fee - 40000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                elif((Team.Members) < 5):
                    cost = cost + ((competition.Regi_Fee - 20000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon Early Bird","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
            elif(today > early_bird_end):
                if((Team.Members) >= 8):
                    cost = cost + ((competition.Regi_Fee - 40000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-40000,"sum":(Team.Members)*-40000})
                if((Team.Members) >= 5):
                    cost = cost + ((competition.Regi_Fee - 20000)*(Team.Members)) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":competition.Regi_Fee*(Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
                    s.append({"type":"Diskon","quantity":(Team.Members),"each":-20000,"sum":(Team.Members)*-20000})
                if((Team.Members) < 5):
                    cost = cost + (competition.Regi_Fee * Team.Members) + competition.WO_Fee
                    s.append({"type":"Biaya Registrasi","quantity":(Team.Members),"each":competition.Regi_Fee,"sum":(competition.Regi_Fee*Team.Members)})
                    s.append({"type":"Biaya WO","quantity":(Team.Members),"each":competition.WO_Fee,"sum":competition.WO_Fee})
        elif(competition.fee_type == "TF"):
            cost = cost + competition.Regi_Fee + competition.WO_Fee
            s.append({"type":"Biaya Registrasi","quantity":Team.Members,"each":competition.Regi_Fee,"sum":competition.Regi_Fee})
            s.append({"type":"Biaya WO","quantity":Team.Members,"each":competition.WO_Fee,"sum":competition.WO_Fee})
        elif(competition.fee_type == "PF"):
            cost = cost + competition.Regi_Fee + competition.WO_Fee
            s.append({"type":"Biaya Registrasi","quantity":1,"each":competition.Regi_Fee,"sum":competition.Regi_Fee})
            s.append({"type":"Biaya WO","quantity":1,"each":competition.WO_Fee,"sum":competition.WO_Fee})
        while(True):
            unicode = random.randrange(1,1000)
            if(not Invoice.objects.filter(invoice_sum = cost+unicode).exists()):
                cost = cost+unicode
                s.append({"type":"unicode","quantity":1,"each":unicode,"sum":unicode})
                break
        return (cost,json.dumps(s))