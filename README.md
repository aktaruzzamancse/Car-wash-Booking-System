# Car-Wash-Booking-System-mui

Live URL: https://car-wash-booking-system-lime.vercel.app

# Key Features:

User Registration and Login:

Existing users can login with their password, email.

Users can select their preferred date, time, and type of car wash service.
Bookings are saved in the database for easy management.
Service Management:

Admins can add, update, or remove services.
Admins can view all bookings and manage them efficiently.
Users can update their personal information and manage their profile.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Typescrit
- zod
- jsonwetoken

## Installation and Setup

### Prerequisites

- Node.js (version x.x.x)
- MongoDB (if applicable)

### Installation

1. Clone the repository.
<pre>
   https://github.com/aktaruzzamancse/Car-wash-Booking-System
</pre>

2. Navigate to the project directory.

<pre>
     cd Car-Wash-Booking-System
</pre>

3.Install dependencies.

<pre>
     npm install
</pre>

4. .env file dependencies.
   <pre>
        NODE_ENV=dev
        PORT=5000
        DATABASE_URL= Your mongodb Url
        BCRYPT_SALT_ROUNDS=12
        JWT_ACCESS_SECRET = c14142bef6274f4c683a1efc828d8d5c9322f131bd3a04798d33296bf2ddf111
        JWT_ACCESS_EXPIRES_IN = 10d
   
   </pre>

   5. localhost server 5000 run
      <pre>
         npm run start:dev
      </pre>
