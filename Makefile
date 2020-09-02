.PHONY: deploy

deploy:
	npm run build && aws s3 cp dist/ s3://inla-web-portal/d44282f1 --recursive \
                       --exclude "*" \
                       --include "*.css" \
                       --include "*.eot" \
                       --include "*.eot?" \
                       --include "*.woff" \
                       --include "*.woff2" \
                       --include "*.ttf" \
                       --include "*.ico" \
                       --include "*.png" \
                       --include "*.svg" \
                       --include "*.jpg" \
                       --include "*.js" \
                       --include "*.map" \
                       --include "*.html" \
                       --include "*.mp3" \
                       --profile zb