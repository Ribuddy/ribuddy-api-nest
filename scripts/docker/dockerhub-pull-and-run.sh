echo "=============================="
echo "📦 최신 Docker 이미지 Pull 시작"
echo "=============================="

docker pull peekle/peekle-develop:latest

echo "✅ Docker 이미지 Pull 완료"

echo "=============================="
echo "🧹 기존 컨테이너 정리 시작"
echo "=============================="
docker stop peekle-dev || true
docker rm peekle-dev || true
echo "✅ 기존 컨테이너 정리 완료"

echo "=============================="
echo "🚀 새 컨테이너 실행 시작"
echo "=============================="
docker run \
  -d \
  -p 40001:7777 \
  --name ribuddy-dev \
  --restart always \
  --env-file /home/ubuntu/.env \
  ribuddy/ribuddy-api:latest

echo "✅ 새 컨테이너 실행 완료"

echo "=============================="
echo "🎉 전체 프로세스 완료"
echo "=============================="