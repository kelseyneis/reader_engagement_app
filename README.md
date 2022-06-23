# Reader engagement survey app

## Quickstart

__With Docker__:

1. Start Docker
2. In `nginx.default.conf`, comment out `server_name  cs-u-grace.cs.umn.edu;` and uncomment `server_name 0.0.0.0;`
3. Build and start containers: `docker-compose build && docker-compose up`
4. Go to http://0.0.0.0/

__Without Docker__:

1. In `package.json`, change the proxy line to: `"proxy": "http://127.0.0.1:9000"`
2. Start the backend: `cd backend && pipenv run gunicorn -b 0.0.0.0:9000 wsgi:app --reload`
3. Start the frontend: `cd frontend && npx nodemon`
4. Go to http://localhost:3000/

## Credits

[This tutorial](https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/) by @shiv_ka_ansh was used to connect the React frontend to the Flask backend

[react-text-annotate](https://github.com/mcamac/react-text-annotate) by @mcamac for the text highlighting component

[console-log-level](https://github.com/watson/console-log-level) by @watson for the frontend logger

## TODO

- [ ] Clean up routing. Using react-router with nginx makes it so refreshing the page breaks everything. This is because only the / route will load the Javascript. I've made a meal out of the routing, adding `read/` to the story routes and then needing to add `../` to remove it when routing to the backend. There is probably a more elegant way to manage this.
- [ ] Consider adding routing for pages and take questions out of page rotation
- [ ] When highlight toggled on, skip question pages
- [ ] Clean up CSS
- [ ] Conditionally use localhost or IP of grace server