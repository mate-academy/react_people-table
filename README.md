# React - People table

## Demo link
Add link here: `[DEMO LINK](https://vadim-os.github.io/react_people-table/)`

## Task

1. Load `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json)
  and show the number of currently visible people in the `App` component

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


## Workflow
- Fork the repository with task
- Clone forked repository
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode
- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for
    writing commands until you stop server (`ctrl + c`). All other commands you
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy`
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)` - this will be a
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo
(`master`).
- Add a link at `PR` to Google Spreadsheets.


## Project structure
- `src/` - directory for css, js, image, fonts files
- `build/` - directory for built pages

You should be writing code in `src/` directory.
