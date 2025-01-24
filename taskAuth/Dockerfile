#Base Image
FROM node:20-alpine

#Working directory in the container
WORKDIR /app

#Copy the package.json file to the working directory
COPY ./package ./

#Install the dependencies
RUN npm install

#Copy the source code to the working directory
COPY ./ ./

#Build the application
RUN npm run build

#Expose the port
EXPOSE 4000

#Run the application
CMD ["npm", "start"]