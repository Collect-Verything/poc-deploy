# Init Serveur 

amazon-linux-extras install docker
sudo yum update -y
sudo yum -y install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

*Log out and come back*

sudo systemctl enable docker
docker version


# front co:

ssh -i "poc.pem" ec2-user@ec2-16-170-245-80.eu-north-1.compute.amazonaws.com

## clean:

sudo docker rm -f $(sudo docker ps -aq) 2>/dev/null || true
sudo docker rmi -f $(sudo docker images -q) 2>/dev/null || true
sudo docker volume rm $(sudo docker volume ls -q) 2>/dev/null || true
sudo docker network prune -f

## Pull and lunch:

sudo docker pull cansefr/front-poc:latest
sudo docker run -d --name front-poc -p 80:3000 --restart unless-stopped cansefr/front-poc:latest

sudo docker run -d --name front-poc \
-p 80:3000 --restart=no \
--cpus=0.5 --memory=512m \
cansefr/front-poc:latest

# Back co 

ssh -i "poc.pem" ec2-user@ec2-16-171-199-245.eu-north-1.compute.amazonaws.com

## Clean :

sudo docker rm -f $(sudo docker ps -aq) 2>/dev/null || true
sudo docker rmi -f $(sudo docker images -q) 2>/dev/null || true
sudo docker volume rm $(sudo docker volume ls -q) 2>/dev/null || true
sudo docker network prune -f
sudo docker pull cansefr/deploy-service:latest

## Pull and lunch:

sudo docker run -d --name deploy-service \
-p 3001:3001 \
--restart unless-stopped \
cansefr/deploy-service:latest



## Attention http et pas https