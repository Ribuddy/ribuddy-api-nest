DOCKER_USER_NAME="ribuddy"
DOCKER_IMAGE_NAME="ribuddy-api"

DOCKER_CONTAINER_NAME="ribuddy-api"
DOCKER_ENV_FILE_PATH="/home/ubuntu/.env"

echo "=============================="
echo "📦 최신 Docker 이미지 Pull 시작"
echo "=============================="

docker pull "$DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:latest"

echo "✅ Docker 이미지 Pull 완료"

echo "=============================="
echo "🧹 기존 컨테이너 정리 시작"
echo "=============================="
docker stop "$DOCKER_CONTAINER_NAME" || true
docker rm "$DOCKER_CONTAINER_NAME"  || true
echo "✅ 기존 컨테이너 정리 완료"

echo "=============================="
echo "🚀 새 컨테이너 실행 시작"
echo "=============================="
docker run \
  -d \
  -p 40001:7777 \
  --name "$DOCKER_CONTAINER_NAME"  \
  --restart always \
  --env-file "$DOCKER_ENV_FILE_PATH" \
  "$DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:latest"

echo "✅ 새 컨테이너 실행 완료"

echo "=============================="
echo "🎉 전체 프로세스 완료"
echo "=============================="

#docker logs -f "$DOCKER_CONTAINER_NAME"

#docker exec -it "$DOCKER_CONTAINER_NAME" /bin/sh