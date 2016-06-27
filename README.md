# tictactoe

Once loaded, the first player has the ability to choose a symbol. Upon game reset, the first player may choose once again. Feel free to change between resets as scores are kept.

Two players take turns placing their respective symbols by clicking on an open square. Clicks made on squares already containing a symbol will have no effect. 

When a player successfully places three of their symbols in a row, the game will end with a victory message. If the game ends in a tie, then an appropriate message displays. 

The reset button can be used to reset the game board so that another round can be played. The number of wins each player has will persist through each reset. 

The dark/light button can be used to change the white background to a darker one and vice versa. 

Known bugs:

--Clicking rapidly on the gameboard may cause the game functionality to break. This is due to some of the game logic relying on mousedown and mouseup events. Rapidly clicking causes these events to mix and game logic may break.

--Loading the font may be delayed depending on internet speed and host website status.