# The System

[![Netlify Status](https://api.netlify.com/api/v1/badges/245f7f94-8e6e-4beb-bfbb-af9ce9c68105/deploy-status)](https://app.netlify.com/sites/the-system/deploys) ![Build+Test](https://github.com/ryan-rushton/the-system/workflows/Build+Test/badge.svg?branch=master)

The solar system in your browser. Check it out [here](https://the-system.netlify.app/).

## What is this site?

This site initially started as an investigation into performance of react, mainly though rendering many elements. Now it's a demo project for how I like to write frontend applications. It is simple but I have implemented unit and browser tests, i18n, keyboard accessibility, and error reporting through sentry.

There are still a few things I would like to add that I think are necessary in frontend applications but they don't currently make sense. These are user login (this would be done through GitHub or Google) and user preferences (through a backend which would be Nest.js or Java and Spring). Any other things I would like to do that do make sense you will find in the [TODO](#todo) section below or in GitHub issues.

When this was an investigation into frontend performance I was initially trying to render a few hundred thousand divs through the asteroids in the belt and the stars in the background. This was just too much for the browser to handle. To remove the burden of rendering all the stars I made a page of stars, took a screenshot, and now that background image is just repeated over the system. The belt is still rendering a lot of divs and I want to keep this functionality rather than also replace that with a image. This lead to finding this issue with react dev tools, https://github.com/facebook/react/issues/16501.

## Running

This is built with create react app so to install and run simply do `yarn && yarn start`.

## Tests

To run the unit tests use `yarn test`.

To run the browser tests locally use `yarn run cypress open` to open the cypress app, from here you can run specific tests. See https://docs.cypress.io/ for more information.

## TODO

- Move belt generation to a web worker and show loading screen while we wait for it all to be generated. Div creation still needs to happen at render time but we can generate the properties and random numbers while we show a loading screen.
- Get sentry source maps working correctly.
- Cache buster when the app version is updated so we can utilise the service worker for caching images.
- Add another i18n language.
- Test and ensure screen readers works, not really something that is useful for this site but something I think is neglected in a lot of applications.
- User interaction statistics, maybe google analytics?
- Create my own svg's so I can ditch fontawesome as a dep.
