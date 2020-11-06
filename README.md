### Urban - technical test

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />

### `npm run test

Launches the test runner

### `docker-compose up -d`

Runs the app in the production mode.<br />
avaible endpoint GET http://localhost:8000/service-area?address={address}

### Specific requirements

### `GET /service-area?address={address}`

#### Example

```bash
$ curl -X GET http://host:port/service-area/address=EC1R5DF

{
    "status": "OK",
    "search": "EC1R5DF",
    "location": {
        "address1": "Clerkenwell Rd, Holborn, London EC1R 5DF, UK",
        "lat": 51.5221993,
        "lng": -0.1097618,
        "city": "London",
        "postCode": "EC1R 5DF",
        "serviceArea": "LONCENTRAL"
    }
}
```

### Functional requirements

- [x] Seach for geo Address in any service provider(Google Maps Api for this case) then find the service area in the GeoJson File
- [x] Send 200 if the service area is found with location information
- [x] Send 500 if it is not possible to find de service area for specific address

### Non-functional requirements

- [x] Please provide your code in TypeScript
- [x] Service/Application is running on Node.js inside a container (e.g. Docker)
- [x] Provide a suitable level of coverage by unit tests
- [x] Create a local Git repo instance and commit your changes into it
- [x] Please send us zipped content of your project containing only the sources (git files
      included) and build scripts. Don't include the binaries or generated files
