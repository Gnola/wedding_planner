# wedding-list
[WeddingList](https://weddingguestlist.herokuapp.com/)

## Approach
Planning a wedding is tough enough as it is so I wanted to create a website that allowed the admins (those planning the wedding) to have an interactive site that they can use to keep track of things such as guests and their info, what their RSVP is, who was sent an invitation and what services are paid for or not. Utilizing a website like this gives you an advantage to keep all information needed in one location rather than scattered among various other apps. As an additional feature guests are able to access their information and change it to keep it up to date as they see fit. This allows for less work on the end of the bride and groom.

## About
This wedding planning website allows you to view your guestlist depending on their RSVP and/or whether or not you have sent them an invitation. There is also a budget page that deciphers whether or not you have paid for a service needed at the wedding. As a guest you are able to access and edit your information such as RSVP, email and address.


This app was build using:

HTML

CSS

Javascript

Node.js

Express

Mongo / MongoDB / Mongo Atlas


## Navigating the app
From the homepage you are able to log in as an admin or search for yourself as a guest. When logging in as an admin you are able to view all the pages (rsvps, invites and budget) and manipulate the data however you need to. Depending on the info of the guest the lists will update accordingly. If you search for yourself as a guest you are only able to view and edit your information and are unaware of any other aspects of the website.


## Code Snippits
Quick Add Function:

Added a quick add function to quickly add guests or items
![alt text](https://github.com/Gnola/wedding-list/blob/master/img/QuickAdd.png "Quick Add Function")


Search Route:

Used a search route to keep guests away from admin access but edit info across the entire platform
![alt text](https://github.com/Gnola/wedding-list/blob/master/img/Search.png "Search Route")


Guestcount Partial:

Created a partial to deal with all the JS used to decipher the counts of guests according to their RSVP and plus ones
![alt text](https://github.com/Gnola/wedding-list/blob/master/img/Guestcount%20Partial.png "Guestcount Partial")


## Styling Snippits
First Run:

Styled to make it easier to navigate as functionality was being added. Used the 'sign up' form to originally create an admin but took it out so guests weren't tempted to create their own users
![alt text](https://github.com/Gnola/wedding-list/blob/master/img/OG%20Welcome.png "First Run")

Second Run:

Finished styling by taking out 'sign up' option and adding styling to give the website a tone.
![alt text](https://github.com/Gnola/wedding-list/blob/master/img/New%20Welcome.png "Second Run")
