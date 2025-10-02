# Порт для сервера
PORT=5007

# Подключение к MongoDB
MONGO_URL=ВАША_MONGO_ССЫЛКА_НА_БАЗУ

# JWT секреты
JWT_ACCESS_SECRET=SUPER_STRONG_ACCESS_SECRET
JWT_REFRESH_SECRET=super_strong_refresh_secret
JWT_RESET_SECRET=super_reset_secret_value

# URLs клиентской части
DEV_CLIENT_URL=http://localhost:5173  # укажите ваш локальный адрес во время разработки
PROD_CLIENT_URL=https://your-domain.com  # указываем на продакшн-домен

# Настройки магазина
DEFAULT_STORE=main
DEFAULT_REGION=default

# Настройки почты (для отправки email)
MAIL_FROM=Misheel-store@misheelcode.com  
# Чтобы почта работала, зарегистрируйтесь на https://resend.com/, подтвердите домен и укажите его здесь:
# например: название-магазина@ВАШ_ПОДТВЕРЖДЁННЫЙ_ДОМЕН.com
RESEND_API_KEY=ВАШ_API_KEY_ОТ_RESEND
MAIL_FROM_NAME=название-магазина  # например: Misheel Store

# Шифрование и защита
ENCRYPTION_KEY=###########################################  # любой 32-символьный ключ (можно через crypto)
SIGNING_KEY=########################################################################################  # 64-символьный ключ
HASH_SALT=###############################################  # дополнительная защита от утечек
