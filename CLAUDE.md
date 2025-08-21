# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### CDK/Infrastructure

```bash
# Install CDK dependencies
cd cdk
npm ci

# Bootstrap CDK (required once per AWS region)
npx cdk bootstrap

# Deploy the stack
npx cdk deploy --require-approval never --all

# Deploy with environment parameter
npx cdk deploy --all -c envName=dev

# Destroy the stack
npx cdk destroy
```

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Set up Python environment with poetry
python3 -m venv .venv  # Optional
source .venv/bin/activate  # Optional
pip install poetry
poetry install

# Run local backend server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run backend tests
poetry run python tests/test_bedrock.py
poetry run python tests/test_repositories/test_conversation.py

# Lint and format Python code
poetry run black .
poetry run mypy .
```

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm ci

# Run development server
npm run dev

# Build the frontend
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Preview the built frontend
npm run preview

# Run component visualization with Ladle
npm run ladle
```

### Pre-commit hooks

```bash
# Install lefthook (macOS)
brew install lefthook

# Create pre-commit hooks
lefthook install
```

## Architecture Overview

Bedrock Chat (BrChat) is a multilingual generative AI platform powered by Amazon Bedrock. The architecture consists of:

### Backend
- **FastAPI**: The backend API framework
- **Amazon Bedrock**: Provides access to large language models
- **DynamoDB**: Stores conversation history
- **Amazon API Gateway**: Handles API requests including WebSockets
- **AWS Lambda**: Processes backend API calls using AWS Lambda Web Adapter
- **Amazon OpenSearch Serverless**: Handles vector search for RAG functionality
- **Amazon Bedrock Knowledge Bases**: Manages RAG (Retrieval-Augmented Generation)
- **AWS Step Functions**: Orchestrates ingestion pipeline for knowledge embedding
- **EventBridge Pipes**: Triggers Step Functions from DynamoDB streams

### Frontend
- **React**: UI framework
- **TailwindCSS**: Styling
- **Amazon CloudFront + S3**: Content delivery
- **Amazon Cognito**: Authentication
- **AWS WAF**: Security and IP restrictions

### Key Features
- Chat with multiple AI models
- Custom bots with RAG (Retrieval-Augmented Generation)
- Bot sharing via bot store
- Agent-based task automation
- API publication for custom bots

### Data Flow
1. Frontend sends requests through CloudFront to API Gateway
2. API Gateway routes to Lambda functions running FastAPI
3. Lambda functions interact with Bedrock for AI model inference
4. Knowledge Base queries use OpenSearch for vector search
5. Conversation history is stored in DynamoDB
6. Authentication is handled via Cognito

## Local Development Setup

To develop locally:

1. **Deploy AWS resources first**: Follow deployment instructions in README.md to create required AWS resources
2. **Backend setup**:
   - Configure environment variables (see backend/README.md)
   - Install poetry and dependencies
   - Run local server with uvicorn
3. **Frontend setup**:
   - Create `.env.local` from `.env.template` with deployed resource values
   - Install dependencies and run dev server

## Important Notes

- Multiple environments can be deployed using the parameter.ts file and the -c envName option
- Custom bot functionality requires users to be in the 'CreatingBotAllowed' group
- The codebase supports multiple languages via i18next
- WebSocket streaming handles large messages by chunking
- Cross-region inference can be enabled for improved resilience