
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-sin "$AWS_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com"
docker build -t i-like-lists .
docker tag i-like-lists:latest "$AWS_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/i-like-lists:latest"
docker push "$AWS_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com/i-like-lists:latest"