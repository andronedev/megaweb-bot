@title Chargement --- MegaWeb
@echo off
cls
call npm i
cls
@title ON --- MegaWeb
@echo off
:loop
node index.js
timeout /t 3
goto loop