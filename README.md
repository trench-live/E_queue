# E_queue

Монорепозиторий универсальной электронной очереди с backend на Spring Boot и тремя frontend‑приложениями на React.

## О проекте

`E_queue` — это набор сервисов для сценария электронной очереди:
- создание заказа и генерация QR-кода;
- отображение статуса заказа для клиента;
- управление заказами и смена статусов для оператора;
- backend API, который хранит данные, отдает статусы и генерирует QR-коды.

По структуре репозитория проект состоит из:
- `api` — backend API;
- `qr_register_service` — интерфейс создания заказа и показа QR-кода;
- `status_display_service` — интерфейс просмотра статуса;
- `order_management_service` — интерфейс управления заказами;
- `documentation` — набор проектных `.docx`-документов;
- `.github/workflows` — CI/CD-конфигурация GitHub Actions.

## Структура репозитория

```text
E_queue/
├── api/
├── documentation/
├── order_management_service/
├── qr_register_service/
├── status_display_service/
└── .github/workflows/
```

## Архитектура

### 1) Backend: `api`

Backend реализован на Spring Boot 3.4.3, Java 17, Spring Web, Spring Data JPA и Spring Security. В качестве БД используется SQLite. 

Ключевые backend-модули:
- `controllers` — REST-контроллеры;
- `entities` — доменные сущности;
- `repos` — JPA-репозитории;
- `security` — фильтрация запросов по API key;
- `services` — прикладная бизнес-логика.

### 2) `qr_register_service`

React-приложение для создания заказа. Сервис предназначен для ввода данных заказа и вывода сгенерированного QR-кода.

### 3) `status_display_service`

React-приложение для отображения статуса заказа.

### 4) `order_management_service`

React-приложение для управления очередью. CRUD операции

## Технологический стек

### Backend
- Java 17
- Spring Boot 3.4.3
- Spring Web
- Spring Security
- Spring Data JPA
- SQLite
- Hibernate ORM + `hibernate-community-dialects`
- ZXing
- Lombok

### Frontend
- React 19
- `react-scripts` 5.0.1
- `axios` (в `qr_register_service` и `status_display_service`)
- `qrcode.react` (в `qr_register_service`)
- `react-router-dom` (в `status_display_service`)

## Безопасность

Backend использует кастомный `ApiKeyFilter`, который:
- читает заголовок `X-API-KEY`;
- отклоняет запрос без ключа;
- отклоняет запрос с неверным ключом;
- при корректном ключе запрос проходит.

## Запуск проекта локально

### Требования
- Java 17
- Maven 3.9+ или Maven Wrapper
- Node.js 18+ (лучше LTS)
- npm

### 1. Запуск backend

```bash
cd api
./mvnw spring-boot:run
```

Для Windows:

```bat
cd api
mvnw.cmd spring-boot:run
```

Альтернативно можно собрать WAR:

```bash
cd api
./mvnw clean package
```

### 2. Запуск `qr_register_service`

```bash
cd qr_register_service
npm install
npm start
```

### 3. Запуск `status_display_service`

Windows:

```bat
cd status_display_service
npm install
npm start
```

Unix/macOS:

```bash
cd status_display_service
npm install
PORT=3002 react-scripts start
```

### 4. Запуск `order_management_service`

Windows:

```bat
cd order_management_service
npm install
npm start
```

Unix/macOS:

```bash
cd order_management_service
npm install
PORT=3003 react-scripts start
```

## Переменные окружения

Так как в frontend-клиенте используются `process.env.REACT_APP_API_BASE_URL` и `process.env.REACT_APP_API_KEY`, минимально ожидаются такие переменные:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_API_KEY=your-secret-api-key
```

## Пример пользовательского сценария

### Создание заказа
1. Открыть `qr_register_service`.
2. Заполнить форму заказа.
3. Отправить данные на backend.
4. Получить PNG QR-код.

### Просмотр статуса
1. Открыть `status_display_service`.
2. Открыть ссылку из QR.
3. Получить текущий статус заказа.

### Работа оператора
1. Открыть `order_management_service`.
2. Загрузить список заказов.
3. Выбрать новый статус.
4. Отправить обновление на backend.
5. При необходимости удалить заказ.

## Документация внутри репозитория

В папке `documentation` уже лежат отдельные документы:
- `API.docx`
- `Order-Management-Service.docx`
- `Project-description.docx`
- `QR-Register-Service.docx`
- `Status-Display-Service.docx`
