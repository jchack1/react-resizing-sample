# react-resizing-sample
some sample react code for responding to window resize

For a work project I needed a graph to resize when the window is resized. I later found another way to do this using a different library, but thought this would be useful for the future. 

useEffect is utilized to update the state when the window is resized. React re-renders the component when state is updated.  useEffect is also used to determine the initial size of the graph, because someone may load the graph on a smaller screen size where the default size is too large. 

Some helpful links about resizing and debouncing:

- https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

- https://www.freecodecamp.org/news/javascript-debounce-example/
