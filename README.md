# Digital Krishi Officer 🌱
## AI-Based Farmer Query Support and Advisory System

**SIH 2025 Problem Statement ID: 25076**

A comprehensive bilingual (English/Malayalam) web application designed to empower Kerala farmers with AI-powered agricultural support, real-time weather updates, government scheme information, and personalized farming advice.

## 🎯 Features

### 1. **Smart Dashboard**
- **Weather Forecast**: 4-day weather prediction with humidity and wind speed
- **Current Crops Management**: Track and manage multiple crops with status updates
- **AI Chatbot**: Advanced conversational AI for farming queries with image analysis
- **Government Schemes**: Latest subsidy and scheme information with application deadlines
- **Personalized Advice**: Location and crop-specific recommendations

### 2. **AI-Powered Assistant**
- Text and voice input support (Malayalam/English)
- Crop image analysis for pest and disease detection
- Weather-based farming suggestions
- Market price alerts and timing recommendations
- Automatic escalation to agricultural officers for complex queries

### 3. **Bilingual Support**
- Seamless switching between English and Malayalam
- Localized content for Kerala districts and crops
- Cultural adaptation for local farming practices

### 4. **User Management**
- Secure login system with role-based access
- Guest access for immediate assistance
- Admin panel for agricultural officers

### Backend Features (Mock Implementation)
- User authentication (farmer/admin roles)
- Query storage and management
- Escalation workflow
- Multilingual response system

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: TailwindCSS + ShadCN UI
- **State Management**: React Context + React Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Database**: SQLite (for production implementation)
- **Backend**: FastAPI/Node.js (for production implementation)

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-krishi-officer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

## 👥 Usage

### For Farmers
1. **Login**: Use any username/password or "Continue as Guest"
2. **Ask Questions**: Type farming queries in English or Malayalam
3. **Upload Images**: Add crop photos for better diagnosis
4. **Set Context**: Select location, crop type, and season
5. **Get AI Responses**: Receive contextual agricultural advice
6. **Provide Feedback**: Rate responses or escalate to officers

### For Agricultural Officers (Admin)
1. **Login**: Use username "admin" with any password
2. **View Escalations**: See farmer queries that need expert attention
3. **Manage Queries**: Mark queries as resolved
4. **Monitor Statistics**: Track pending and resolved cases

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # ShadCN UI components
│   └── LanguageToggle.tsx  # Language switcher
├── contexts/
│   └── LanguageContext.tsx # Multilingual state management
├── lib/
│   ├── translations.ts     # Bilingual content
│   └── utils.ts           # Utility functions
├── pages/
│   ├── Login.tsx          # Authentication page
│   ├── Dashboard.tsx      # Farmer interface
│   ├── Admin.tsx          # Officer panel
│   └── NotFound.tsx       # 404 page
└── types/
    └── index.ts           # TypeScript definitions
```

## 🎨 Design System

The app uses an agricultural-themed design system with:
- **Primary Colors**: Forest green (#2D5A27) for nature/agriculture
- **Accent Colors**: Harvest gold (#E6B800) for warmth/prosperity
- **Supporting Colors**: Earth browns and sky blues
- **Typography**: Clean, accessible fonts for rural users
- **Components**: Custom variants for farming context

## 🔧 Development Features

### Mock AI Responses
Currently implements mock responses for demonstration. In production:
- Integrate OpenAI API or custom LLM
- Fine-tune models for Malayalam agricultural queries
- Implement confidence scoring for escalation

### Authentication
Simple localStorage-based auth for demo. Production should include:
- JWT-based authentication
- Role-based access control
- Secure password handling

### Database Schema (for production)
```sql
-- Users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT,
    role TEXT CHECK(role IN ('farmer', 'officer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Queries table
CREATE TABLE queries (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    question TEXT NOT NULL,
    answer TEXT,
    language TEXT CHECK(language IN ('en', 'ml')),
    location TEXT,
    crop_type TEXT,
    season TEXT,
    confidence REAL,
    feedback TEXT CHECK(feedback IN ('positive', 'negative')),
    escalated BOOLEAN DEFAULT FALSE,
    status TEXT CHECK(status IN ('pending', 'answered', 'escalated')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker (optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

## 📱 Mobile Responsiveness

The app is fully responsive and optimized for:
- Desktop computers (admin interface)
- Tablets (field officers)
- Mobile phones (farmers in rural areas)

## 🌐 Multilingual Support

- **English**: Primary interface language
- **Malayalam**: Native language for Kerala farmers
- **Extensible**: Easy to add more regional languages

## 🔮 Future Enhancements

1. **AI Integration**
   - OpenAI API for intelligent responses
   - Fine-tuned Malayalam agricultural model
   - Image recognition for crop diseases

2. **Real-time Features**
   - WebSocket for live officer chat
   - Push notifications for query updates
   - Real-time weather integration

3. **Advanced Features**
   - Voice-to-text in Malayalam
   - Text-to-speech for responses
   - Offline mode for rural areas
   - GPS-based local recommendations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is developed for SIH 2025 and follows applicable competition guidelines.

## 👥 Team

Developed for Smart India Hackathon 2025 - Problem Statement ID 25076

---

**Digital Krishi Officer** - Empowering Kerala farmers with AI-driven agricultural support! 🌾