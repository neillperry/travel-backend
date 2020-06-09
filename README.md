
# PROBLEM:

The tutorial says to install MongoDB using homebrew, but that doesn't work. MongoDB has been removed from homebrew. So following the tutorial's instructions will not work. To use MongoDB with this project, we have to install and use the community edition. Follow the instructions below:


#How to Install and Run Mongo DB with this Project:

1. Install Homebrew on your computer: https://brew.sh/

2. Install MongoDB Community Edition (2 commands):
    a. brew tap mongodb/brew
    b. brew install mongodb-community@4.2

3.Download and Install the application Compass: https://docs.mongodb.com/compass/master/install/



## See this website for using the MongoDB Community Edition: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

  To START the Database:
          1. Use this command in terminal: brew services start mongodb-community@4.2

          2. Then start and run Compass locally, by clicking on the Link that says "Fill in Connection Fields Locally" (Above the Connect button).


  To STOP the Database, enter this command: brew services stop mongodb-community@4.2
