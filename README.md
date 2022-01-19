# Waiting Room

## Description

This is an application for entering names and priorities to create a priority based waiting line.

It is implemented to use the priority queue data structure. This means that people with higher priorities will be seen before people with lower priorities, regardless of the time they were entered into the queue. However, if two people have the same priority, the time that they will be seen will be deterimied by the time their name was entered.

## Set up

To install:

```
npm install
```

To build and run:

```
npm start-dev
```

## Tech Stack

Waiting Room uses Node.js, Express, React, and React-Bootstrap.

## What is a priority queue?

Another word for a priority queue is a minimum heap.

![Image of a complete binary tree with the nodes from top to bottom and left to right: 1, 2, 3, 17, 19, 36, 7, 25, 100](/public/minimum_heap.png)

The Minimum Heap requires that each node be greater than or equal to its parent node and less than or equal to its children. The tree must remain complete, which means all levels are full except for the lowest level, which is filled from left to right.

This Minimum Heap is contained in an array. Removing and adding a person to the queue takes O(logN).
