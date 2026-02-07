# Recipe Webapp

## MUST DO before running
make sure that Node is installed

Open PowerShell and type:
node -v

You should see something like:

v20.11.1

Then:
npm -v

If you get “node is not recognized”, install Node LTS:
https://nodejs.org

(restart PowerShell after installing)

## Run server (1st Powershell window)
(cd to the repository server file)
cd server 

npm install

(copy example env file to main)
Copy-Item .env.example.txt .env

npm run dev

now keep THIS window open and run the below prompts in a new window

## Run client (2nd Powershell window)
(cd to the repository client file)
cd client 

npm install 

( copy example env file to main)
Copy-Item .env.example.txt .env

npm run dev
