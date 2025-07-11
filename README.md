# PHILIA RECIPE ENGINE

**Author:** Philodi  
**Email:** me@philodi.com  
**Website:** https://philodi.com

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Facebook Messenger](https://img.shields.io/badge/Facebook-Messenger-0084FF.svg)](https://developers.facebook.com/docs/messenger-platform)
[![Heroku](https://img.shields.io/badge/Deploy-Heroku-purple.svg)](https://heroku.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Overview

**PHILIA Recipe Engine** is an intelligent Facebook Messenger bot that provides personalized food recommendations and recipe suggestions. Originally developed as an Alexa conversation skill, it now offers over 2 million indexed, standardized recipes with complete nutritional information.

The bot enables users to search for recipes by:
- **Nutrient quantities** (protein, carbs, calories, etc.)
- **40+ dietary restrictions** (vegan, gluten-free, keto, etc.)
- **Health labels** (low-sodium, heart-healthy, etc.)
- **Cuisine types** (Chinese, Italian, Indian, French, etc.)
- **Meal types** (breakfast, lunch, dinner, snacks)
- **Dish types** (soup, salad, pizza, sandwich, etc.)

## ✨ Features

- 🤖 **Intelligent Chat Interface** - Natural language processing for recipe queries
- 🍽️ **2M+ Recipes** - Comprehensive database with nutritional information
- 🎯 **Dietary Filtering** - Support for 40+ diet types and health labels
- 🌍 **Global Cuisines** - Recipes from around the world
- 📱 **Facebook Messenger Integration** - Seamless user experience
- 🔍 **Smart Search** - Keyword and category-based recipe discovery
- 📊 **Nutritional Data** - Complete nutritional breakdown for each recipe
- 🖼️ **Recipe Images** - Visual recipe previews

## 📋 Prerequisites

Before you begin, ensure you have the following:

- [Facebook Developer Account](https://developers.facebook.com/)
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [GitHub Account](https://github.com/)
- [Heroku Account](https://www.heroku.com/) (for deployment)
- Terminal/Command Line access

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/Phil-Jayz/philia-bot-messenger.git
cd philia-bot-messenger

# Install dependencies
npm install

# Start the server
npm start
```

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Phil-Jayz/philia-bot-messenger.git
cd philia-bot-messenger
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

Create a `.env` file in the root directory:

```env
PORT=8001
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
VERIFY_TOKEN=your_verify_token
```

### Step 4: Start the Server

```bash
npm start
```

The server will start on port 8001 (or the port specified in your environment variables).

## ⚙️ Configuration

### Facebook App Setup

1. **Create a Facebook Page**
   - Go to [Facebook Pages](https://web.facebook.com/pages/create?)
   - Choose a page name, category, and description
   - Click "Create Page"

2. **Create a Facebook App**
   - Visit [Facebook Developers](https://developers.facebook.com/apps/)
   - Click "Create App"
   - Select "Manage Business Integrations"
   - Fill in app details and create

3. **Configure Messenger**
   - In your app, click the "Messenger" icon
   - Click "Set Up"
   - Generate a Page Access Token
   - Configure webhooks with your server URL

### Webhook Configuration

```javascript
// Your webhook URL should be: https://your-app.herokuapp.com/
// Verify Token: Your chosen verification token
// Subscription Fields: messages
```

## 💬 Usage

### Starting a Conversation

Users can interact with the bot using natural language:

```
User: "Hello"
Bot: "Welcome to philia, your personal food recommendation assistant..."

User: "Can I get a high-protein meal?"
Bot: "In that case, I recommend that you take [Recipe Name]"
[Recipe Image]

User: "Do you have Italian food?"
Bot: "In that case, I recommend that you take [Italian Recipe]"
[Recipe Image]
```

### Supported Commands

| Command Type | Examples |
|-------------|----------|
| **Dietary Requests** | "Can I get a low-carb meal?", "Do you have vegan options?" |
| **Cuisine Types** | "Show me Italian food", "I want Chinese recipes" |
| **Meal Types** | "Breakfast ideas", "Lunch suggestions" |
| **Dish Types** | "Pizza recipes", "Soup options" |
| **General** | "Help", "Thank you", "Goodbye" |

## 🔧 API Reference

### Webhook Endpoints

#### GET `/`
Facebook verification endpoint for webhook setup.

**Parameters:**
- `hub.mode`: Must be "subscribe"
- `hub.verify_token`: Your verification token
- `hub.challenge`: Facebook's challenge string

#### POST `/`
Handles incoming messages from Facebook Messenger.

**Request Body:**
```json
{
  "object": "page",
  "entry": [{
    "messaging": [{
      "sender": {"id": "user_id"},
      "message": {"text": "user_message"}
    }]
  }]
}
```

### Methods Class

The `methods.js` file provides the following methods:

- `sendText(text, id)` - Send text message to user
- `sendImageAttachment(image, id)` - Send image with recipe
- `getMessageObject(json)` - Extract message and user ID from webhook data

## 🚀 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set FACEBOOK_ACCESS_TOKEN=your_token
   heroku config:set VERIFY_TOKEN=your_verify_token
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy with Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:16-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   
   EXPOSE 8001
   
   CMD ["npm", "start"]
   ```

2. **Create .dockerignore**
   ```text
   node_modules
   npm-debug.log
   .git
   .gitignore
   README.md
   .env
   ```

3. **Build and Run**
   ```bash
   # Build the image
   docker build -t philia-bot .
   
   # Run the container
   docker run -p 8001:8001 \
     -e FACEBOOK_ACCESS_TOKEN=your_token \
     -e VERIFY_TOKEN=your_verify_token \
     philia-bot
   ```

4. **Using Docker Compose**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     philia-bot:
       build: .
       ports:
         - "8001:8001"
       environment:
         - FACEBOOK_ACCESS_TOKEN=${FACEBOOK_ACCESS_TOKEN}
         - VERIFY_TOKEN=${VERIFY_TOKEN}
       restart: unless-stopped
   ```

   ```bash
   docker-compose up -d
   ```

### Deploy to Kubernetes

1. **Create Kubernetes Deployment**
   ```yaml
   # k8s/deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: philia-bot
     labels:
       app: philia-bot
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: philia-bot
     template:
       metadata:
         labels:
           app: philia-bot
       spec:
         containers:
         - name: philia-bot
           image: your-registry/philia-bot:latest
           ports:
           - containerPort: 8001
           env:
           - name: FACEBOOK_ACCESS_TOKEN
             valueFrom:
               secretKeyRef:
                 name: philia-secrets
                 key: facebook-token
           - name: VERIFY_TOKEN
             valueFrom:
               secretKeyRef:
                 name: philia-secrets
                 key: verify-token
           resources:
             requests:
               memory: "128Mi"
               cpu: "100m"
             limits:
               memory: "256Mi"
               cpu: "200m"
   ```

2. **Create Service**
   ```yaml
   # k8s/service.yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: philia-bot-service
   spec:
     selector:
       app: philia-bot
     ports:
     - protocol: TCP
       port: 80
       targetPort: 8001
     type: LoadBalancer
   ```

3. **Create Secrets**
   ```bash
   kubectl create secret generic philia-secrets \
     --from-literal=facebook-token=your_token \
     --from-literal=verify-token=your_verify_token
   ```

4. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f k8s/
   ```

### Deploy to AWS

#### AWS ECS (Elastic Container Service)

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name philia-bot
   ```

2. **Build and Push to ECR**
   ```bash
   # Get login token
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
   
   # Build and tag
   docker build -t philia-bot .
   docker tag philia-bot:latest your-account.dkr.ecr.us-east-1.amazonaws.com/philia-bot:latest
   
   # Push to ECR
   docker push your-account.dkr.ecr.us-east-1.amazonaws.com/philia-bot:latest
   ```

3. **Create Task Definition**
   ```json
   {
     "family": "philia-bot",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "executionRoleArn": "arn:aws:iam::your-account:role/ecsTaskExecutionRole",
     "containerDefinitions": [
       {
         "name": "philia-bot",
         "image": "your-account.dkr.ecr.us-east-1.amazonaws.com/philia-bot:latest",
         "portMappings": [
           {
             "containerPort": 8001,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "FACEBOOK_ACCESS_TOKEN",
             "value": "your_token"
           },
           {
             "name": "VERIFY_TOKEN",
             "value": "your_verify_token"
           }
         ],
         "logConfiguration": {
           "logDriver": "awslogs",
           "options": {
             "awslogs-group": "/ecs/philia-bot",
             "awslogs-region": "us-east-1",
             "awslogs-stream-prefix": "ecs"
           }
         }
       }
     ]
   }
   ```

4. **Create ECS Service**
   ```bash
   aws ecs create-service \
     --cluster your-cluster \
     --service-name philia-bot \
     --task-definition philia-bot:1 \
     --desired-count 2 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
   ```

#### AWS Lambda (Serverless)

1. **Create Lambda Function**
   ```javascript
   // lambda.js
   const serverless = require('serverless-http');
   const app = require('./index');
   
   module.exports.handler = serverless(app);
   ```

2. **Create serverless.yml**
   ```yaml
   service: philia-bot
   
   provider:
     name: aws
     runtime: nodejs16.x
     region: us-east-1
     environment:
       FACEBOOK_ACCESS_TOKEN: ${env:FACEBOOK_ACCESS_TOKEN}
       VERIFY_TOKEN: ${env:VERIFY_TOKEN}
   
   functions:
     webhook:
       handler: lambda.handler
       events:
         - http:
             path: /
             method: get
         - http:
             path: /
             method: post
   ```

3. **Deploy with Serverless Framework**
   ```bash
   npm install -g serverless
   serverless deploy
   ```

### Deploy to Google Cloud Platform (GCP)

#### Google Cloud Run

1. **Enable Required APIs**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

2. **Build and Push to Container Registry**
   ```bash
   # Build the image
   docker build -t gcr.io/your-project/philia-bot .
   
   # Push to Container Registry
   docker push gcr.io/your-project/philia-bot
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy philia-bot \
     --image gcr.io/your-project/philia-bot \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars FACEBOOK_ACCESS_TOKEN=your_token,VERIFY_TOKEN=your_verify_token
   ```

#### Google Kubernetes Engine (GKE)

1. **Create GKE Cluster**
   ```bash
   gcloud container clusters create philia-cluster \
     --zone us-central1-a \
     --num-nodes 3 \
     --machine-type e2-medium
   ```

2. **Deploy to GKE**
   ```bash
   # Build and push to Container Registry
   docker build -t gcr.io/your-project/philia-bot .
   docker push gcr.io/your-project/philia-bot
   
   # Apply Kubernetes manifests
   kubectl apply -f k8s/
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 8001) |
| `FACEBOOK_ACCESS_TOKEN` | Facebook page access token | Yes |
| `VERIFY_TOKEN` | Webhook verification token | Yes |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Ideas

- [ ] Add voice interface support
- [ ] Integrate with Wit.ai for better NLP
- [ ] Add recipe rating system
- [ ] Implement user preferences storage
- [ ] Add meal planning features
- [ ] Support for recipe sharing
- [ ] Add nutritional goal tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Facebook Developer Circles for tutorial examples
- Edamam API for recipe data
- Heroku for hosting platform
- Node.js community for excellent tools and libraries

## 📞 Support

If you have any questions or need help:

- **Email:** me@philodi.com
- **Website:** https://philodi.com
- **GitHub Issues:** [Create an issue](https://github.com/Phil-Jayz/philia-bot-messenger/issues)

---

**Happy Cooking! 🍳**

*Built with ❤️ by Philodi*