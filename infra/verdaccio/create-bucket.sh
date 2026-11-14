#!/usr/bin/env bash
# Bucket под restic в Timeweb S3: versioning и object lock GOVERNANCE.
# Зачем: снапшоты Verdaccio нельзя удалить раньше срока ключом с VPS.
# Права ключа VPS выдаются в панели Timeweb, без BypassGovernanceRetention.
set -euo pipefail

: "${BUCKET:?}"
days="${OBJECT_LOCK_DAYS:-60}"
region="${AWS_REGION:-ru-1}"
s3=(aws --endpoint-url "${AWS_ENDPOINT_URL:-https://s3.twcstorage.ru}" --region "$region" s3api)

"${s3[@]}" create-bucket \
  --bucket "$BUCKET" \
  --object-lock-enabled-for-bucket \
  --create-bucket-configuration "LocationConstraint=$region"

"${s3[@]}" put-bucket-versioning \
  --bucket "$BUCKET" \
  --versioning-configuration Status=Enabled

"${s3[@]}" put-object-lock-configuration \
  --bucket "$BUCKET" \
  --object-lock-configuration "{\"ObjectLockEnabled\":\"Enabled\",\"Rule\":{\"DefaultRetention\":{\"Mode\":\"GOVERNANCE\",\"Days\":$days}}}"

echo "Bucket $BUCKET: versioning, object lock ${days} дней."
echo "restic init выполняй админским ключом, не ключом VPS."
