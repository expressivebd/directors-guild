# Directors' Guild

A comprehensive platform for directors to manage their projects, collaborate with teams, and connect with the film community.

## Features

- **User Authentication**: Secure registration and login system with NextAuth.js
- **Member Management**: Registration approval system with different membership types
- **Admin Panel**: Super admin interface for member approval and management
- **Member Dashboard**: Personal dashboard for members to manage profiles and projects
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Authentication**: NextAuth.js v5
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Radix UI
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/expressivebd/directors-guild.git
cd directors-guild
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your configurations:

```
MONGODB_URI=mongodb://localhost:27017/directors-guild
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-jwt-key-here
```

4. Start the development server:

```bash
npm run dev
```

5. Create a super admin (development only):

Visit `http://localhost:3000/api/admin/create-superadmin` in your browser to create a super admin account.

Default super admin credentials:

- Email: `superadmin@directorsguild.com`
- Password: `admin123`

## Authentication System

### User Registration Flow

1. Users fill out a comprehensive registration form with:

   - Personal information (name, email, phone, blood group, address)
   - Professional information (biography, awards, website, social media)
   - Password and confirmation

2. After registration, users receive a "pending approval" status
3. Admin can approve users by changing their `memberType` from "pending" to other statuses

### Member Types

- **Pending**: Newly registered users awaiting approval
- **Primary**: Basic membership level
- **Full**: Standard membership with additional privileges
- **Permanent**: Long-term members
- **Executive**: Board members and leadership

### Admin Roles

- **superAdmin**: Full access to all admin features
- **newsAdmin**: Access to news management features

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Admin

- `GET /api/admin/members` - Fetch all members (superAdmin only)
- `PATCH /api/admin/members` - Update member type (superAdmin only)
- `POST /api/admin/create-superadmin` - Create super admin (development only)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (main)/            # Main site pages
│   ├── admin/             # Admin panel pages
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── admin/            # Admin-specific components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── models/           # Mongoose models
│   ├── auth.ts           # NextAuth configuration
│   └── mongodb.ts        # Database connection
└── middleware.ts         # Next.js middleware for route protection
```

## Development

To run the project in development mode:

```bash
npm run dev
```

## Building for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
