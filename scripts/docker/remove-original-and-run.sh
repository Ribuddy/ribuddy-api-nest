docker stop ribuddy-dev || true && \
docker rm ribuddy-dev || true && \
docker run \
  -d \
  -p 40001:7777 \
  --name ribuddy-dev \
  --env-file /home/ubuntu/.env \
  ribuddy/ribuddy-api:latest

docker logs -f ribuddy-dev

docker exec -it ribuddy-dev /bin/sh