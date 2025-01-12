# VTS Team Growth Tracker (VTS-TGT)

A mobile-responsive React Native application designed to help network marketing teams track their activities, performance, and DebiCheck compliance.

## Features

- User Authentication (Admin/Team Member roles)
- Activity Logging (Invites, Presentations, Recruits)
- DebiCheck Status Tracking
- Performance Analytics
- Team Management
- Real-time Progress Tracking

## Tech Stack

- React Native with Expo
- Firebase (Authentication & Firestore)
- React Navigation
- Styled Components
- Chart.js

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase Account

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd VTS-TGT
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Replace the Firebase configuration in `src/utils/firebase.ts` with your own config

4. Start the development server:
```bash
npm start
```

5. Run on your preferred platform:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For web
npm run web
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Screen components
├── navigation/    # Navigation configuration
├── utils/         # Utility functions and Firebase setup
└── assets/        # Images and icons
```

## Environment Setup

1. Create a `.env` file in the root directory
2. Add your Firebase configuration:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 