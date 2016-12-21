# NPM Group Dependency Generator

Generates package.json dependencies from separate files

## Sample Configuration

package.dev.json
```json
{
    "npm-run-all": "^3.1.2",
    "nodemon": "^1.11.0"
}
```

package.express.json

```json
{
    "body-parser": "^1.15.2",
    "cookie-parser": "^1.4.3",
    "express": "^4.14.0"
}
```

## Usage

Drop your package files into project (eg: config/package.dev.json, config/package.express.json)

Run
```
npm-generate-dep config/package.dev.json config/package.express.json
```

It will fetch all dependencies from those files and add them to package.json dependecies section by running "npm install"

