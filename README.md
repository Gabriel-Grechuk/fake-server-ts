# fake-server-ts
Simulates responses from a webserver by using simple JSON files

  ## Version 0.0.1

It works if you follow the JSON rules restrictively, (maybe) it will work like a charm

To create a new route you need to create a JSON with the following structure:
```json
{
  "name": "Module name",
  "routes": [
    {
      "route": "/person",
      "filters": {}
    },
    {
      "route": "/person/:id",
      "filters": {
        "equal": {
          "personal_number": "id"
        }
      }
    },
    {
      "route": "/person-age",
      "filters": {
        "equal": {
          "age": "age"
        },
        "gte": {
          "age": "age-bigger-than"
        }
      }
    },
    {
      "route": "/person-age/:age",
      "filters": {
        "equal": {
          "age": "age"
        }
      }
    }
  ],

  "content": [
    {
      "personal_number": 1,
      "name": "Santana",
      "age": 45
    },
    {
      "personal_number": 2,
      "name": "Anna",
      "age": 22
    },
    {
      "personal_number": 3,
      "name": "Bob",
      "age": 35
    },
    {
      "personal_number": 4,
      "name": "Peter",
      "age": 16
    },
    {
      "personal_number": 5,
      "name": "Vera",
      "age": 19
    },
    {
      "personal_number": 6,
      "name": "Elisabeth",
      "age": 15
    },
    {
      "personal_number": 7,
      "name": "John",
      "age": 18
    },
    {
      "personal_number": 8,
      "name": "Ethan",
      "age": 23
    }
  ]
}

```
And add it to a folder.

Now you can run the app calling the script `./run.sh` and inform the new folder with the command line option `--response-files-path`. Like:
```
./run.sh --port 3005 --response-files-path example
```

now you can try with any of the routes:
```
http://localhost:3005/person
http://localhost:3005/person/3
http://localhost:3005/person-age
http://localhost:3005/person-age/18
http://localhost:3005/person-age?age=35
http://localhost:3005/person-age?age-bigger-than=18
```
