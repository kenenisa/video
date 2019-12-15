Welcome to Koute.

#Author KenenisaAlemayhu0@gmail.com

#Requirements

This package uses react hooks that means you must have react > v16.8

#components...

1. Wrapper

from the package import 'Wrapper' and surround every component that uses this route feature.

```js
import { Wrapper } from "./Koute";
```

it takes 1 parameter.
[key]: base (its Required).
[value]: the default page or the homepage route to start with (only string).

> Note: its best if you place it inside the first base Component.

#usage

```js
<Wrapper base="home">//any thing that uses the feature</Wrapper>
```

2. Route

from the package import 'Route' and it is used to decide what happens to each route when they change.

```js
import { Wrapper, Route } from "./Koute";
//or
import { Route } from "./Koute";
```

it takes 2 prameters.
[key]:path (its Required).
[value]: any string that indicates the route (only string).

[key]:component (its Required).
[value]: a function that will be excuted when the path matches the route.
#usage

> Note: You must use this inside the Wrapper component.

```js
//if you have a prop to pass
<Route path="Profile" component={() => <Profile userId="1" />} />

//without props
<Route path="Profile" component={Profile} />

```

3. Router

from the package import 'Router' and it is used to set or get the route.

its a context that has 2 values.

1. the current route you're on.(route)
2. a function that will change the route.(changeRoute)

> Note: You must use this inside the Wrapper component.

#usage

```js
import React, { useContext } from "react";
import { Router } from "./Koute";
//
function something() {
  const { route, changeRoute } = useContext(Router);

  route; // returns the route
  changeRoute("where"); //changes the route

  //code continues
}
```

#history

The package by default saves each routes to history. if you want to go back to the previus route(back) use...

```js
changeRoute("", true);
```
