composer install
php artisan key:generate
php artisan migrate:refresh
php artisan passport:install
php artisan db:seed
echo "done setting up your env"
echo " admin_username = admin    admin_password = 00000000"
php artisan serve
