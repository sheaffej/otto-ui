FROM node:12.2.0

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install http-server -g

# Install Chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

COPY . /app

# Install packages
RUN npm install \
&&  npm install -g @angular/cli@7.3.9

# Build the app
RUN ng build --prod

# Start app
CMD cd dist/otto-ui && http-server -p 4200
