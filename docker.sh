#!/bin/sh
NAME="flask-formvalidator"
DEV_ENV="-e FLASK_APP=main -e FLASK_DEBUG=1 -e FLASK_ENVIRONMENT=development"
DEV_CMD="flask run --host=0.0.0.0 --port=80"
RUN_ENV="-e STATIC_PATH=/app/static"
PORTS="127.0.0.1:80:80"
VMAP="$(pwd)/app:/app"
IMAGE="tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7"

case "$1" in
dev)
    docker run --rm -d $DEV_ENV --name "$NAME" -p "$PORTS" -v "$VMAP" \
           "$IMAGE" $DEV_CMD
;;
logs)
    docker logs -f "$NAME"
;;
reload)
    docker exec "$NAME" touch /run/uwsgi.reload
;;
run)
    docker run --rm -d $RUN_ENV --name "$NAME" -p "$PORTS" -v "$VMAP" "$IMAGE"
;;
shell)
    docker exec -ti "$NAME" /bin/sh
;;
status)
    docker ps -f name="$NAME"
;;
stop)
    docker stop "$NAME"
;;
*)
	echo "Uso: $0 [dev|logs|reload|run|shell|status|stop]"
esac
