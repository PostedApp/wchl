<div align="center">

# Posted

</div>
<div align="center">

##### _Building for WCHL25 Hackathon_

</div>


Posted is a Web3-native social media management platform that empowers creators and businesses to manage their entire online presence from one decentralized location. Building on the Internet Computer Protocol (ICP), Posted provides a permanent space for content creation and community building.

## 🌟 Demo (WIP)

- **Landing Site**: [https://posted.app](https://posted.app)
- **ICP Canisters**: [WIP]

## 🎯 Project Overview

Posted addresses the critical problem of platform dependency and content fragmentation in today's social media landscape. Creators lose audiences when platforms change algorithms, get banned, or shut down. Posted solves this by providing:

1. **AI-Powered Community Moderation Agent**: Leveraging ICP's LLM canisters for intelligent, decentralized auto moderation that adapts to your very own community rules and standards. Use natural language to easily and quickly setup and convey the spirit of your community.
2. **Cross-Platform Content Management**: Schedule and post to multiple social platforms from one dashboard
3. **Community Engagement Tools**: Giveaways, exclusive content, and direct audience interaction
4. **Web3 Identity & Link-in-Bio**: Verifiable, unique profiles tied to blockchain identity. A permanent and customizable presence to link all your platforms.

## 💡 Uniqueness & Web3 Innovation

Posted leverages ICP's unique capabilities to create a novel Web3 use case:

- **AI-Native Moderation**: First social platform to use ICP's LLM canisters for decentralized, intelligent content moderation that learns community preferences
- **Secure Key Management**: Using ICP's vetKD (Verifiable Encrypted Threshold Key Derivation) for secure, decentralized storage of API keys and sensitive user data
- **Permanent Content Storage**: Content lives on-chain, immune to platform shutdowns
- **Decentralized Identity**: Users own their digital identity and audience relationships
- **Cross-Platform Integration**: Bridges Web2 social platforms with Web3 infrastructure
- **Community Ownership**: Future token-based governance for platform decisions

## 💰 Revenue Model

**Freemium SaaS Model**:

- **Free Tier**: Basic scheduling and community management functionality
- **Creator Tier** ($5/month): Advanced scheduling, analytics, multiple platform connections
- **Business Tier** ($25/month): Team collaboration, advanced engagement tools, white-label options
- **Enterprise**: Custom solutions for large organizations

**Additional Revenue Streams**:

- Premium customization options
- Transaction fees on creator monetization features
- Partnership integrations with social platforms and creator agencies.

## 🏗️ Architecture (WIP)

### Frontend Architecture

```
Posted Frontend (Astro + React)
├── Landing Page & Marketing Site
├── User Dashboard (Future)
├── Content Management Interface (Future)
└── Community Engagement Tools (Future)
```

### ICP Integration

- **Asset Canister**: Hosts the frontend application
- **LLM Canisters**: AI-powered content moderation and community management
- **vetKD System**: Secure, threshold-encrypted storage of social media API keys and sensitive user credentials
- **Future Backend Canisters**: User data, content storage, cross-platform integrations
- **Decentralized Storage**: All user content and profiles stored on ICP

## 🌐 ICP Features (WIP)

- **LLM Canisters**: AI-powered content moderation using on-chain large language models for intelligent, context-aware community management
- **vetKD (Verifiable Encrypted Threshold Key Derivation)**: Secure, decentralized storage and management of social media API keys, OAuth tokens, and sensitive user credentials without exposing them to individual nodes
- **Asset Canisters**: Frontend hosting and content delivery
- **Decentralized Storage**: Permanent content and user data storage
- **Additional Implementations**:
  - HTTP Outcalls for social platform integrations
  - Timers for scheduled posting
  - Internet Identity for user authentication

## 🎥 Demo Video (coming soon)


## 🚧 Key Considerations

1. **AI Moderation Implementation**: Integrating ICP's LLM canisters for nuanced content moderation while maintaining decentralization principles
2. **Secure Credential Management**: Implementing vetKD for secure, decentralized storage of API keys while maintaining seamless user experience
3. **Cross-Platform API Integration**: Navigating different social media APIs and their rate limits
4. **Web3 UX Design**: Creating familiar interfaces while introducing Web3 concepts
5. **Scalability Planning**: Designing architecture for future growth on ICP

## 🔮 Hackathon Plans

**Phase 1**:

- Deploy AI moderation system using ICP's LLM canisters
- Implement vetKD-secured API key management for social platform integrations
- Complete user authentication with Internet Identity
- Implement content management dashboard
- Add first social platform integrations (X/Twitter, Instagram, YouTube, Reddit...)

**Phase 2**:

- Advanced AI-powered community insights and analytics
- Team collaboration features with AI assistance
- Mobile application with smart moderation

**Phase 3**:

- Token-based governance system with AI-assisted decision making
- Creator monetization tools
- Advanced AI content suggestions and optimization

## 🏆 Value Proposition

Apart from the standard social media management functionality, Posted provides AI enchanced value by solving real problems:

- **For Creators**: AI-powered moderation keeps communities healthy while preserving authentic engagement
- **For Businesses**: Intelligent content filtering reduces moderation costs while maintaining brand safety across platforms
- **For Communities**: Own your digital relationships with AI that learns your community's values, resist arbitrary moderator abuse.

---

## 🛠️ Current Stack (WIP)

**Frontend**:

- Astro.js (Static Site Generation)
- React (Interactive Components)
- Tailwind CSS (Styling)
- Framer Motion (Animations)

**ICP Onchain Infrastructure** (WIP):

- LLM Canisters for AI-powered auto moderation
- vetKD for secure API key and credential management
- Asset Canisters for frontend deployment

## 📁 Project Structure

```
├── frontend/                 # Astro frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Astro pages
│   │   ├── assets/          # Images, icons, logos
│   │   └── styles/          # CSS and theme files
│   ├── dist/                # Built frontend assets
│   └── package.json
├── dfx.json                 # ICP deployment configuration
└── README.md
```

## 🚀 Build and Deployment Instructions

### Prerequisites

- Node.js 16+ and npm
- DFX SDK for ICP deployment

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### ICP Deployment

```bash
# Start local ICP replica
dfx start --background

# Deploy to local replica
dfx deploy

# Deploy to ICP mainnet
dfx deploy --network ic
```