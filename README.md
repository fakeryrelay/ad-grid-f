# Инструкция по установке и запуску проекта

## 1. Скачиваение проекты

Открыть редактор кода (в моем случае VS Code). Выбрать рабочу папку. Открыть консоль разработчика и выполнить команду

### `git clone https://github.com/fakeryrelay/ad-grid-f.git`

Перейти в рабочую папку при помощь команды 

### `cd ad-grid-f`

## 2. Создание БД ( в моем случае с использованием pgAdmin 4)

Создать базу данных в удобном месте

![image](https://github.com/fakeryrelay/ad-grid-f/assets/79545766/348f4c60-1803-4661-80bd-b76e14e7c63d)

Перейти в Query Tool

![image](https://github.com/fakeryrelay/ad-grid-f/assets/79545766/e2bd14b7-6f08-4835-91a0-3e664442de74)

Импортировать файл 'init-db.sql' из склонированной папки

![image](https://github.com/fakeryrelay/ad-grid-f/assets/79545766/8766146c-a2ff-4638-86e6-e035f1eb28d1)

Запустить скрипт нажатием кнопки либо клавишей F5

![image](https://github.com/fakeryrelay/ad-grid-f/assets/79545766/93b9c201-952d-4065-9862-17844c40de25)

БД создана

## 3. Настройка и запуск сервера

В VS Code перейти в папку server при помощи команды 

### `cd server`

Установить необходимые библиотеки

### `npm i`

В файле config.json, который находится в папке servers/config в пунке url ввести адресс доступа к своей БД

![image](https://github.com/fakeryrelay/ad-grid-f/assets/79545766/8d57fa44-fd1f-4640-8a8b-f3b22de47f46)

Связать БД и сервер при помощи команды

### `npx sequelize-cli db:migrate`

Запустить сервер

### `npm run dev`

Сервер и БД запущены

## 4. Настройка и запуск клиентской части приложения

В VS Code перейти в папку client. Если ыв остановились на предыдущем шаге создания БД, то это можно сделать при помощи команды

### `cd ../client`

Установить необходимые библиотеки

### `npm i`

Запустить проект в режиме разработчика

### `npm start`

Проект успешно собран и запущен.

# Опциональные решения

## Сервер

1. Использована библиотека "express-async-handler" для работы с запросами т.к. с ней в случае расширения количества запросов удобнее отлавливать и возращать необходимые состояния HTTP с которыми возможно будет необходимо работать на клиентской части. Можно было отлавливать ошибки с помощью стандартной конструкции JS: try...catch.
2. Валидация выполнена простым способом. В случае необходимости можно использовать более сложные конструкции для работы с NUMERIC и прочими данными. Также можно использовать библиотеку 'validate'.

## Клиент

1. Так как не знал, какой интерфейс будет оптимальным, сделал тот, который посчитал удобнее. При необходимости можно перенести все кнопки для работы с запросами в верхнюю часть страницы(что, в каком-то смысле, проще). Либо в верхнюю часть можно перенести функционал для более конкретных случаев работы с таблице (удаление выбраных строке, шаблонной добавление данных и т.п.).
2. Для работы с запросами использована библиотека axios. Посчитал этот вариант более удобным и если смотреть на расширение функционала, то она проще для вывода сообщений для пользователя о состоянии запроса (error messages etc.). Можно было пользоваться стандартным методом fetch.
3. Для валидации и удобного заполнения данных использовал метод библиотеки cellEditor. Из вариантов реализации cellEditor выброл вариант на классах, так как он меньше изменяет поведение ячейки и, мне показалось, что более прост в работе. Также можно было создать кастомные компоненты для каждого типа данных, но посчитал это лишним, так как есть специальный метод библиотеки.
4. При неверном изменении данных, таблица возращает свои старые данные. Посчитал этот способ удобным т.к. визуально отображается красным некоректно введенные данные, хотя можно было оставить возможность дальнейшей редакции таблицы.
5. Вместо создания SPA выбрал вариант с MPA т.к. при масштабировании приложения будет удобнее работать и переключаться между компонентами. Так же она позволяет добавлять удобные функции, например, возращение назад и т.п. Что не реализовать качественно без библиотеки для работы с состояниями.
6. Не покрывал некоторые запросы на отправку и изменение дополнительными тестами на валидность т.к. реализовал кастомные input и select, которые позволяюьт вводить пользователю только валидные данные.

P.S. Большая часть времени ушла на изучение работы с ag-grid и способов манипулции с данными. Интересный проект.
