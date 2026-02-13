# Recipe Webapp

## MUST DO before running
make sure that Node is installed

Open PowerShell and type:
node -v

You should see something like:

v20.11.1

Then:
npm -v

If you have permission errors at any point, open a new window as admin and run: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" 

This allows scripts written locally to run

If you get “node is not recognized”, install Node LTS:
https://nodejs.org

(restart PowerShell after installing)

## Run server 
(make sure you are in a powershell window, and in the root folder)
Setup everything:

npm run setup

Add your API Key:
Open server/.env and paste your Gemini Key.

Run the App:

npm run dev