# TailorChallenge

This is a **[Next.js](https://nextjs.org/) restaurant list** project that handles authentication with JWT.

### App functionalities

The app allows users to see all available restaurants and their details. They can mark/unmark them as favourites and check the ones already added in their personal profile, where they are also allowed to delete their account.

### Installation

```sh
npm install
```

### .env.local variables needed

```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
MONGODB_URI
```

### Usage

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Endpoints

|	Method	|	Path	|	Description	|
|	-	|	-	|	-	|
|	POST	|	/api/auth/signup	|	A new user is added to the database if the input fields are not empty and the user does not exist yet	|
| GET | /api/restaurants | Retrieves all restaurants |
| GET | /api/restaurants/:id | Retrieves one restaurant |
| GET | /api/users | Retrieves all users |
| GET | /api/users/:id | Retrieves user |
| PUT | /api/users/:id | Updates user details |
| DELETE | /api/users/:id | Deletes user |

### Technologies

- Next.js
- React
- MongoDB
- Node
- Javascript (ES6)

### Additional info

This challenge has been developed by Laura de Cos for [Tailor Hub](https://github.com/TailorHub-Mad/TailorChallenge/blob/master/instructions.md). First experience with Next.js and JWT.
