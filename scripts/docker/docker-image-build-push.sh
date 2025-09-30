#!/bin/bash

echo "=============================="
echo "🔐 환경변수 설정 시작"
echo "=============================="
if [ -f .env ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' scripts/ec2-dev/manual/.env | xargs)
  echo "✅ .env 파일에서 환경변수 불러오기 완료"
else
  echo "⚠️ .env 파일을 찾을 수 없습니다. 환경변수 설정을 건너뜁니다."
fi

echo "🔎 DOCKER_HUB_USERNAME, DOCKER_HUB_ACCESS_TOKEN 환경변수 확인"

echo "${DOCKER_HUB_USERNAME:?"❌ DOCKER_HUB_USERNAME 환경변수가 설정되어 있지 않습니다."}"
if [ -z "$DOCKER_HUB_ACCESS_TOKEN" ]; then
  echo "❌ DOCKER_HUB_ACCESS_TOKEN 환경변수가 설정되어 있지 않습니다."
  exit 1
fi

echo "✅ 환경변수 확인 완료"

echo "=============================="
echo "🚀 Docker 이미지 빌드 및 푸시 시작"
echo "=============================="

echo "🔐 Docker Hub 로그인 시도"

docker login \
  --username "$DOCKER_HUB_USERNAME" \
  --password-stdin <<< "$DOCKER_HUB_ACCESS_TOKEN"

echo "✅ Docker Hub 로그인 성공"

echo "🔨 멀티 아키텍처 Docker 이미지 빌드 및 푸시 시작"

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ribuddy/ribuddy-api:latest \
  -f scripts/docker/dockerfile . \
  --push

echo "✅ Docker 이미지 빌드 및 푸시 완료"

echo "=============================="
echo "🎉 전체 프로세스 완료"
echo "=============================="