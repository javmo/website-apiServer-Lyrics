# This is your Editor pane. Write the Dockerfile here and
# use the command line to execute commands
FROM alpine


# copy the dependencies file to the working directory
COPY ./requirements.txt /tmp/


# Setup
RUN apk update
RUN apk upgrade
RUN apk add --update python3 py3-pip python3-dev nodejs npm
RUN pip3 install --upgrade pip
RUN pip3 install -r /tmp/requirements.txt

COPY . /tmp/
# --------------------------------


RUN mkdir -p /src/app

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .


CMD [ "npm", "run", "start" ]