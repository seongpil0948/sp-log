# PATH_ENV=$(pwd)/.env
PATH_ENV=.env.local
PATH_CONFIG=algolia/config.json

docker run -it --rm --env-file=$PATH_ENV -e "CONFIG=$(cat $PATH_CONFIG | jq -r tostring)" algolia/docsearch-scraper