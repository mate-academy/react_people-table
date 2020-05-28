# React - People table
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://nchuhrina.github.io/react_people-table/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## React Router tasks
1. Implement `HomePage` available at `/` with just a title `Home page`
1. Implement `PeoplePage` available at `/people` with a title `Peope page`
1. Redirect to `/` from `/home`
1. Implement `NotFoundPage` with a title `Page not found` that is shown at all the other URLs
1. Add a `Header` visible everywhere with navigation links to both pages
1. Create `getPeople` method fetching `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json)
  when `PeoplePage` is opened.
    - Find a `mother` and a `father` by `motherName` and `fatherName` and add them to the person for future use
1. Implement `PeopleTable` component accepting an array of people as a param.
  It should show these columns:
    - `name`
    - `sex`
    - `born`
    - `died`
    - `mother`
    - `father`
      ```jsx harmony
      <PeopleTable people={people} />
      ```
      ```html
      <table className="PeopleTable">
        <thead>...</thead>
        <tbody>...</tbody>
      </table>
      ```
    - add `border-collapse: collapse` style to the table
1. Implement `PersonRow` component accepting a `person` and displaying all the data described above
    ```html
    <tr class="Person">
      <td></td>
      ...
      <td></td>
    </tr>
    ```
1. Implement `PersonName` component rendering the name as a link to a person using its `slug` property
    ```
    /people/carolus-haverbeke-1832
    ```
    - Use `blue` for men and `red` women
    - Do the same for `father` and `mother` columns
1. Highlight the `PersonRow` mentioned in the URL with the yellow background
    - Highlight nobody if the `slug` in the URL is not found among the people

### Filtering and sorting
1. Add an `<input>` to filter people by `name`, `motherName` and `fatherName`
    - it should update the URL with `?query=car` where `car` is a string entered by the user
    - Read the `query` from the URL and set its value to the input when the page is loaded
1. `PeoplePage` should read the `query` from the URL and filter people accordingly
    - check is the `query` matches the `name`, `motherName` or `fatherName`
1. Implement the sorting by `born` and `died` by clicking on the column title
    - Highlight the column with the *
    - Sort the people by selected column
    - Add `?sortBy=born` param to the URL
    - The people should be sorted by `born` if the page is loaded with `?sortBy=born`
1. Implement the sorting by `name` and `sex`

## Advanced sorting and filtering
1. Sort should work together with filtering
1. The `query` and `sortBy` should stay in the URL when you select a user (keep `location.search` on navigation)
1. Implement the ability to sort people in both directions `?sortOrder=asc` or `desc`
    - add [Sort both icon](src/images/sort_both.png) to show that column allows sorting
    - The first click sorts `ascending` (A-Z) the second sorts `descending` (Z-A)
    - add `sort_ask` or `sort_desc` icons accordingly to the applied sorting
1. Update the `query` in the URL with `debounce` of 500ms

## (* OPTIONAL) Adding a person
1. (* OPTIONAL) Create a `NewPerson` component with a form to add new people and show it above the table
    - all the fields should be required for now
    - `sex` should be chosen among 2 options (radio buttons)
    - `mother` and `father` are selects with all the `women` and `men` from the table accordingly
1. (* OPTIONAL) Create an `Add person` button navigating to `/people/new`
    - the `NewPerson` should appear instead of a button
    - When the person is added you should navigate back to the `/people` page
1. (* OPTIONAL) Add data validations:
    - `name` should contain only letters and spaces
    - `born` and `died` are valid years between `1400` and the current year
    - `died` should be disabled if `born` is empty
    - `died - born` should be >= 0 and < 150
    - make `mother` and `father` field optional
    - update the list of `mothers` and `fathers` according to the entered `born` year (they must be alive)
    (selects should be empty and disabled before the born year was entered)
