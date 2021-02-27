# onlineplanner
Vanilla javascript web planner.

There are six dynamic weekday cells, which move every day so that the current day is first.
This eliminates wasted space on your planner for days that have already past.

***not implemented yet***

When a day passes, its contents are moved to the "Complete" cell where the will stay
for a couple days.

For tasks further than 5 days away, you have the upcoming cell where you can specify the
due date. When that date comes within the bounds of the planner, it will automatically be
moved into the 6th weekday cell.
