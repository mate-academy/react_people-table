# React - People table

<a href="https://romamykhalchuk.github.io/react_people-table/#/">DEMO</a>

Features:
- React Router - `HomePage` available at `/` with just a title `Home page`, `PeoplePage` available at `/people` with a title `Peope page`, redirecting to `/` from `/home`. `NotFoundPage` with a title `Page not found` is shown for all the other URLs
- Fetching `people` from API when `PeoplePage` is opened
- `<input>` filter people by `name`, `motherName` and `fatherName`
    - it  updates the URL with `?query=car` where `car` is a string entered by the user
    - reads the `query` from the URL and set its value to the input when the page is loaded
- Sorting by `name`, `sex`, `born` and `died` by clicking on the column title
- Ability to sort people in both directions `?sortOrder=asc` or `desc` (the first click sorts `ascending` (A-Z) the second sorts `descending` (Z-A)
- Updating the `query` in the URL with `debounce` of 500ms
