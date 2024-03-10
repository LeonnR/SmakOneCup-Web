# Soc-Regis
 Soc Regitration

## Backend Setup
1. Clone the repository
2. Run open the terminal in the backend-python folder and create a virtual environment by `python -m venv env` or `python3 -m venv env`(python3) 
3. Open your virtual environment by typing `source env/bin/activate` (mac os) or `env\Scripts\activate` (windows)
4. Install requirements by typing `pip install -r requirements.txt`
5. Open project folder `cd backend`
6. Copy `.env.example` file into `.env` file and adjust parameter for local development
6. Do migrations `python manage.py migrate`
7. Create super user account `python manage.py createsuperuser`
8. Test server `python manage.py runserver`
9. Open `localhost:8000/admin` and create dummy data. You are ready to go
10. Do loaddata to load fixtures data into database `python3 manage.py loaddata competitions.json`

## Tutorial API
- Participant
  - Create sebuah participant: `POST` ke `website.com/api/Participant/`
  - Get semua participant dari team dengan `team_code = "abcdefg"`: `GET` ke `website.com/api/Participant/?team_code=abcdefg`
  - (post_token untested) Update seorang participant dengan `pk = i`: `PATCH` ke `website.com/api/Participant/i`
- Document
  - Create sebuah document: `POST` ke `website.com/api/Document/`
  - Get semua document participant dengan `name = Andi` dari team dengan `team_code = "abcdefg"`: `GET` ke `website.com/api/Document/?team_code=abcdefg&name=Andi`
  - (post_token untested) Update document dengan `pk = i`: `PATCH` ke `website.com/api/Document/i`
- Teacher
  - Create sebuah teacher: `POST` ke `website.com/api/Teacher/`
  - Get semua document participant dengan `name = Andi` dari team dengan `team_code = "abcdefg"`: `GET` ke `website.com/api/Document/?team_code=abcdefg&name=Andi`
  - (post_token untested) Update teacher dengan `pk = i`: `PATCH` ke `website.com/api/Document/i`




## Notes
 1. Models are defined in `backend/api/models.py`
 2. Serializers, views,  and urls are also placed in `backend/api` with corresponding filenames 

## Relevant Documentations

 -[Django Models Documentation](https://docs.djangoproject.com/en/3.2/topics/db/models/)

 -[Django REST Framework Quick Start](https://www.django-rest-framework.org/tutorial/quickstart/)
