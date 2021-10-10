# Django React eCommerce

Advanced eCommerce example web application with Django and React

[Development](#development) <br>
[Deployment](#deployment)

# Development

Setup environment for development

### Install dependencies

Clone the project then install python and react dependencies

```
git clone https://github.com/amirahrari/django-react-ecommerce.git
cd django-react-ecommerce
pip install -r requirements.txt
yarn # or npm install
```

### Add built in [dummy data](dummy_data)

Create database, apply migrations and add some [dummy data](dummy_data)

```
python add_dummy_data.py
```

### Run the server

```
yarn run dev
python manage.py runserver
python manage.py livereload # hot reload
```

Open http://localhost:8000/

### Admin pannel

Admin user has been created in [users.json](dummy_data/users.json) <br />
You can access the admin pannel from http://localhost:8000/admin/ <br />
phone number: 09171234567 <br />
password: password

# Deployment

Deploy with docker using postgresql, gunicorn and nginx.

### Setup envrionment variables
```
cp .env.sample .env
cp .env.db.sample .env.db
```

### Build and up image using docker compose

```
docker-compose build
docker-compose up -d
```

### Collect static files and add dummy data

```
docker-compose exec web python manage.py collectstatic --no-input
docker-compose exec web python add_dummy_data.py
```

You are good to go. Open your server ip address on port 80 (Ex on localhost: http://127.0.0.1).
