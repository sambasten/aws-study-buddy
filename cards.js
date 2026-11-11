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
  },
  {
    service: "Amazon EKS",
    answer: "Amazon EKS runs Kubernetes, the software that manages apps packed in containers, for you on AWS.",
    category: "Containers",
    docsUrl: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
  },
  {
    service: "Amazon ECR",
    answer: "Amazon ECR is a secure storage library for container images, which are packaged, ready-to-run apps.",
    category: "Containers",
    docsUrl: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html"
  },
  {
    service: "Amazon SageMaker AI",
    answer: "Amazon SageMaker AI helps you build, train and deploy machine learning models, programs that learn patterns from data.",
    category: "AI / Machine Learning",
    docsUrl: "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
  },
  {
    service: "Amazon Rekognition",
    answer: "Amazon Rekognition finds objects, text, faces and unsafe content in images and videos, with no machine learning skills needed.",
    category: "AI / Machine Learning",
    docsUrl: "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html"
  },
  {
    service: "Amazon EC2",
    answer: "Amazon EC2 provides virtual servers in the AWS Cloud that you can add or remove as your needs change.",
    category: "Compute",
    docsUrl: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
  },
  {
    service: "AWS Elastic Beanstalk",
    answer: "AWS Elastic Beanstalk deploys your web app to AWS and sets up the servers, monitoring and scaling for you.",
    category: "Compute",
    docsUrl: "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html"
  },
  {
    service: "Amazon EBS",
    answer: "Amazon EBS provides storage volumes that attach to EC2 servers and work like a local hard drive.",
    category: "Storage",
    docsUrl: "https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html"
  },
  {
    service: "Amazon EFS",
    answer: "Amazon EFS provides shared file storage that grows and shrinks automatically as you add and remove files.",
    category: "Storage",
    docsUrl: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"
  },
  {
    service: "AWS Backup",
    answer: "AWS Backup lets you set up and automate backups of your data across AWS services from one place.",
    category: "Storage",
    docsUrl: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"
  },
  {
    service: "Amazon RDS",
    answer: "Amazon RDS sets up, runs and scales a relational database, one that stores data in tables, in the cloud.",
    category: "Databases",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"
  },
  {
    service: "Amazon Aurora",
    answer: "Amazon Aurora is a database that AWS runs for you, built to work like popular MySQL and PostgreSQL databases.",
    category: "Databases",
    docsUrl: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"
  },
  {
    service: "Amazon ElastiCache",
    answer: "Amazon ElastiCache sets up, manages and scales a cache, a fast in-memory data store, in the cloud.",
    category: "Databases",
    docsUrl: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html"
  },
  {
    service: "AWS CloudTrail",
    answer: "AWS CloudTrail records who did what in your AWS account, so you can audit and check activity.",
    category: "Monitoring",
    docsUrl: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
  },
  {
    service: "AWS X-Ray",
    answer: "AWS X-Ray collects data about the requests your app handles, so you can find slow spots and errors.",
    category: "Monitoring",
    docsUrl: "https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
  },
  {
    service: "AWS Config",
    answer: "AWS Config shows how your AWS resources, things like servers, are set up and how that changes over time.",
    category: "Monitoring",
    docsUrl: "https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"
  },
  {
    service: "Amazon VPC",
    answer: "Amazon VPC lets you launch AWS resources in your own isolated virtual network, like a private data center network.",
    category: "Networking",
    docsUrl: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html"
  },
  {
    service: "Amazon Route 53",
    answer: "Amazon Route 53 registers website names, connects visitors' browsers to your website, and checks your site is working.",
    category: "Networking",
    docsUrl: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html"
  },
  {
    service: "Elastic Load Balancing",
    answer: "Elastic Load Balancing spreads incoming traffic across several servers and sends it only to the healthy ones.",
    category: "Networking",
    docsUrl: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"
  }
];

if (typeof module !== "undefined") module.exports = CARDS;
