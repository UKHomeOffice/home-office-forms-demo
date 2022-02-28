#! /bin/bash
set -e

export SCHEMA_ACTION=migrate

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)

  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/app
  echo "Torn Down UAT Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps -f kube/certs
  $kd -f kube/redis -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps
  $kd -f kube/redis -f kube/app
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "UAT Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
fi
