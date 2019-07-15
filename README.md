# React - People table

## Demo link
[DEMO](https://scandal0us.github.io/react_people-table/)

## Task

1. Load `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json)
  when `App` component was initially rendered and show a header displaying number of people

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
    <tr class="person">
      <td></td>
      ...
      <td></td>
    </tr>
    ```
    - add class `person--male`/`person--female` based on `sex`
    - add `lightpink` background to all women
    - use `text-decoration: line-through` for the names of people born before `1650`
    - use `bold` text for the names of the people died after `1800`

4. Add `age` column (`person.died - person.born`)
    - add `green` border to all the rows of people lived for `> 65` years

5. add `century` column (`Math.ceil(person.died / 100)`)
    - add class `person--lived-in-${century}` to each `<tr>`

6. Add `children` column with a comma separated list of names
    - add class `person--mother`/`person--father` based on `children`
    - add `cornflowerblue` background to all fathers

7. Add an `<input>` to filter the table by `name`, `mother` and `father`

8. add sorting by `name`

9. add sorting by `id`, `age`, `born`, `died`

10. Mark a person row as selected when user click on it (`border: 3px solid blue`)
    - there can be only one selected person at a time

11. Create a `NewPerson` component with a form to add new people to the table
    - all the fields are required
    - `sex` should be chosen among 2 options (radio buttons)
    - all the above rules should be applied to added people

12. (* OPTIONAL) Add data validations:
    - `died - born` should be >= 0 and < 150
    - `name` should allow to enter only letters and spaces
    - implement `<select>` for `mother` and `father` it should display only people of appropriate sex
      born before the person (so the select should be empty before the born year was entered)


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
