# ABE3
**Generelle kommentarer:**
1. den samlede aflevering består af fire projekter
  a. En node applikation der sender reservationer til en "Reservation" message queue.
  b. Et dotnet program der sender reservationer til en "Reservation" message queue.
  c. En node applikation, der modtager/henter reservationer fra "Reservation" message queue 
  og sender confirmation-beskeder til en "Confirmations" message queue.
  d. Et dotnet program der modtager confirmation-beskeder fra en "Confirmations" message queue og skriver reservationen ud til konsolen 
  (som et alternativ til at sende en mail til brugeren)
2. Foruden de 4 applikationer benyttes desuden en Rabbit MessageQueue der kører i docker.
3. Koden er primært bygget op omkring sourcekoden til første aflevering, således at det var muligt at benytte swagger i stedet for at skulle køre applikationerne i terminalen.
4. Derudover er inspiration hovedsageligt fundet i undervisningsmaterialet og demo-kodeeksemplerne.
5. Den generelle funktionalitet som beskrevet i opgaven skulle være på plads, men det bør bemærkes at håndteringen af dobbeltbookinger ikke er specielt hensigtsmæssig,
da vi ganske vist undgår dobbelbookinger, men informationen ikke videregives til brugeren. 
En mulig løsning kunne evt have været at benytte flere køer og direct exchange / message routing keys, men tiden har desværre ikke været til mere i denne omgang.

**Kørsel af koden**
* Node applikationerne kører alle sammen ved hjælp af nodemon.
* dotnet programmerne kan køres med IIS express
* Derudover henvises til anvisningerne i swagger



