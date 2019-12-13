# IMDB Crawler

Crawl IMDB for extracting movie details

## Setup

1. `git clone https://github.com/milad-abbasi/imdb-crawler.git`
2. `cd imdb-crawler`
3. `npm install && npm start`

## NPM Commands

| Command     | Description          |
| ----------- | -------------------- |
| npm install | Install dependencies |
| npm start   | Start crawling       |

## Some of the API endpoints

| HTTP Method | Url                  | Description                         |
| ----------- | -------------------- | ----------------------------------- |
| GET         | /user/               | Get user information                |
| PATCH       | /user/profile        | Update user profile                 |
| PATCH       | /user/profile/avatar | Update user avatar                  |
| DELETE      | /user/profile/avatar | Delete user avatar                  |
| POST        | /auth/google         | Authenticate user with google token |
| POST        | /auth/confirmation   | Confirm email address               |
| POST        | /auth/resend         | Resend confirmation email           |
| POST        | /auth/forgotpass     | Send password reset email           |
| POST        | /auth/resetpass      | Reset user password                 |
| GET         | /auth/uploadurl      | Generate signature for image upload |
