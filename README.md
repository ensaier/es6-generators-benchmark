# ES6 Generators Benchmark

# WTF
Simple benchmark to compare different async implementations in JavaScript. It compares:
- Generators
- Promises
- Callbacks

# FAQ

#### How does it work?
It works pretty siple (like always). The flow:
- Draw DOM and calculate initial data
- Start benchmark for the first implementation
- Try to make async action XXX times (you can define an amount of iterations)
- Calculate time for the each iteration
- Calculate the average value
- Chose the second implementation...
- Draw the results for all of implementations

#### How can I use it?
Install it:
npm install

Open it in different browsers. Wait for the end of the operations. Please keep your browser and tab in a focus. Think. Make decision. Applications consist from 2 logical parts:
- Isolated tests for each test (isolated folder, just open HTML and look into console)
- Common test (common.html). Common test uses bootstrap, tests each feature consiquently so may have the less accuracy than isolated tests. But the common test is a good option to see the common picture.

#### What about the accuracy
More iterations - more accuracy.

#### Does it support Netscape, IE6 and Opera 9?

This tool support every browser(!) which has a native support of Generators, Arrow Functions, Block Scoping, Promises.

#### Which factors can affect the benchmark?
- You
- Your PC
- Your browser
Try to avoid the different activities when you're benchmarking. It would be better to drink a cup of tea.
Logicaly callbacks should be faster than everything else. If you're got an opposite values - it would be better to increase amount of iterations and try again.

#### What about babel?
This tool test only a native implementation of ES6. I sure, it's useless for transpiled code.

#### What about node.js?
It's important point. I'm working on it.

#### How much iterations should I do?
1000 of iterations would be enough to see the common picture. You can meet incorect values when browser launch internal processes of optimizations. So, the small amount of iterations (less than 100) may be twisted and distorted.

#### What are you using for async actions itself?
I use simple timeout for this purposes. It's enough to throw the code out the loop and make the function async.