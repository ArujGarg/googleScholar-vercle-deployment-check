# ScholarSync Resume Integration

A full-stack Next.js web application that intelligently suggests personalized projects by analyzing your resume and Google Scholar profile. The application combines resume parsing with academic research data to provide tailored project recommendations based on your skills, education, and research interests.

## 🎯 Objective

This application bridges the gap between professional skills and academic research by:
- Parsing resume data to extract skills, education, and experience
- Fetching Google Scholar profiles to analyze research interests and publications
- Generating intelligent project suggestions based on combined data analysis
- Providing a modern, responsive interface for seamless user experience

## ✨ Features

### Core Functionality
- **Resume Upload & Parsing**: Support for PDF and DOCX files with intelligent data extraction
- **Google Scholar Integration**: Automatic profile fetching and research data analysis
- **AI-Powered Recommendations**: Smart project suggestions based on skills and research areas
- **Real-time Processing**: Live updates and progress tracking
- **Responsive Design**: Modern UI that works across all devices

### Technical Features
- **Server-Side Rendering**: Built with Next.js for optimal performance
- **State Management**: Redux for predictable state updates
- **File Security**: Secure file upload with validation and size limits
- **API Protection**: Rate limiting and input sanitization
- **Error Handling**: Comprehensive error states and user feedback

## 🛠 Technologies Used

### Frontend
- **Next.js 14+** - React framework with SSR/SSG
- **Redux Toolkit** - State management with Redux Thunks
- **Tailwind CSS** - Utility-first CSS framework
- **React** - Component-based UI library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **pdf-parse** - PDF document parsing
- **mammoth.js** - DOCX document parsing
- **cheerio** - Web scraping for Google Scholar
- **multer** - File upload handling

### Development & Testing
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - End-to-end testing
- **ESLint & Prettier** - Code linting and formatting

## 📁 Project Structure

```
scholarsync-resume-integration/
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── parse-resume/  # Resume parsing endpoint
│   │   │   ├── scholar-profile/ # Google Scholar scraping
│   │   │   └── suggest-projects/ # Project recommendation engine
│   │   ├── favicon.ico
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout component
│   │   └── page.js            # Home page
│   ├── components/            # React components
│   │   ├── ProjectSuggestions.js
│   │   ├── ResumeTextInput.js
│   │   ├── ResumeUploader.js
│   │   └── ScholarProfileFetcher.js
│   └── store/                 # Redux store
│       ├── slices/           # Redux slices
│       └── store.js          # Store configuration
├── test/                      # Test files and data
│   └── data/
│       └── 05-versions-space.pdf
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/scholarsync-resume-integration-your-name.git
   cd scholarsync-resume-integration-your-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables in `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   UPLOAD_MAX_SIZE=5242880
   RATE_LIMIT_MAX=100
   RATE_LIMIT_WINDOW=900000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage Guide

### 1. Upload Resume
- Click on the resume upload area or drag and drop your PDF/DOCX file
- Supported formats: PDF, DOCX
- Maximum file size: 5MB
- The system will automatically parse and extract:
  - Personal information (name, email, phone)
  - Skills and technologies
  - Education background
  - Work experience

### 2. Connect Google Scholar Profile
- Enter your Google Scholar profile URL
- Format: `https://scholar.google.com/citations?user=YOUR_USER_ID`
- The system will fetch:
  - Research interests
  - Publication list
  - Citation metrics
  - H-index and other academic metrics

### 3. Get Project Suggestions
- Once both resume and Scholar profile are processed
- The AI engine will analyze your data and suggest relevant projects
- Projects are categorized by:
  - Difficulty level (Beginner, Intermediate, Advanced)
  - Required skills
  - Research areas
  - Estimated duration

## 🔌 API Endpoints

### Resume Parsing
```
POST /api/parse-resume
Content-Type: multipart/form-data

Body: FormData with 'resume' file field
Response: JSON with parsed resume data
```

### Google Scholar Profile
```
POST /api/scholar-profile
Content-Type: application/json

Body: { "profileUrl": "https://scholar.google.com/citations?user=..." }
Response: JSON with scholar profile data
```

### Project Suggestions
```
POST /api/suggest-projects
Content-Type: application/json

Body: { "resumeData": {...}, "scholarData": {...} }
Response: JSON with categorized project suggestions
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
# or
yarn test
```

### Run Integration Tests
```bash
npm run test:integration
# or
yarn test:integration
```

### Run E2E Tests
```bash
npm run test:e2e
# or
yarn test:e2e
```

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

## 🔒 Security Features

### File Upload Security
- File type validation (PDF/DOCX only)
- File size limits (5MB maximum)
- Malware scanning for uploaded files
- Secure file storage with temporary cleanup

### API Security
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS configuration
- XSS protection
- CSRF token validation

### Data Protection
- No persistent storage of sensitive data
- Automatic cleanup of processed files
- Secure headers configuration
- Environment variable protection

## 🏗 Design Patterns Used

### Observer Pattern
- Redux store observers for state changes
- Real-time UI updates based on data processing

### Strategy Pattern
- Multiple resume parsing strategies for different file formats
- Flexible project recommendation algorithms

### Factory Pattern
- Dynamic parser creation based on file type
- Modular component instantiation

## 🚀 Deployment

Deployed Link : https://scholarsync-resume-integration.onrender.com/


## 📝 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run all tests
npm run test:watch   # Run tests in watch mode
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




This comprehensive README.md file covers all the essential aspects of your ScholarSync Resume Integration project, including setup instructions, usage guidelines, API documentation, testing procedures, security measures, and deployment information. It's structured to be both informative for users and helpful for developers who want to contribute to the project.
