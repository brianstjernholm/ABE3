# ABE_Assignment1

Gruppe 8
Assignment1 ABE

løsningen er bygget op ved hjælp af node, express, MongoDB Atlas, mongoose, swagger og heroku.

Appe kører på: http://localhost:3000/

Swagger: http://localhost:3000/docs

Heroku: https://gentle-dusk-26869.herokuapp.com/

NB. der er ikke tale om en hverken særlig "smart" eller fuldt implementeret løsning, men mere et proof of concept, hvor vi tester anvendelsen af de forskellige teknologier. 

Routes:
/hotel
/users
/index

1. Opret bruger (/signup) og tildel "admin" rolle (der kan vælges mellem "user", "manager" og "admin")
2. Kopier den returnerede accestoken og brug i enten postman (som bearer token under Authorization) eller Swagger (Authorize)  
3. Herefter kan der eksempelvis oprettes et nyt hotel, logges ind, hentes en liste af alle hoteller, finde bruger info ved hjælp af id og så frem deles.
4. Der er implementeret rollebaseret restriktioner, således at visse endpoints kræver at brugeren har et "højere" niveau end "user" - eksempelvis ved tilføjelsen af hoteller.