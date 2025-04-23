# Scrumless.ai

Scrumless.ai is a powerful platform that automates agile methodology practices, specifically designed to streamline Scrum processes and free up more time for development.

## Features

### Automated Stand-ups
- 🤖 Collects status updates directly from Git commits, issue trackers, and team calendars
- 📊 Generates daily summaries without requiring meetings
- 🚩 Identifies blockers automatically and routes them to the right people

### AI-Powered Sprint Planning
- 📝 Generates user stories from epics with accurate sizing
- 🧠 Suggests priorities based on historical velocity data
- 📈 Optimizes sprint capacity and team allocation

### Intelligent Retrospectives
- 📋 Identifies patterns from sprint data and team communications
- 🔍 Clusters feedback into actionable themes
- 📌 Suggests concrete experiments for improvement

### Integrations
- GitHub/GitLab for code tracking
- Jira/Linear/Trello for ticket management
- Slack/Teams for communications
- Google/Microsoft Calendar for scheduling

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 8.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scrumless-ai.git
cd scrumless-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` to include your API keys and configuration settings.

4. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Project Structure

```
scrumless-ai/
├── src/
│   ├── components/       # UI components
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # Basic UI elements
│   │   └── widgets/      # Complex UI widgets
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and API services
│   ├── pages/            # Page components
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── ... (config files)    # Configuration files
```

## Technical Details

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + React Query
- **Routing**: React Router
- **UI Components**: Radix UI primitives
- **Charts**: Recharts

## Backend Requirements

This frontend application requires a backend API to function fully. The backend should provide:

1. Authentication endpoints
2. Team management services
3. Stand-up data collection and synthesis
4. Sprint planning capabilities
5. Retrospective data analysis
6. Integration with external services

The frontend is configured to communicate with a backend server at `http://localhost:3000/api` by default, but this can be changed in the environment variables.

## License

[MIT License](LICENSE)

## Contact

For questions, reach out to support@scrumless.ai
