# Multiplica Colors API
This project is an application that manage colors for a company. This app works like a REST API.

## Technologies
- NodeJs under the ExpressJs framework.
- Authentication and Authorization with Passport js.
- Sequelize as ORM for a PostgresSql Database.

## Dependencies
- NodeJs (Tested on version 14.5.x)
- Npm (Tested on version 6.14.x)
- Postgres Database (Tested on version 12.3) 

## Running
Clone the project and cd into the project root folder.
~~~
git clone https://github.com/abrahamCerda/colors.git
cd colors
~~~
Install project dependencies
~~~
npm run install
~~~
Create .env file from the .env.example and replace with your enviroment values:
~~~
cp .env.example .env
~~~
Once you have database configurated and running, run database migrations
~~~
npm run db:migrate
~~~ 
Run database seeders
~~~
npm run db:seed
~~~
Start the application in local enviroment
~~~
npm run start_debug
~~~
## API Usage
All **"internal"** endpoints require a previous authentication ir order to obtain an *auth_token*.
- **Login**: For simplicity, to get valid credentials please contact System Administrator to the mail: **abraham.cerdaiturra@gmail.com**.

~~~
Request Headers:
    - Accept: application/json

Request Method: POST

Path: /auth/login

Example URL: http://localhost:3001/auth/login

Example Request Body:
    {
        "email": "email",
        "password": "password"
    }

Example Response:
    {
        "access_token": "<token>",
        "id": 1,
        "email": "<user_email>",
        "role": {
            "id": 1,
            "name": "<user_role>"
        }
    }
~~~
- **Find colors:** Find colors by page index, page size and order.
~~~
Request Headers:
    - Authorization: Bearer <auth_token>
    - Accept: application/json

Request Method: GET

Path: /colors

Request Query Params:

    - page: page index starting from 0 (default value: 0)
    - pageSize: size of the page (default value: 6)
    - order: order of the result, by creation date ASC or DESC (default value: ASC).

Example URL: http://localhost:3001/colors?page=0&pageSize=3&order=desc

Example Response:
    {
        "totalColors": 12,
        "colors": [
            {
                "id": 1,
                "name": "blue",
                "color": "#000000",
                "pantone": "13-1106",
                "year": 2020,
                "created_at": "2020-07-30T01:21:42.547Z",
                "updated_at": "2020-07-30T01:21:42.547Z",
                "deleted_at": null
            },
            {
                "id": 4,
                "name": "yellow",
                "color": "#0000002",
                "pantone": "13-1108",
                "year": 2020,
                "created_at": "2020-07-30T18:32:21.615Z",
                "updated_at": "2020-07-30T18:32:21.615Z",
                "deleted_at": null
            },
            {
                "id": 5,
                "name": "green",
                "color": "#0000003",
                "pantone": "13-1109",
                "year": 2020,
                "created_at": "2020-07-30T18:32:35.370Z",
                "updated_at": "2020-07-30T18:32:35.370Z",
                "deleted_at": null
            }
        ],
        "totalPages": 4,
        "currentPage": 0
    }
~~~
- **Find colors from an "external" service**: you can get the list of colors from an external service without login, that requires an api key. For simplicity, the api key can be configured in the enviroment variables. You can set the Accept header to application/xml in order to receive the result in xml format
~~~
Request Headers:
    - X-API-KEY: <api-key>
    - Accept: application/json or application/xml

Request Method: GET

Path: /api/v1/colors

Request Query Params:

    - page: page index starting from 0 (default value: 0)
    - pageSize: size of the page (default value: 6)
    - order: order of the result, by creation date ASC or DESC (default value: ASC).

Example URL: http://localhost:3001/api/v1/colors?page=0&pageSize=3&order=desc

Example Response:
    {
        "totalColors": 12,
        "colors": [
            {
                "id": 1,
                "name": "blue",
                "color": "#000000",
                "pantone": "13-1106",
                "year": 2020,
                "created_at": "2020-07-30T01:21:42.547Z",
                "updated_at": "2020-07-30T01:21:42.547Z",
                "deleted_at": null
            },
            {
                "id": 4,
                "name": "yellow",
                "color": "#0000002",
                "pantone": "13-1108",
                "year": 2020,
                "created_at": "2020-07-30T18:32:21.615Z",
                "updated_at": "2020-07-30T18:32:21.615Z",
                "deleted_at": null
            },
            {
                "id": 5,
                "name": "green",
                "color": "#0000003",
                "pantone": "13-1109",
                "year": 2020,
                "created_at": "2020-07-30T18:32:35.370Z",
                "updated_at": "2020-07-30T18:32:35.370Z",
                "deleted_at": null
            }
        ],
        "totalPages": 4,
        "currentPage": 0
    }
~~~
- **Find a color by id**:
~~~
Request Headers: 
    - Authorization: Bearer <auth_token>
    - Accept: application/json

Request Method: GET

Path: /colors/id

Path Params: id: the color id

Example URL: http://localhost:3001/colors/1

Example Response:
    {
        "id": 1,
        "name": "blue",
        "color": "#000000",
        "pantone": "13-1106",
        "year": 2020,
        "created_at": "2020-07-30T01:21:42.547Z",
        "updated_at": "2020-07-30T01:21:42.547Z",
        "deleted_at": null
    }
~~~
- **Create color**: create a non-existing color
~~~
Request Headers: 
    - Authorization: Bearer <auth_token>
    - Content Type: application/json
    - Accept: application/json

Request Method: POST

Path: /colors

Example URL: http://localhost:3001/colors

Example Request Body: 
    {
        "name": "white",
        "color": "#ffffff",
        "pantone": "13-1106",
        "year": 2020
    }

Example Response:
    {
        "id": 5,
        "name": "white",
        "color": "#ffffff",
        "pantone": "13-1106",
        "year": 2020,
        "created_at": "2020-07-30T18:32:35.370Z",
        "updated_at": "2020-07-30T18:32:35.370Z",
        "deleted_at": null
    }
~~~
- **Edit Color**: Edit an existing color:
~~~
Headers:
    - Authorization: Bearer <auth_token>
    - Content-Type: application/json
    - Accept: application/json

Method: PUT

Path: /color/id

Path Params: id: the color id

Example URL: http://localhost:3001/colors/5

Example Request Body:
    {
        "name": "red",
        "color": "#ffffff",
        "pantone": "13-1106",
        "year": 2020
    }

Example Response:
    {
        "id": 5,
        "name": "red",
        "color": "#ffffff",
        "pantone": "13-1106",
        "year": 2020,
        "created_at": "2020-07-30T18:32:35.370Z",
        "updated_at": "2020-07-30T18:39:35.370Z",
        "deleted_at": null
    }
~~~
- **Delete Color**: delete an existing color
~~~
Request Headers:
    - Authorization: Bearer <auth_token>
    - Accept: application/json

Request Method: DELETE

Path: /colors/id

Path Params: id: the color id

Example URL: http://localhost:3001/1

Example Response: {
    message: 'Color deleted!'
}
~~~
