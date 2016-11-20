Conway's Game of Life FCC Challenge
======

Background
---


Challenges
---
This was an interesting challenge from a development perspective.  The challenge called for using React and Sass to implement an app that would run Conway's Game of Life.  The basic component structure is a simple design and the game's basic rules were easy to implement.  The primary challenge came in developing an algorithm that would be efficient for large grid sizes.  

At small grid sizes, checking every single square was fine, but for grids over a few hundred squares this quickly becomes unwieldy and starts to slow down and take longer than the timeout between iterations of the rules.

The first solution I tried was to keep a list of living cells in the grid and only apply to the rules to squares in their vicinity.
