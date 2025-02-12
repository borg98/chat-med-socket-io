[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/5kffxBaP)

# Inlämningsuppgift med socket.io

Ni skall som grupp implementera en chat med socket.io och react som frontend. Denna chat skall fungera så att vem som helst kan ansluta och ange sitt namn. Namnet skall sedan stå tillsammans med de meddelanden som skickas av dig. Andra personer som ansluter till chatten skall kunna se historiken och kunna skapa egna meddelanden. Alla meddelanden skall ses av alla i realtid.

Utöver detta skall det gå att ansluta till kanaler (som på teams) och skicka meddelanden i bara den kanalen. Bara personer som är anslutna till den nya kanalen får se meddelanden som skickas där.

## Krav

- KLAR Använd socket.io för att hantera händelser
- KLAR En person skall ange sitt namn för att ansluta till chatten (Inga dubletter av namn får förekomma)
- KLAR Varje meddelande skickas till alla i chatten
- KLAR Skapa rum för kanaler
- KLAR Kunna skicka meddelanden till det rum som du är med i
- KLAR Markera dina egna meddelanden i en annan färg
- KLAR Kunna redigera dina meddelanden efter att de har skickats
