# This is your Editor pane. Write the Dockerfile here and
# use the command line to execute commands
FROM alpine

COPY ./requirements.txt /tmp/

# Setup
RUN apk update && \
    apk upgrade && \
    apk add --no-cache python3 py3-pip python3-dev nodejs npm && \
    pip3 install --no-cache-dir -r /tmp/requirements.txt

COPY . /tmp/
# --------------------------------
RUN mkdir -p /


WORKDIR /

COPY package*.json ./
COPY . .
RUN npm install 



RUN npm run build 





CMD [ "npm", "run", "start" ]