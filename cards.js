const CARDS = [
  {
    service: "Amazon ECS",
    answer: "Amazon ECS runs and manages your containers for you, so you can deploy containerized apps without building your own cluster management.",
    category: "Containers",
    docsUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
  },
  {
    service: "AWS IAM",
    answer: "AWS IAM controls who can sign in to your AWS account and exactly what they are allowed to do there.",
    category: "Security",
    docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
  },
  {
    service: "Amazon Bedrock",
    answer: "Amazon Bedrock lets you build generative AI apps by calling foundation models from Amazon and other AI companies through a single API.",
    category: "AI / Machine Learning",
    docsUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html"
  },
  {
    service: "Amazon S3",
    answer: "Amazon S3 stores any amount of files (objects) in the cloud so you can keep, protect and retrieve your data whenever you need it.",
    category: "Storage",
    docsUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
  },
  {
    service: "Amazon DynamoDB",
    answer: "Amazon DynamoDB is a serverless NoSQL database that stores and returns your data in milliseconds, no matter how big your app grows.",
    category: "Databases",
    docsUrl: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"
  },
  {
    service: "Amazon CloudWatch",
    answer: "Amazon CloudWatch collects metrics, logs and alarms from your AWS resources and apps so you can see how they are running and react to problems.",
    category: "Monitoring",
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"
  },
  {
    service: "Amazon Cognito",
    answer: "Amazon Cognito adds sign-up, sign-in and user access control to your web and mobile apps.",
    category: "Security",
    docsUrl: "https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"
  },
  {
    service: "Amazon CloudFront",
    answer: "Amazon CloudFront is a content delivery network that serves your website files and media to users quickly from locations around the world.",
    category: "Networking",
    docsUrl: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
  },
  {
    service: "AWS Fargate",
    answer: "AWS Fargate runs your containers without you having to provision or manage any servers.",
    category: "Containers",
    docsUrl: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html"
  },
  {
    service: "Amazon Bedrock AgentCore",
    answer: "Amazon Bedrock AgentCore lets you build, deploy and run AI agents securely at scale without managing infrastructure.",
    category: "AI / Machine Learning",
    docsUrl: "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html"
  },
  {
    service: "AWS Lambda",
    answer: "AWS Lambda runs your code when it's needed, so you never have to set up or manage servers.",
    category: "Compute",
    docsUrl: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
  },
  {
    service: "Amazon GuardDuty",
    answer: "Amazon GuardDuty watches your AWS account's activity logs and warns you about suspicious or possibly harmful activity.",
    category: "Security",
    docsUrl: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"
  },
  {
    service: "AWS Security Hub",
    answer: "AWS Security Hub gathers security warnings from other AWS tools into one place and ranks the most serious first.",
    category: "Security",
    docsUrl: "https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub-v2.html"
  },
  {
    service: "Amazon Lightsail",
    answer: "Amazon Lightsail bundles servers, storage and networking into simple packages for hosting websites at a fixed monthly price.",
    category: "Compute",
    docsUrl: "https://docs.aws.amazon.com/lightsail/latest/userguide/what-is-amazon-lightsail.html"
  }
];

if (typeof module !== "undefined") module.exports = CARDS;
