# The-Next-Train-Indicator-NTI-Problem

## Installation
    + Install and configure the dependencies;
        * Open the Command Prompt and run: ```npm install```;

## Run Solution
    + Run the solution using following command: ```npm start```;

## Run Test Cases
    + Run the test cases using following command: ```npm run test```;
    
    
## Description 

You are required to model the described NTI display system which should be a UI component that can be included within any web page easily. At the end of the test, you should be able to display a UI component in a browser showing which trains will be arriving at the platform within the next 15 minutes from the current simulated time.

## Operation

The NTI display will work within a virtual timeframe (VT) that is faster than real time (RT):

1 minute (VT) = 1 second (RT).

The NTI display should be able to display all expected train information for the next 15 VT mins.

The NTI display should list each expected train on a separate line and should indicate:

The order the trains will arrive

The destination of each train

The amount of minutes before each train arrives

The NTI display should only be tall enough to list at most two expected trains at a time

The NTI display should not be interactive but it should always display up to date information, if required paging should be done automatically

The NTI display should display the current VT below the list of expected trains

The NTI display will begin at 05:00 VT and continue infinitely.

For the purposes of this test use the following schedules:

## Train Schedules:

Destination
Frequency

Central Station
Every 20mins

Circular
Every hour on the hour

North Square
Every 12mins from 07:00 until 22:00

West Market
Every 6mins from 05:30 until 01:30





