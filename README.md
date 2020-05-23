# React - People table
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://kohatkov.github.io/react_people-table/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Description
1. Load `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json)
  and show the number of currently visible people in the `App` component.

2. Implement `PeopleTable` component accepting an array of people as a param.
  It should show these columns:
    - `id` (position in the original array starting from 1)
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

3. Implement `Person` component accepting a `person` and displaying all the data described above
    ```html
    <tr class="Person">
      <td></td>
      ...
      <td></td>
    </tr>
    ```
    - add class `Person--male`/`Person--female` based on `sex`
    - add `text-decoration: line-through` for the names of people born before `1650`

4. Add `age` column (`person.died - person.born`)
    - use `green` color for the `age` of people who lived for `>= 65` years

5. add `century` column (`Math.ceil(person.died / 100)`)
    - add class `Person--lived-in-${century}` to each `<tr>`

6. Mark a person row as selected when the user clicks on it (`Person--selected`)
    - there can be only one selected person at a time

7. Add a single `<input>` to filter people by `name`, `mother` and `father`

8. add sorting by `name`

9. add sorting by `id`, `sex`, `born`, `died`, `age`, `century`

10. (* OPTIONAL) Implement sorting in both directions
    - sorting must work together with filtering

11. (* OPTIONAL) Add `children` column with a list of children names of names

12. (* OPTIONAL) Implement `PersonName` component to display the name with some styling based on person data.
  Use if for all the names in the table (for example use blue color for men and red for women)

13. (* OPTIONAL) Create a `NewPerson` component with a form to add new people to the table
    - all the fields are required
    - `sex` should be chosen among 2 options (radio buttons)
    - all the above rules should be applied to added people

14. (* OPTIONAL) Add data validations:
    - `died - born` should be >= 0 and < 150
    - `name` should allow to enter only letters and spaces
    - implement `<select>` for `mother` and `father` it should display only people of appropriate sex
      who were alive in the year of birth (so the select should be empty before the born year was entered)

## React Router tasks
```
/people/carlos-haverbeck?query=carl&sorBy=born&sortOrder=desc
```
Add React Router into the `PeopleTable` working like described below:

1. The component should appear only when the URL starts from `/people` so People table is not visible on `/` or `/not-people`
1. When selecting a person navigate to `/people/carolus-haverbeke` where so the person name is added to the URL
    - `Carolus Haverbeke` should be selected if the page is loaded at `/people/carolus-haverbeke`
1. When filtering people please add `?query=asd` where `asd` is a string entered by the user
    - The `query` should be preserved in the URL when selecting a user or changing selection
    - Filter the people if the page is loaded with `?query=asd`
    - (*) Use `debounce` so the entered value is updated only when the user stoped typing for at least `500ms`
1. When sorting add `?sortBy=born` param to the URL
    - It should work together with filter
    - The people should be sorted by `born` if the page is loaded with `?sortBy=born`
    - (*) add `?sortOrder=asc` or `desc` to add ability to sort in reversed order
1. (*) Use `/people/new` address to show the `NewPerson` component
    - When the person is added you should navigate back to the `/people` page
