# Note about majority of custom hooks

We're taking a slightly unconventional approach to building the game, since for time reasons, we're mainly looking to get started with technology we already know.

Our plan is to build out a prototype version of the game engine in Redux Toolkit, and then after the fact, rebuild things so that the game logic is on the server side.

To help facilitate this, Redux should be treated as an implementation detail that the React components themselves shouldn't be aware of. That is, the `useSelector` and `useDispatch` hooks can be used in the app, but they should not be used directly inside the components. They should always be called from within a custom hook. The benefit of this approach is that if we're careful with how we structure the hooks, we can switch Redux out behind the scenes, and as long as the public APIs for the custom hooks don't change, the rest of the React app will be none the wiser.
